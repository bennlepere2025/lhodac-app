'use server';

import { db } from '@/db';
import { partners, auditLogs } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function getPendingPartners() {
  try {
    const pendingList = await db
      .select()
      .from(partners)
      .where(eq(partners.kycStatus, 'pending'));

    return { success: true, data: pendingList };
  } catch (error) {
    console.error('Erreur lors du chargement des partenaires en attente :', error);
    return { success: false, error: 'Impossible de récupérer la liste des partenaires.' };
  }
}

export async function updatePartnerKycStatus(partnerId: number, status: 'verified' | 'rejected', adminUserId: number) {
  try {
    // 1. Mettre à jour le statut KYC du partenaire
    await db
      .update(partners)
      .set({ kycStatus: status })
      .where(eq(partners.id, partnerId));

    // 2. Enregistrer l'action dans le journal d'audit immuable
    await db.insert(auditLogs).values({
      userId: adminUserId,
      action: `PARTNER_KYC_${status.toUpperCase()}`,
      metadata: { partnerId, updatedStatus: status },
    });

    return { success: true, message: `Partenaire ${status === 'verified' ? 'validé' : 'rejeté'} avec succès.` };
  } catch (error) {
    console.error('Erreur lors de la mise à jour KYC :', error);
    return { success: false, error: "Échec de la mise à jour du statut du partenaire." };
  }
}