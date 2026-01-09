"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Train } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  StatusTimeline,
  BookingStatus,
} from "@/features/booking/components/StatusTimeline";
import { OrderInfoCard } from "@/features/booking/components/OrderInfoCard";
import { PassengerInfoCard } from "@/features/booking/components/PassengerInfoCard";
import { PaymentSummaryCard } from "@/features/booking/components/PaymentSummaryCard";
import Link from "next/link";
import { Section } from "@/components/ui/section";

// Mock order data
const orderData = {
  bookingId: "TRN-2024-A7X9K2",
  trainName: "Argo Bromo Anggrek",
  trainNumber: "KA-84",
  origin: "Jakarta Gambir",
  destination: "Surabaya Gubeng",
  date: "Fri, 10 Jan 2025",
  time: "08:00",
  classType: "Executive",
  seats: ["A1", "A2"],
  passengers: [
    { name: "John Doe", idNumber: "3171****5678" },
    { name: "Jane Doe", idNumber: "3171****8765" },
  ],
  ticketPrice: 550000,
  adminFee: 7500,
};

const OrderDetail = () => {
  const [status, setStatus] = useState<BookingStatus>("pending");
  const [countdown, setCountdown] = useState(15 * 60); // 15 minutes in seconds

  // Countdown timer for pending status
  useEffect(() => {
    if (status !== "pending") return;

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

  const handlePayNow = () => {
    // toast({
    //   title: "Processing Payment",
    //   description: "Redirecting to payment gateway...",
    // });
    // // Simulate payment process
    // setTimeout(() => {
    //   setStatus("paid");
    //   toast({
    //     title: "Payment Successful",
    //     description: "Your payment has been received.",
    //   });
    //   // Simulate ticket confirmation
    //   setTimeout(() => {
    //     setStatus("confirmed");
    //     toast({
    //       title: "Ticket Confirmed",
    //       description: "Your e-ticket is now ready!",
    //     });
    //   }, 3000);
    // }, 2000);
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
            status === "pending" ? formatCountdown(countdown) : undefined
          }
        />

        {/* Status Demo Buttons (for demonstration) */}
        <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-xl">
          <span className="text-sm text-muted-foreground mr-2">
            Demo Status:
          </span>
          <Button
            size="sm"
            variant={status === "pending" ? "default" : "outline"}
            onClick={() => setStatus("pending")}
          >
            Pending
          </Button>
          <Button
            size="sm"
            variant={status === "paid" ? "default" : "outline"}
            onClick={() => setStatus("paid")}
          >
            Paid
          </Button>
          <Button
            size="sm"
            variant={status === "confirmed" ? "default" : "outline"}
            onClick={() => setStatus("confirmed")}
          >
            Confirmed
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
                bookingId={orderData.bookingId}
                trainName={orderData.trainName}
                trainNumber={orderData.trainNumber}
                origin={orderData.origin}
                destination={orderData.destination}
                date={orderData.date}
                time={orderData.time}
                classType={orderData.classType}
                seats={orderData.seats}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <PassengerInfoCard passengers={orderData.passengers} />
            </motion.div>
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
                ticketPrice={orderData.ticketPrice}
                adminFee={orderData.adminFee}
                passengerCount={orderData.passengers.length}
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
