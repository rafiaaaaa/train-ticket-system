import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SeatStatus } from "./SchedulePage";

interface Seat {
  id: string;
  number: string;
  status: SeatStatus;
}

interface SeatMapProps {
  seats: Seat[];
  onSeatClick: (seatId: string) => void;
}

const SeatMap = ({ seats, onSeatClick }: SeatMapProps) => {
  const rows: Seat[][] = [];
  for (let i = 0; i < seats.length; i += 4) {
    rows.push(seats.slice(i, i + 4));
  }
  const getSeatClasses = (status: SeatStatus) => {
    const base =
      "w-10 h-10 sm:w-12 sm:h-12 rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center transition-all duration-200";

    switch (status) {
      case "available":
        return cn(
          base,
          "bg-bg-primary/90 text-primary hover:bg-bg-primary cursor-pointer hover:scale-105 hover:shadow-md",
        );
      case "selected":
        return cn(
          base,
          "bg-blue-600 text-white ring-2 ring-blue-500/30 ring-offset-2 ring-offset-background scale-105 shadow-lg",
        );
      case "occupied":
        return cn(
          base,
          "bg-zinc-300 text-zinc-500 cursor-not-allowed opacity-60",
        );
    }
  };

  return (
    <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-card">
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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          Coach A - Economy
        </h3>
      </div>

      <div className="flex items-center justify-center gap-2 mb-6 text-muted-foreground text-sm">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
        <span>Direction of travel</span>
      </div>

      {/* Seat grid */}
      <div className="overflow-x-auto py-4">
        <div className="max-w-96 space-y-3 mx-auto">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex items-center justify-center gap-2 sm:gap-3"
            >
              {/* Left seats */}
              <div className="gap-2 grid grid-cols-2">
                {row.slice(0, 2).map((seat) => (
                  <motion.button
                    key={seat.id}
                    whileTap={
                      seat.status !== "occupied" ? { scale: 0.95 } : undefined
                    }
                    className={getSeatClasses(seat.status)}
                    onClick={() =>
                      seat.status !== "occupied" && onSeatClick(seat.id)
                    }
                    disabled={seat.status === "occupied"}
                  >
                    {seat.number}
                  </motion.button>
                ))}
              </div>

              {/* Aisle */}
              <div className="w-6 sm:w-10 flex items-center justify-center">
                <div className="w-full h-0.5 bg-border rounded-full" />
              </div>

              {/* Right seats */}
              <div className="grid gap-2 grid-cols-2 justify-start">
                {row.slice(2, 4).map((seat) => (
                  <motion.button
                    key={seat.id}
                    whileTap={
                      seat.status !== "occupied" ? { scale: 0.95 } : undefined
                    }
                    className={getSeatClasses(seat.status)}
                    onClick={() =>
                      seat.status !== "occupied" && onSeatClick(seat.id)
                    }
                    disabled={seat.status === "occupied"}
                  >
                    {seat.number}
                  </motion.button>
                ))}

                {Array.from({ length: 2 - row.slice(2, 4).length }).map(
                  (_, i) => (
                    <div
                      key={`right-placeholder-${i}`}
                      className="w-10 h-10 sm:w-12 sm:h-12 invisible"
                    />
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-bg-primary border border-slate-200" />
            <span className="text-muted-foreground">Available</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-blue-600 ring-2 ring-blue-500/30" />
            <span className="text-muted-foreground">Selected</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-zinc-300 opacity-60" />
            <span className="text-muted-foreground">Occupied</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
