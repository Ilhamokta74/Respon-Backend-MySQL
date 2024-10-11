const renderUserItem = user => {
    return `
    <div class="user-container">

        </div>
        
<table class="table">
      <tbody>
          <tr>
          <th scope="row"> ${user.id}</th>
          <td>${user.name}</td>
          <td>${user.poli}</td>
          <td>${user.tax}</td>
          </tr>
      </tbody>
  </table>

        
    `
}

window.addEventListener('load', () => {
    fetch('./api/list')
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

