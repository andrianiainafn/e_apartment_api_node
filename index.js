const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const apartmentRoutes = require('./src/routes/apartment.route')

app.use(
    cors({
        origin:['htto://localhost:3000'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    })
)
app.use(express.json())
app.use('/apartments',apartmentRoutes)
dotenv.config()
mongoose.set('strict',true)
main()
    .then(()=>console.log('DB connected successfully'))
    .catch((err)=>console.log(err))

app.listen(8080,()=>{
    console.log("listenning on port:" + 8080)
})
async function main(){
    await mongoose.connect(process.env.MONGO_URL)
}