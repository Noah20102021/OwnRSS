require('dotenv').config();
const { auth } = require('../auth');

async function createUser() {
    const email = process.argv[2];
    const password = process.argv[3];
    const name = process.argv[4] || '';

    if (!email || !password) {
        console.error('Nutzung: npm run create-user -- <email> <passwort> [name]');
        process.exit(1);
    }

    const result = await auth.api.signUpEmail({
        body: {
            email: email,
            password: password,
            name: name,
        },
    });

    console.log('Nutzer erstellt:', result.user.email, '→ Rolle wird automatisch zugewiesen');
    process.exit(0);
}

createUser().catch((err) => {
    console.error('Fehler beim Erstellen:', err.message || err);
    process.exit(1);
});