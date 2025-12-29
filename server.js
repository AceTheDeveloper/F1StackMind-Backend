import express from "express";
import cors from "cors";
import joinRoutes from "./routes/join.routes.js";
import applicantRoutes from './routes/applicants.routes.js'
import authRoutes from './routes/auth.routes.js'
import memberRoutes from './routes/members.routes.js'
import sequelize from "./config/db.js";
import ApplicantModel from "./models/ApplicantModel.js";
import UserModel from "./models/UserModel.js";
import MemberModel from './models/MemberModel.js'
import path from 'path'


const app = express();
app.use('/assets', express.static(path.join(process.cwd(), 'assets')));

app.use(cors());
app.use(express.json());



// Database Server

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");

    await sequelize.sync({ alter: false}); //Always modify this if you want to migrate/seed a data
    console.log("All models synchronized!");

    app.listen(3000, () => console.log("Server running on port 3000"));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();

app.use("/api", joinRoutes);
app.use("/api", applicantRoutes);
app.use("/api", authRoutes);
app.use("/api", memberRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
