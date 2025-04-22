/**
 * Reference:
 * ```
 * curl -X POST http://localhost:54321/auth/v1/admin/users \
 * -H "Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>" \
 * -H "Content-Type: application/json" \
 * -d '{
 *   "email": "admin@admin.admin",
 *   "password": "test",
 *   "email_confirm": true
 * }'
 * ```
 *
 * This is the node.js script that will do the same thing.
 */

import { createClient } from '@supabase/supabase-js';

if (
	!process.env.VITE_BFF_SUPABASE_URL ||
	!process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
) {
	console.error('Required environment variables are not set');
	process.exit(1);
}

const supabase = createClient(
	process.env.VITE_BFF_SUPABASE_URL,
	process.env.VITE_SUPABASE_SERVICE_ROLE_KEY,
);

const email = 'admin@admin.admin';
const password = 'test';

async function createAdminUser() {
	try {
		const { data, error } = await supabase.auth.admin.createUser({
			email,
			password,
			email_confirm: true,
		});

		if (error) {
			console.error('Error creating user:', error.message);
			process.exit(1);
		}

		console.log('Admin user created:', data);
		process.exit(0);
	} catch (err) {
		console.error('Unexpected error:', err);
		process.exit(1);
	}
}

createAdminUser();
