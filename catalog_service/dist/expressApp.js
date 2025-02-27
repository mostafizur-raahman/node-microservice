"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catalog_routes_1 = __importDefault(require("./api/catalog.routes"));
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
// Import routes
app.use("/", catalog_routes_1.default);
exports.default = app;
