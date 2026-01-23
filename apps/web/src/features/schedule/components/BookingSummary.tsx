import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/Card";

interface SelectedSeat {
  id: string;
  number: string;
}

interface BookingSummaryProps {
  selectedSeats: SelectedSeat[];
  pricePerSeat: number;
  onConfirm: () => void;
  onBack: () => void;
}

const BookingSummary = ({
  selectedSeats,
  pricePerSeat,
  onConfirm,
  onBack,
}: BookingSummaryProps) => {
  const totalPrice = selectedSeats.length * pricePerSeat;
  const hasSelection = selectedSeats.length > 0;

  return (
    <Card className="p-6 shadow-card h-fit sticky top-20">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          Booking Summary
        </h3>
      </div>

      {/* Selected Seats */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Selected Seats</span>
          <AnimatePresence mode="wait">
            {hasSelection ? (
              <motion.div
                key="seats"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex flex-wrap gap-1.5 justify-end max-w-37.5"
              >
                {selectedSeats.map((seat) => (
                  <motion.span
                    key={seat.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="bg-bg-primary text-primary px-2 py-0.5 rounded text-xs font-medium"
                  >
                    {seat.number}
                  </motion.span>
                ))}
              </motion.div>
            ) : (
              <motion.span
                key="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted-foreground italic"
              >
                None
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Passengers</span>
          <span className="font-medium text-foreground">
            {selectedSeats.length}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Price per seat</span>
          <span className="font-medium text-foreground">
            Rp {pricePerSeat.toLocaleString()}
          </span>
        </div>

        <div className="h-px bg-border my-4" />

        <div className="flex justify-between items-center">
          <span className="font-semibold text-foreground">Total Price</span>
          <motion.span
            key={totalPrice}
            initial={{ scale: 1.1, color: "hsl(var(--seat-selected))" }}
            animate={{ scale: 1, color: "hsl(var(--foreground))" }}
            className="text-xl font-bold text-foreground"
          >
            Rp {totalPrice.toLocaleString()}
          </motion.span>
        </div>
      </div>

      {/* Warning message */}
      <AnimatePresence>
        {!hasSelection && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20">
              <AlertCircle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
              <p className="text-sm text-warning">
                Please select at least one seat to continue
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={onConfirm}
          disabled={!hasSelection}
          className="w-full bg-bg-primary text-primary"
          size="lg"
        >
          <Check className="w-4 h-4 mr-2" />
          Confirm Seat
        </Button>

        <Button onClick={onBack} variant="outline" className="w-full" size="lg">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Schedule
        </Button>
      </div>
    </Card>
  );
};

export default BookingSummary;
