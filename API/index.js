import express from "express";
import connectDB from "./connect.db.js";
import adminRoutes from "./src/admin/admin.route.js";
import categoriesRoutes from "./src/dashboard/categories/categories.route.js";
import postRoutes from "./src/dashboard/post/post.route.js";

const app = express();

//to make app understand json
app.use(express.json());

// connect database
connectDB();

// register routes
app.use(adminRoutes);
app.use(categoriesRoutes);
app.use(postRoutes);

// network port and server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
