const express = require("express");
const app = express();

//Middlewares
app.use(express.json());


//Import Routes
const itemsRoute = require("./Routes/Items");
const userRoute = require("./Routes/User");

//Routes Middlewares
app.use("/items", itemsRoute);
app.use("", userRoute);

app.listen(3000, () => console.log("Server listening on port 3000"));
