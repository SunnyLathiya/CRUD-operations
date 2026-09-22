// const express = require("express");
// const app = express();

// app.listen(3000, ()=> {
//     console.log("app is running successfully");

// })

// app.get("/", (req, res) => {
//     res.send(`<h1>this is home page</h1>`)
// })

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const blog = require("./routes/blog");

app.use("/api/v1", blog);

const connectWithDb = require("./config/database");
connectWithDb();

app.listen(PORT, () => {
    console.log(` app is started at port no ${PORT}`);
});

app.get("/", (req,res) => {
    res.send(`<h1>this is home page</h1>`);
});