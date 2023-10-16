const express = require('express')

const app = express()
app.use(express.json())

app.get("/status", (request, response) => {
    const status = {
       "Status": "Running"
    }
    
    response.send(status)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT)
})