import "reflect-metadata";
import { createConnection } from "typeorm";
// import { User } from "./entity/User";
import * as express from "express";


const app = express();
createConnection();

//Middlewares
app.use(express.json());


//Import Routes
import itemsRoute from "./Routes/Items.route";
import userRoute from "./Routes/User.route";

//Routes Middlewares
app.use("/items", itemsRoute);
app.use("", userRoute);

app.listen(3000, () => console.log("Server listening on port 3000"));

