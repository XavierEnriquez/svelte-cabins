import { query } from "./_generated/server";
// import { query, mutation } from "./_generated/server";
// import { v } from "convex/values";

// src/convex/guests.ts

// export const getGuests = query({
// 	args: {},
//   handler: async (ctx) => {
//     const guests = await ctx.db.query('guests').collect();
//     return guests;
//   } 
// });

export const getGuests = query({
	args: {},
  handler: async (ctx) =>  await ctx.db.query('guests').collect()
});