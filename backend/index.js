import express from "express";
import cookieRoutes from "./Routes/cookies.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", cookieRoutes);

app.listen(8800, () => {
    console.log("Servidor rodando na porta 8800");
});