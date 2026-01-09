import { Train, MapPin, Calendar, Clock, Armchair, Hash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderInfoCardProps {
  bookingId: string;
  trainName: string;
  trainNumber: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  classType: string;
  seats: string[];
}

export function OrderInfoCard({
  bookingId,
  trainName,
  trainNumber,
  origin,
  destination,
  date,
  time,
  classType,
  seats,
}: OrderInfoCardProps) {
  return (
    <Card className="shadow-xl border border-slate-400/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Train className="w-5 h-5 text-secondary" />
          Order Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Booking ID */}
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
          <Hash className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Booking ID</p>
            <p className="font-mono font-semibold text-foreground">
              {bookingId}
            </p>
          </div>
        </div>

        {/* Train Info */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Train className="w-4 h-4 text-muted-foreground mt-1" />
            <div>
              <p className="font-semibold text-foreground">{trainName}</p>
              <p className="text-sm text-muted-foreground">{trainNumber}</p>
            </div>
          </div>

          {/* Route */}
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-foreground">{origin}</span>
              <span className="text-muted-foreground">→</span>
              <span className="font-medium text-foreground">{destination}</span>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{time}</span>
            </div>
          </div>

          {/* Class & Seats */}
          <div className="flex items-center gap-3">
            <Armchair className="w-4 h-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground">{classType}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm font-medium text-bg-primary">
                {seats.join(", ")}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
