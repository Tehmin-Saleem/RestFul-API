const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.route");
const cors= require('cors')
const app = express();


const cookieParser = require("cookie-parser");
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(cookieParser("12345"));
const PORT = process.env.PORT || 3000;


connectDB();


app.use("/api/users", userRoutes);





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
