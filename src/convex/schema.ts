// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    emailVerified: v.optional(v.boolean()),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
  }).index("by_email", ["email"]),

  accounts: defineTable({
    userId: v.id("users"),
    type: v.string(),
    provider: v.string(),
    providerAccountId: v.string(),
    refresh_token: v.optional(v.string()),
    access_token: v.optional(v.string()),
    expires_at: v.optional(v.number()),
    token_type: v.optional(v.string()),
    scope: v.optional(v.string()),
    id_token: v.optional(v.string()),
    session_state: v.optional(v.string()),
  })
    .index("by_provider", ["provider", "providerAccountId"])
    .index("by_user", ["userId"]),

  sessions: defineTable({
    sessionToken: v.string(),
    userId: v.id("users"),
    expires: v.string(), // ISO date string
  }).index("by_token", ["sessionToken"]),

  verificationTokens: defineTable({
    identifier: v.string(),
    token: v.string(),
    expires: v.string(), // ISO date string
  }).index("by_identifier_token", ["identifier", "token"]),

  guests: defineTable({
    guestID: v.string(),
    fullName: v.string(),
    email: v.string(),
    typeID: v.string(),
    nationality: v.string(),
    countryFlag: v.optional(v.union(v.null(), v.string())),
  }),
  
  bookings: defineTable({
    cabinId: v.number(),
    guestId: v.number(),
    hasBreakfast: v.boolean(),
    isPaid: v.boolean(),
    numGuest: v.number(),
    observations: v.optional(v.union(v.null(), v.string())),
    startDate: v.object({ daysFrom: v.number() }),
    endDate: v.object({ daysFrom: v.number() }),
    created_at: v.object({ daysFrom: v.number(), withTime: v.boolean() }),
  })
    .index("cabinId", ["cabinId"])
    .index("guestId", ["guestId"]),

  cabins: defineTable({
    name: v.string(),
    description: v.optional(v.union(v.null(), v.string())),
    regularPrice: v.number(),
    maxCapacity: v.number(),
    discount: v.number(),
    image: v.optional(v.union(v.null(), v.string())),
  })
    .index("name", ["name"])
    .index("regularPrice", ["regularPrice"])
    .index("maxCapacity", ["maxCapacity"]),
});