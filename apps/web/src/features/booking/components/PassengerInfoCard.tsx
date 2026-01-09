import { User, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Passenger {
  name: string;
  idNumber: string;
}

interface PassengerInfoCardProps {
  passengers: Passenger[];
}

export function PassengerInfoCard({ passengers }: PassengerInfoCardProps) {
  return (
    <Card className="shadow-xl border border-slate-400/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="w-5 h-5 text-secondary" />
          Passenger Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {passengers.map((passenger, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-xl space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Passenger {index + 1}
                  </p>
                  <p className="font-semibold text-foreground">
                    {passenger.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 pl-10">
                <CreditCard className="w-3.5 h-3.5 text-secondary" />
                <span className="text-sm text-muted-foreground font-mono">
                  {passenger.idNumber}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
