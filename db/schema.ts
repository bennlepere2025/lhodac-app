import { pgTable, serial, text, integer, decimal, timestamp, boolean, jsonb, index } from 'drizzle-orm/pg-core';

// 1. Table des utilisateurs & Rôles
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone').unique(), // Essentiel pour Mobile Money & OTP
  passwordHash: text('password_hash'),
  role: text('role').default('traveler').notNull(), // 'traveler', 'partner', 'agent', 'admin'
  emailVerified: timestamp('email_verified'),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: index('user_email_idx').on(table.email),
  phoneIdx: index('user_phone_idx').on(table.phone),
}));

// 2. Table des partenaires (Hôtels, Agences de transport, Tours)
export const partners = pgTable('partners', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  companyName: text('company_name').notNull(),
  category: text('category').notNull(), // 'hotel', 'transport', 'tour'
  rccm: text('rccm').notNull(),
  niu: text('niu').notNull(),
  status: text('status').default('pending').notNull(), // 'pending', 'verified', 'suspended'
  commissionRate: decimal('commission_rate', { precision: 5, scale: 2 }).default('10.00').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 3. Table des propriétés (Hôtels)
export const properties = pgTable('properties', {
  id: serial('id').primaryKey(),
  partnerId: integer('partner_id').references(() => partners.id).notNull(),
  name: text('name').notNull(),
  city: text('city').notNull(), // 'Brazzaville', 'Pointe-Noire', etc.
  address: text('address').notNull(),
  description: text('description').notNull(),
  stars: integer('stars').default(3).notNull(),
  amenities: jsonb('amenities').notNull(), // ex: ["wifi", "climatisation", "groupe_electrogene", "parking"]
  images: jsonb('images').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  cityIdx: index('property_city_idx').on(table.city),
}));

// 4. Types de chambres & Tarifs
export const roomTypes = pgTable('room_types', {
  id: serial('id').primaryKey(),
  propertyId: integer('property_id').references(() => properties.id).notNull(),
  name: text('name').notNull(), // ex: "Chambre Double Standard"
  capacity: integer('capacity').notNull(),
  basePrice: decimal('base_price', { precision: 12, scale: 2 }).notNull(), // En XAF (sans décimales)
  totalStock: integer('total_stock').notNull(),
});

// 5. Circuits touristiques (Tours)
export const tours = pgTable('tours', {
  id: serial('id').primaryKey(),
  partnerId: integer('partner_id').references(() => partners.id).notNull(),
  title: text('title').notNull(),
  destination: text('destination').notNull(), // ex: "Parc national d'Odzala-Kokoua"
  durationDays: integer('duration_days').notNull(),
  price: decimal('price', { precision: 12, scale: 2 }).notNull(),
  itinerary: jsonb('itinerary').notNull(), // Jour par jour
  inclusions: jsonb('inclusions').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
}, (table) => ({
  destIdx: index('tour_destination_idx').on(table.destination),
}));

// 6. Routes de transport (Bus / Train)
export const transportRoutes = pgTable('transport_routes', {
  id: serial('id').primaryKey(),
  partnerId: integer('partner_id').references(() => partners.id).notNull(),
  origin: text('origin').notNull(), // ex: 'Brazzaville'
  destination: text('destination').notNull(), // ex: 'Pointe-Noire'
  transportType: text('transport_type').notNull(), // 'bus', 'train'
  departureTime: text('departure_time').notNull(),
  arrivalTime: text('arrival_time').notNull(),
  price: decimal('price', { precision: 12, scale: 2 }).notNull(),
  totalSeats: integer('total_seats').notNull(),
}, (table) => ({
  routeIdx: index('transport_route_idx').on(table.origin, table.destination),
}));

// 7. Réservations globales
export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  status: text('status').default('pending').notNull(), // 'pending', 'confirmed', 'cancelled', 'refunded', 'expired'
  totalAmount: decimal('total_amount', { precision: 12, scale: 2 }).notNull(),
  expiresAt: timestamp('expires_at').notNull(), // Blocage temporaire 15 min
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  statusIdx: index('booking_status_idx').on(table.status),
}));

// 8. Éléments de réservation (Lignes)
export const bookingItems = pgTable('booking_items', {
  id: serial('id').primaryKey(),
  bookingId: integer('booking_id').references(() => bookings.id).notNull(),
  itemType: text('item_type').notNull(), // 'hotel', 'tour', 'transport'
  itemId: integer('item_id').notNull(),
  details: jsonb('details').notNull(), // Options spécifiques (dates, nombre de nuits, sièges)
  price: decimal('price', { precision: 12, scale: 2 }).notNull(),
});

// 9. Paiements (Mobile Money & Cartes)
export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  bookingId: integer('booking_id').references(() => bookings.id).notNull(),
  provider: text('provider').notNull(), // 'mtn_momo', 'airtel_money', 'cinetpay'
  status: text('status').default('pending').notNull(), // 'pending', 'success', 'failed'
  reference: text('reference').notNull().unique(),
  idempotencyKey: text('idempotency_key').notNull().unique(),
  rawResponse: jsonb('raw_response'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  refIdx: index('payment_reference_idx').on(table.reference),
}));

// 10. Traçabilité légale (Acceptation des CGV)
export const legalDocuments = pgTable('legal_documents', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  version: text('version').notNull(), // ex: '1.0'
  ipAddress: text('ip_address').notNull(),
  acceptedAt: timestamp('accepted_at').defaultNow().notNull(),
});

// 11. Journaux d'audit (Audit Logs Admin)
export const auditLogs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  action: text('action').notNull(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});