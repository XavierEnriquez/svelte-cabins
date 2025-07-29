import { query } from "./_generated/server";
// import { query, mutation } from "./_generated/server";
// import { v } from "convex/values";

// src/convex/cabins.ts

// export const getCabins = query({
// 	args: {},
//   handler: async (ctx) => {
//     const cabins = await ctx.db.query('cabins').collect();
//     return cabins;
//   } 
// });

export const getCabins = query({
    args: {},
  handler: async (ctx) =>  await ctx.db.query('cabins').collect()
});