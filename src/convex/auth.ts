
import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const createUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.string(),
  },
  async handler(ctx, args) {
    
    return await ctx.db.insert('users', {
      email: args.email,
      password: args.password,
      name: args.name
    });
  }
});

export const verifyCredentials = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query('users')
      .filter(q => q.eq(q.field('email'), args.email))
      .first();
    
    if (!user) return null;

    const isValid = (args.password === user.password);
    if (!isValid) return null;
    
    return {
      _id: user._id,
      email: user.email,
      name: user.name
    };
  }
});