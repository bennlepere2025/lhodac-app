'use server';

import { db } from '@/db/db';
import { partners, auditLogs, bookings } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

/**
 * Récupère les données globales pour le tableau de bord administrateur
 */
export async function getAdminDashboardData() {
  try {
    // 1. Récupérer tous les partenaires inscrits (en attente de validation KYC, etc.)
    const allPartners = await db
      .select()
      .from(partners)
      .orderBy(desc(partners.createdAt));

    // 2. Récupérer les derniers journaux d'audit immuables
    const logs = await db
      .select()
      .from(auditLogs)
      .orderBy(desc(auditLogs.createdAt))
      .limit(10);

    // 3. Récupérer les réservations globales pour statistiques
    const allBookings = await db
      .select()
      .from(bookings);

    return {
      success: true,
      partners: allPartners,
      auditLogs: logs,
      stats: {
        totalPartners: allPartners.length,
        pendingPartners: allPartners.filter((p) => p.status === 'pending').length,
        totalBookings: allBookings.length,
      },
    };
  } catch (error) {
    console.error('Erreur lors du chargement du back-office admin :', error);
    return { success: false, error: 'Impossible de charger le tableau de bord administrateur.' };
  }
}

/**
 * Valide ou suspend un partenaire (KYC, RCCM/NIU)
 */
export async function updatePartnerStatus(partnerId: number, status: 'verified' | 'suspended') {
  try {
    await db
      .update(partners)
      .set({ status })
      .where(eq(partners.id, partnerId));

    // Consignation de l'action dans les logs d'audit
    await db.insert(auditLogs).values({
      userId: 1, // ID admin
      action: `PARTNER_${status.toUpperCase()}`,
      metadata: { partnerId },
    });

    return { success: true, message: `Partenaire ${status} avec succès.` };
  } catch (error) {
    console.error('Erreur de mise à jour du statut partenaire :', error);
    return { success: false, error: 'Échec de la mise à jour.' };
  }
}