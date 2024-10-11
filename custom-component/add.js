window.addEventListener('load', () => {

    document.getElementById('add').addEventListener('click', () => {

        const tax = document.getElementById('tax').value
        const poli = document.getElementById('poli').value
        const date = document.getElementById('date').value
        const name = document.getElementById('name').value
        const nik = document.getElementById('nik').value
        const address = document.getElementById('address').value
        const handphone = document.getElementById('handphone').value

        // if (!name || !company) return console.log('Isi dulu bossque');

        fetch(`/api/add?tax=${tax}&poli=${poli}&date=${date}&name=${name}&nik=${nik}&address=${address}&handphone=${handphone}`)
            .then(res => res.json())
            .then(result => {
                console.log('success', result);
            })
            .catch(eror => {
                console.log(eror);
            })
    })

    // document.getElementById('edit').addEventListener('click', () => {

    //     const id = document.getElementById('id').value
    //     const name = document.getElementById('name').value
    //     const company = document.getElementById('company').value

    //     if (!name || !company || !id) return console.log('Isi dulu bossque');

    //     fetch(`/api/edit?name=${name}&company=${company}&id=${id}`)
    //         .then(res => res.json())
    //         .then(result => {
    //             console.log('edit berhasil', result);
    //         })
    //         .catch(eror => {
    //             console.log(eror);
    //         })
    // })

    // document.getElementById('delete').addEventListener('click', () => {

    //     const id = document.getElementById('id').value

    //     if (!id) return console.log('Isi dulu bossque');

    //     fetch(`/api/delete?id=${id}`)
    //         .then(res => res.json())
    //         .then(result => {
    //             console.log('hapus berhasil', result);
    //         })
    //         .catch(eror => {
    //             console.log(eror);
    //         })
    // })

    
})