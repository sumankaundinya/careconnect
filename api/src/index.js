import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import eldersRouter from "./routes/elders.js";
import volunteersRouter from "./routes/volunteers.js";
import servicesRouter from "./routes/services.js";
import volunteerServicesRouter from "./routes/volunteerServices.js";
import availableTimeRouter from "./routes/availableTime.js";
import reviewsRouter from "./routes/reviews.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/elders", eldersRouter);
app.use("/api/volunteers", volunteersRouter);
app.use("/api/services", servicesRouter);
app.use("/api/volunteer-services", volunteerServicesRouter);
app.use("/api/available-time", availableTimeRouter);
app.use("/api/reviews", reviewsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
