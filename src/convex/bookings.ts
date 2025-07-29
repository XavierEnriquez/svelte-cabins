import { query } from "./_generated/server";
// import { query, mutation } from "./_generated/server";
// import { v } from "convex/values";

// src/convex/bookings.ts

// export const getBookings = query({
// 	args: {},
//   handler: async (ctx) => {
//     const bookings = await ctx.db.query('bookings').collect();
//     return bookings;
//   } 
// });

export const getBookings = query({
    args: {},
  handler: async (ctx) =>  await ctx.db.query('bookings').collect()
});