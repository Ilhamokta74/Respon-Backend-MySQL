const renderUserItem = login => {
    return `
        <div class="shadow p-3 mt-2">
            <span class="user-id small">${login.id}</span>
            <h3 class="username">${login.username}</h3>
            <h3 class="username">${login.password}</h3>
            <h3 class="username">${login.role}</h3>
        </div>
    `
}

window.addEventListener('load', () => {
    fetch('/api/listlogin')
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