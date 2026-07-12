document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const infoMail = document.getElementById('info-mail');
        const infoPassword = document.getElementById('info-password');

        infoMail.classList.add('hidden');
        infoPassword.classList.add('hidden');
        infoMail.textContent = '';
        infoPassword.textContent = '';

        var valError = false;

        if (!email){
            infoMail.textContent = "Please enter an email."
            infoMail.classList.remove('hidden');
            valError = true;
        }else if(!email.toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )){
            infoMail.textContent = "Please enter an valid email."
            infoMail.classList.remove('hidden');
            valError = true;
        }

        if (!password){
            infoPassword.textContent = "Please enter an password."
            infoPassword.classList.remove('hidden');
            valError = true;
        }

        if (valError){
            return;
        }


        const {data, error} = await authClient.signIn.email({
            email: email,
            password: password,
        });

        if (error) {
            if (error) {


                if (error.code === 'INVALID_EMAIL' || error.status === 404) {
                    infoMail.textContent = 'Email not found!';
                    infoMail.classList.remove('hidden');
                } else if (error.status === 401) {
                    infoPassword.textContent = 'Wrong password.';
                    infoPassword.classList.remove('hidden');
                } else {
                    infoMail.textContent = error.message || 'An error occurred.';
                    infoMail.classList.remove('hidden');
                }
            }
        } else {
            window.location.href = '/dashboard';
        }
    });
});