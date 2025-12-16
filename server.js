import express from "express";
import cors from "cors";
import joinRoutes from "./routes/join.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", joinRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
