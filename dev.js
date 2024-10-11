let data = {
    "status": "success",
    "data": [
        {
            "id": 1,
            "namaPuskesmas": "test",
            "alamatPuskesmas": "test",
            "noTelepon": 1211,
            "maps": "test",
            "region": "test"
        },
        {
            "id": 2,
            "namaPuskesmas": "test",
            "alamatPuskesmas": "test",
            "noTelepon": 1211,
            "maps": "test",
            "region": "test"
        }
    ]
}

const newdata = {
    "id": 2,
    "Puskesmas": "test",
    "alamatPuskesmas": "test",
    "noTelepon": 1211,
    "maps": "test",
    "region": "test"
}

data.data[0].Dokter = newdata;

console.log(data);