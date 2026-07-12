require('dotenv').config();

const { betterAuth } = require('better-auth');
const { prismaAdapter } = require('better-auth/adapters/prisma');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    database: prismaAdapter(prisma, { provider: 'sqlite' }),
    emailAndPassword: { enabled: true },
    user: {
        additionalFields: {
            roleId: {
                type: 'number',
                required: false,
                input: false, // Nutzer kann das beim Signup nicht selbst setzen
            },
        },
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    const defaultRole = await prisma.role.findFirst({
                        where: { name: 'User' },
                    });

                    if (!defaultRole) {
                        throw new Error('Standard-Rolle "User" existiert nicht. Bitte zuerst in Prisma Studio anlegen.');
                    }

                    return {
                        data: {
                            ...user,
                            roleId: defaultRole.id,
                        },
                    };
                },
            },
        },
    },
});

module.exports = { auth };