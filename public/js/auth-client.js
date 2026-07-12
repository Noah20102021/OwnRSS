import { createAuthClient } from "https://esm.sh/better-auth/client";

const authClient = createAuthClient({
    baseURL: window.location.origin,
});

window.authClient = authClient;