import express, { Router } from "express";

const router: Router = express.Router();

// Add routes here
router.post("/product", (req, res) => {
    // Add product creation logic here
    res.status(201).json("Product created successfully");
});

export default router;
