const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const dbURI = 
  "mongodb+srv://princeagrawal240:Prince123@cluster0.7pzneq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const cartRoute = require("./routes/cartRoute");

app.use("/api", authRoute);
app.use("/api/products", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/cart", cartRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
