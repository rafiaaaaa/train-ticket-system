import { Router, Response, Request } from "express";
import bookingRoutes from "../features/booking/booking.route";
import authRoutes from "../features/auth/auth.route";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Train Ticket System API is running ✅");
});
router.use("/auth", authRoutes);
router.use("/bookings", bookingRoutes);

export default router;
