import { redirect } from '@sveltejs/kit';

export async function load({ locals, depends }) {
  const session = locals.session;
  if (!session) {
    throw redirect(302, '/auth/login');
  }

  depends('app:auth');
  return { user: locals.user };
}