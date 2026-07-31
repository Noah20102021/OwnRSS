document.getElementById('logoutBtn').addEventListener('click', async function () {
    await authClient.signOut();
    window.location.href = '/login';
});