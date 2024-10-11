const renderUserItem = user => {
    return `
        <div class="shadow p-3 mt-2">
            <span class="user-id small">${user.id}</span>
            <h3 class="username">${user.tax}</h3>
            <h3 class="username">${user.poli}</h3>
            <h3 class="username">${user.date}</h3>
            <h3 class="username">${user.location}</h3>
            <h3 class="username">${user.handphone}</h3>
            <h3 class="username">${user.nik}</h3>
            <h3 class="username">${user.name}</h3>
        </div>
    `
}

window.addEventListener('load', () => {
    fetch('/api/list')
        .then(res => res.json())
        .then(result => {
            console.log(result);

            const userContainer = document.getElementsByClassName('user-container')[0]
            userContainer.innerHTML = result.map(renderUserItem).join('')

        })
        .catch(eror => {
            console.log(eror);
        })
})