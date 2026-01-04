import express from "express";
import cors from "cors";
import routes from "./routes/index.route";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

app.use(routes);

export default app;
