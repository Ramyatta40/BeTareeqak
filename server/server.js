const express = require('express')
const app = express()


app.get("/api", (req, res) => {

    res.json({ "user": ["name", "pass", "number"] })
})


app.listen(5000, () => { console.log("Server Started at port 5000") })