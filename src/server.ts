import "../bootstrap";
import express, { Express, Request, Response, NextFunction } from "express";

import { connectToMongoDB } from "./infrastructure/mongodb/mongodb";
import { authRoutes } from "webApis/routes/auth-routes";
import { messageRoutes } from "./webApis/routes/messages-routes";

const app: Express = express();
const port = 3000; // Set your desired port number

// Middleware
app.use(express.json()); // Parse incoming JSON data

// Set up routes
authRoutes(app);
messageRoutes(app)
// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Something went wrong" });
});

connectToMongoDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
  });
