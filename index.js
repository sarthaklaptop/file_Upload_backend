const express = require("express");
const fileupload = require("express-fileupload");

const cors = require("cors");

const app = express();

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const mediaConnect = require("./config/cloudenary");
mediaConnect();

require("dotenv"). config()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors());


const dbConnect = require("./config/database")
dbConnect();

const routes = require("./routes/routes");

app.use("/api/v1", routes)

app.get("/", (req, res) => {
    res.send("<h1>This is home page Baby</h1>")
})

app.listen(PORT, () => {
    console.log(`Server started successfully ${PORT}`)
})