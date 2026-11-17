import { index, integer, pgTable, timestamp, text, uuid, varchar } from "drizzle-orm/pg-core";
import type { ContactMethod, EnquiryKind } from "@/lib/enquiries";

export const enquiries = pgTable("landscape_enquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  kind: varchar("kind", { length: 16 }).$type<EnquiryKind>().notNull(),
  fullName: varchar("full_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  service: varchar("service", { length: 100 }),
  location: varchar("location", { length: 140 }),
  message: text("message").notNull(),
  contactMethod: varchar("contact_method", { length: 16 }).$type<ContactMethod>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("landscape_enquiries_created_idx").on(table.createdAt)]);

export const enquiryRateLimits = pgTable("landscape_enquiry_rate_limits", {
  key: varchar("key", { length: 64 }).primaryKey(),
  hits: integer("hits").notNull().default(1),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
}, (table) => [index("landscape_enquiry_rate_expiry_idx").on(table.expiresAt)]);
