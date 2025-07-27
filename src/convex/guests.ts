import { query } from "./_generated/server";
// import { query, mutation } from "./_generated/server";
// import { v } from "convex/values";

export const getGuests = query({
	args: {},
  handler: async (ctx) =>  await ctx.db.query('guests').collect()
});