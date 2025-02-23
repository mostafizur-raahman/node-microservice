import express from "express";
import catalogRoute from "./api/catalog.routes";

const app = express();

// middleware
app.use(express.json());

// Import routes
app.use("/", catalogRoute);

export default app;
