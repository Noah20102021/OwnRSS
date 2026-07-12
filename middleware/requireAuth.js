const { auth } = require('../auth');
const { fromNodeHeaders } = require('better-auth/node');
const { prismaAdapter } = require('better-auth/adapters/prisma');
const { PrismaClient } = require('@prisma/client');

async function requireAuth(req, res, next) {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
        return res.redirect('/');
    }

    const prisma = new PrismaClient();
    const role = await prisma.role.findUnique({ where: { id: session.user.roleId } });

    req.user = { ...session.user, role: role };
    next();
}

module.exports = { requireAuth };