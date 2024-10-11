window.addEventListener('load', () => {

    document.getElementById('submit').addEventListener('click', () => {

        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        // if (!name || !company) return console.log('Isi dulu bossque');

        fetch(`/api/daftar?username=${email}&password=${password}&role=1`)
            .then(res => res.json())
            .then(result => {
                console.log('success', result);
            })
            .catch(eror => {
                console.log(eror);
            })
    })
})