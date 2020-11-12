const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Product = require("./models/product");

//Connecting to mongodb.
mongoose
  .connect("mongodb://localhost:27017/farmStand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch((err) => {
    console.log("Mongo Connection Error");
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//SHOW PRODUCTS
app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.render("products/index", { products });
});

//ADD A PRODUCT
app.post("/products", async (req, res) => {
  const product = new Product(({ name, price, category } = req.body));
  await product.save();
  res.redirect(`/products/${product._id}`);
});

//SHOW NEW PRODUCT FORM
app.get("/products/new", (req, res) => {
  res.render("products/new");
});

//SHOW SPECIFIC PRODUCT
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/show", { product });
});

//SHOW EDIT PRODUCT FORM
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product });
});

//UPDATE PRODUCT
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

app.listen(8080, () => {
  console.log("App is listening at port 8080");
});
