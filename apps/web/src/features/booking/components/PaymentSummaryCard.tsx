import {
  CreditCard,
  Download,
  Eye,
  QrCode,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookingStatus } from "./StatusTimeline";
import { useState } from "react";

interface PaymentSummaryCardProps {
  ticketPrice: number;
  passengerCount: number;
  status: BookingStatus;
  paymentUrl: string;
  onPayNow?: () => void;
  onCancelOrder?: () => void;
  onDownloadTicket?: () => void;
  onViewETicket?: () => void;
}
const adminFee = Number(process.env.NEXT_PUBLIC_ADMIN_FEE) || 1000;
export function PaymentSummaryCard({
  ticketPrice,
  passengerCount,
  paymentUrl,
  status,
  onPayNow,
  onCancelOrder,
  onDownloadTicket,
  onViewETicket,
}: PaymentSummaryCardProps) {
  const [loading, setLoading] = useState(false);
  const subtotal = ticketPrice;
  const total = subtotal + adminFee;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleFinishPayment = () => {
    setLoading(true);

    window.location.assign(paymentUrl);
  };

  return (
    <Card className="shadow-xl border border-slate-400/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-secondary" />
          Payment Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Ticket Price × {passengerCount}
            </span>
            <span className="text-foreground">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Admin Fee</span>
            <span className="text-foreground">{formatPrice(adminFee)}</span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="font-semibold text-secondary">Total</span>
          <motion.span
            key={total}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-xl font-bold text-secondary"
          >
            {formatPrice(total)}
          </motion.span>
        </div>

        <Separator />

        {/* Actions based on status */}
        {status === "UNPAID" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <Button onClick={onPayNow} className="w-full" size="lg">
              <CreditCard className="w-4 h-4 mr-2" />
              Pay Now
            </Button>
            <Button
              onClick={onCancelOrder}
              variant="outline"
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              Cancel Order
            </Button>
          </motion.div>
        )}

        {status === "PENDING" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                <div>
                  <p className="font-medium text-blue-800">Processing Ticket</p>
                  <p className="text-sm text-blue-600">
                    Your ticket is being confirmed. This may take a moment.
                  </p>
                </div>
              </div>
            </div>
            <Button
              onClick={handleFinishPayment}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Finish Payment
            </Button>
          </motion.div>
        )}

        {status === "PAID" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Success Message */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Booking Paid!</p>
                  <p className="text-sm text-green-600">
                    Your e-ticket is ready for download.
                  </p>
                </div>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="flex flex-col items-center p-6 bg-muted/50 rounded-xl">
              <div className="w-32 h-32 bg-white rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center mb-3">
                <QrCode className="w-16 h-16 text-muted-foreground/50" />
              </div>
              <p className="text-xs text-muted-foreground">
                Scan QR code at the station
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={onDownloadTicket}
                variant="outline"
                className="w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button onClick={onViewETicket} className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                View E-Ticket
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
