const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//Config
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error.message));


// Routes
const authRoute = require("./routes/authRouter")

// Use Routes
app.use("/api/auth", authRoute);



app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
