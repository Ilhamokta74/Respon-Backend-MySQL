const express = require('express');
const app = express();
const port = 3000
const getRouter = require('./routes/routes')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/', getRouter)



app.listen (port, ()=> {
    console.log(`server berjalan di http://localhost:${port}`)
})