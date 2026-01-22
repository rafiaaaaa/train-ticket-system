"use client";

import { useState, useMemo, useCallback } from "react";
import TrainHeader from "@/features/schedule/components/TrainHeader";
import SeatMap from "@/features/schedule/components/SeatMap";
import BookingSummary from "@/features/schedule/components/BookingSummary";
import Card from "@/components/Card";
import { formatTime } from "@/utils/formatTime";

export type SeatStatus = "available" | "selected" | "occupied";

type Seat = {
  id: string;
  number: string;
  isAvailable: boolean;
};

type Props = {
  data: {
    schedule: any;
    seats: Seat[];
  };
};

export default function SchedulePage({ data }: Props) {
  const { schedule } = data;

  const [seats, setSeats] = useState(
    data.seats.map((s) => ({
      id: s.id,
      number: s.number,
      status: (s.isAvailable ? "available" : "occupied") as SeatStatus,
    })),
  );

  const selectedSeats = useMemo(
    () => seats.filter((s) => s.status === "selected").map((s) => s.number),
    [seats],
  );

  const handleSeatClick = useCallback((seatId: string) => {
    setSeats((prev) =>
      prev.map((seat) => {
        if (seat.id !== seatId) return seat;
        if (seat.status === "occupied") return seat;

        return {
          ...seat,
          status: seat.status === "selected" ? "available" : "selected",
        };
      }),
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* Header */}
        <Card>
          <TrainHeader
            trainName={schedule.train.name}
            trainNumber={schedule.train.code}
            origin={schedule.origin}
            destination={schedule.destination}
            date={new Date(schedule.departureTime).toDateString()}
            time={formatTime(schedule.departureTime)}
            classType="Economy"
          />
        </Card>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <SeatMap seats={seats} onSeatClick={handleSeatClick} />
          </Card>

          <BookingSummary
            selectedSeats={selectedSeats}
            pricePerSeat={schedule.price}
            onConfirm={() => {}}
            onBack={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
