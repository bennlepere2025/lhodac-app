'use server';

import { db } from '@/db/db';
import { partners, properties, roomTypes, bookings, bookingItems } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

/**
 * Récupère le tableau de bord et les réservations reçues pour un partenaire donné
 */
export async function getPartnerDashboard(partnerId: number) {
  try {
    // 1. Récupérer les informations du partenaire
    const [partner] = await db
      .select()
      .from(partners)
      .where(eq(partners.id, partnerId));

    if (!partner) {
      return { success: false, error: 'Partenaire introuvable.' };
    }

    // 2. Récupérer les propriétés/offres du partenaire
    const partnerProperties = await db
      .select()
      .from(properties)
      .where(eq(properties.partnerId, partnerId));

    // 3. Récupérer les réservations associées aux articles de ce partenaire
    // (Simplifié pour le prototype mobile)
    const recentBookings = await db
      .select()
      .from(bookingItems)
      .limit(10);

    return {
      success: true,
      partner,
      properties: partnerProperties,
      bookings: recentBookings,
    };
  } catch (error) {
    console.error('Erreur lors du chargement de l’espace partenaire :', error);
    return { success: false, error: 'Impossible de charger le tableau de bord.' };
  }
}

/**
 * Met à jour le stock ou le tarif d'une chambre / service
 */
export async function updatePartnerStockOrPrice(input: {
  roomTypeId: number;
  newPrice?: number;
  newStock?: number;
}) {
  try {
    const updateData: any = {};
    if (input.newPrice !== undefined) updateData.basePrice = input.newPrice.toString();
    if (input.newStock !== undefined) updateData.totalStock = input.newStock;

    await db
      .update(roomTypes)
      .set(updateData)
      .where(eq(roomTypes.id, input.roomTypeId));

    return { success: true, message: 'Mise à jour effectuée avec succès.' };
  } catch (error) {
    console.error('Erreur de mise à jour partenaire :', error);
    return { success: false, error: 'Échec de la mise à jour.' };
  }
}