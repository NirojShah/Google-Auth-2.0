const http = require("http")
const dotenv = require("dotenv")

dotenv.config({
    path: "./.env"
})

const app = require("./app")

const mongoose = require("mongoose")

let server = http.createServer(app)



mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("db connected")
}).catch((err) => {
    console.log("error while connecting to db")
})

server.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("server started")
})