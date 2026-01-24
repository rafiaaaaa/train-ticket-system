"use client";

import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Train } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  StatusTimeline,
  BookingStatus,
} from "@/features/booking/components/StatusTimeline";
import { OrderInfoCard } from "@/features/booking/components/OrderInfoCard";
import { PaymentSummaryCard } from "@/features/booking/components/PaymentSummaryCard";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { getBooking } from "@/features/booking/api/getBooking";
import { useParams } from "next/navigation";
import { formatDate } from "@/utils/formatDate";
import { calculateDuration } from "@/utils/calculateDuration";
import { createPayment } from "@/features/booking/api/createPaymentLink";

export interface TrainInfo {
  name: string;
  code: string;
}

export interface Route {
  name: string;
  code: string;
}

export interface RouteInfo {
  origin: Route;
  destination: Route;
}

export interface Passenger {
  name: string;
  idNumber: string;
}

export interface BookingData {
  bookingId: string;
  status: BookingStatus;
  train: TrainInfo;
  route: RouteInfo;
  departureTime: string;
  arrivalTime: string;
  classType: string;
  seats: string[];
  passengers: Passenger[];
  totalPrice: string;
  adminFee: number;
  paymentUrl: string;
}

const OrderDetail = () => {
  const [countdown, setCountdown] = useState(10 * 60);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const status = useMemo(() => {
    if (bookingData) {
      return bookingData.status as BookingStatus;
    }
    return "UNPAID";
  }, [bookingData]);

  // Countdown timer for pending status
  useEffect(() => {
    if (status !== "UNPAID") return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    async function fetchBooking(bookingId: string) {
      const booking = await getBooking(params.bookingId! as string);
      setBookingData(booking);
    }

    fetchBooking(params.bookingId! as string);
  }, []);

  const handlePayNow = async () => {
    setLoading(true);

    try {
      const res = await createPayment(bookingData!.bookingId);

      window.location.href = res.payment_url;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleCancelOrder = () => {
    // toast({
    //   title: "Order Cancelled",
    //   description: "Your booking has been cancelled.",
    //   variant: "destructive",
    // });
  };

  const handleDownloadTicket = () => {
    // toast({
    //   title: "Downloading Ticket",
    //   description: "Your e-ticket is being downloaded...",
    // });
  };

  const handleViewETicket = () => {
    // toast({
    //   title: "Opening E-Ticket",
    //   description: "Loading your ticket details...",
    // });
  };

  if (!bookingData) {
    return;
  }

  if (bookingData.status == "EXPIRED") {
    return (
      <Section>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Train className="w-6 h-6 text-secondary" />
              <h1 className="text-xl font-bold text-foreground">
                Order Expired
              </h1>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Train className="w-6 h-6 text-secondary" />
            <h1 className="text-xl font-bold text-foreground">Order Details</h1>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto space-y-6"
      >
        <StatusTimeline
          status={status}
          countdown={
            status === "UNPAID" ? formatCountdown(countdown) : undefined
          }
        />

        {/* Status Demo Buttons (for demonstration) */}
        <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-xl">
          <span className="text-sm text-muted-foreground mr-2">
            Demo Status:
          </span>
          <Button
            size="sm"
            variant={status === "UNPAID" ? "default" : "outline"}
            onClick={() =>
              setBookingData((prev) => prev && { ...prev, status: "UNPAID" })
            }
          >
            UNPAID
          </Button>
          <Button
            size="sm"
            variant={status === "PENDING" ? "default" : "outline"}
            onClick={() =>
              setBookingData((prev) => prev && { ...prev, status: "PENDING" })
            }
          >
            PENDING
          </Button>
          <Button
            size="sm"
            variant={status === "PAID" ? "default" : "outline"}
            onClick={() =>
              setBookingData((prev) => prev && { ...prev, status: "PAID" })
            }
          >
            PAID
          </Button>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left Column - Order & Passenger Info */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <OrderInfoCard
                bookingId={bookingData?.bookingId}
                trainName={bookingData.train.name}
                trainNumber={bookingData.train.code}
                origin={bookingData.route.origin.name}
                destination={bookingData.route.destination.name}
                date={formatDate(bookingData.departureTime)}
                time={calculateDuration(
                  bookingData.departureTime,
                  bookingData.arrivalTime,
                )}
                classType={bookingData.classType}
                seats={bookingData.seats}
              />
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <PassengerInfoCard passengers={orderData.passengers} />
            </motion.div> */}
          </div>

          {/* Right Column - Payment Summary */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:sticky lg:top-24"
            >
              <PaymentSummaryCard
                ticketPrice={parseInt(bookingData.totalPrice)}
                passengerCount={bookingData.seats.length}
                paymentUrl={bookingData.paymentUrl}
                status={status}
                onPayNow={handlePayNow}
                onCancelOrder={handleCancelOrder}
                onDownloadTicket={handleDownloadTicket}
                onViewETicket={handleViewETicket}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default OrderDetail;
