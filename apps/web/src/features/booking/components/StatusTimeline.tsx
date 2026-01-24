import { Check, Clock, CreditCard, Ticket } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type BookingStatus = "UNPAID" | "PENDING" | "PAID" | "EXPIRED";

interface StatusTimelineProps {
  status: BookingStatus;
  countdown?: string;
}

const steps = [
  { id: "UNPAID", label: "Unpaid Payment", icon: Clock },
  { id: "PENDING", label: "Pending", icon: CreditCard },
  { id: "PAID", label: "Paid", icon: Ticket },
];

const getStepState = (stepId: string, currentStatus: BookingStatus) => {
  const statusOrder = ["UNPAID", "PENDING", "PAID"];
  const currentIndex = statusOrder.indexOf(currentStatus);
  const stepIndex = statusOrder.indexOf(stepId);

  if (stepIndex < currentIndex) return "completed";
  if (stepIndex === currentIndex) return "active";
  return "upcoming";
};

const getStatusDescription = (status: BookingStatus) => {
  switch (status) {
    case "UNPAID":
      return "Please complete your payment to secure your booking.";
    case "PENDING":
      return "Payment received. Your ticket is being processed.";
    case "PAID":
      return "Your booking is confirmed! Have a safe journey.";
  }
};

const getStatusBadgeColor = (status: BookingStatus) => {
  switch (status) {
    case "UNPAID":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "PENDING":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "PAID":
      return "bg-green-100 text-green-700 border-green-200";
  }
};

export function StatusTimeline({ status, countdown }: StatusTimelineProps) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-xl border-2 border-green-500 border-slate-800/30">
      <div className="flex items-center justify-between mb-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-semibold border",
            getStatusBadgeColor(status),
          )}
        >
          {status === "UNPAID" && "Unpaid Payment"}
          {status === "PENDING" && "Pending Received"}
          {status === "PAID" && "Ticket Paid"}
        </motion.div>

        {status === "UNPAID" && countdown && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 text-destructive font-mono font-bold text-lg"
          >
            <Clock className="w-5 h-5" />
            {countdown}
          </motion.div>
        )}
      </div>

      {/* Timeline */}
      <div className="relative flex items-start justify-between mb-6">
        {/* Progress Line Background - positioned at center of 48px circles (24px from top) */}
        <div
          className="absolute left-0 right-0 h-1 bg-secondary/20 z-0"
          style={{ top: "22px", marginLeft: "60px", marginRight: "60px" }}
        />

        {/* Progress Line Active */}
        <motion.div
          className="absolute h-1 bg-green-500 origin-left"
          style={{ top: "22px", left: "60px", width: "calc(100% - 120px)" }}
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: status === "UNPAID" ? 0 : status === "PENDING" ? 0.5 : 1,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {steps.map((step, index) => {
          const state = getStepState(step.id, status);
          const Icon = step.icon;

          return (
            <motion.div
              key={step.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10 flex flex-col items-center"
            >
              <motion.div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  state === "completed" &&
                    "bg-green-500 border-green-500 text-white",
                  state === "active" &&
                    "bg-bg-primary border-primary text-primary",
                  state === "upcoming" &&
                    "bg-slate-100 border-muted-foreground/30 text-muted-foreground",
                )}
                whileHover={{ scale: 1.05 }}
              >
                {state === "completed" ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </motion.div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium text-center max-w-20",
                  state === "active" && "text-bg-primary font-semibold",
                  state === "upcoming" && "text-muted-foreground",
                  state === "completed" && "text-green-600",
                )}
              >
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Status Description */}
      <p className="text-center text-muted-foreground text-sm">
        {getStatusDescription(status)}
      </p>

      {/* Warning Alert for UNPAID */}
      {status === "UNPAID" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3"
        >
          <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            Complete payment before the timer ends to avoid automatic
            cancellation of your booking.
          </p>
        </motion.div>
      )}
    </div>
  );
}
