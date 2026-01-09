"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import TrainHeader from "@/features/schedule/components/TrainHeader";
import SeatMap from "@/features/schedule/components/SeatMap";
import BookingSummary from "@/features/schedule/components/BookingSummary";
import Card from "@/components/Card";

type SeatStatus = "available" | "selected" | "occupied";

interface Seat {
  id: string;
  status: SeatStatus;
}

const generateSeats = (): Seat[] => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const seats: Seat[] = [];

  rows.forEach((row) => {
    for (let i = 1; i <= 4; i++) {
      const seatId = `${row}${i}`;
      const isOccupied = Math.random() < 0.3;
      seats.push({
        id: seatId,
        status: isOccupied ? "occupied" : "available",
      });
    }
  });

  return seats;
};

const Index = () => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const selectedSeats = useMemo(() => {
    return seats
      .filter((seat) => seat.status === "selected")
      .map((seat) => seat.id);
  }, [seats]);

  useEffect(() => {
    setSeats(generateSeats());
  }, []);

  const handleSeatClick = useCallback((seatId: string) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) => {
        if (seat.id === seatId) {
          const newStatus: SeatStatus =
            seat.status === "selected" ? "available" : "selected";
          return { ...seat, status: newStatus };
        }
        return seat;
      })
    );
  }, []);

  const handleConfirm = () => {
    return;
  };

  const handleBack = () => {
    return;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 container max-w-6xl mx-auto px-4 py-6 sm:py-10">
        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Select Your Seats
          </h1>
        </div>

        {/* Train Header */}
        <Card>
          <TrainHeader
            trainName="Argo Wilis"
            trainNumber="KA-207"
            origin="Jakarta"
            destination="Surabaya"
            date="Jan 15, 2026"
            time="08:00 AM"
            classType="Economy"
          />
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card className="lg:col-span-2">
            <SeatMap seats={seats} onSeatClick={handleSeatClick} />
          </Card>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <BookingSummary
              selectedSeats={selectedSeats}
              pricePerSeat={150000}
              onConfirm={handleConfirm}
              onBack={handleBack}
            />
          </div>
        </div>
        {/* Seat Map */}

        {/* Help text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Need help?{" "}
            <a href="#" className="text-primary hover:underline font-medium">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
