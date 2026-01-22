import { Train, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface TrainCardProps {
  id: string;
  name: string;
  departure: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  tag?: string;
}

export function SearchCard({
  id,
  name,
  departure,
  destination,
  departureTime,
  arrivalTime,
  duration,
  price,
  tag,
}: TrainCardProps) {
  return (
    <div className="bg-card rounded-2xl p-6 card-elevated group shadow-xl bg-primary h-full flex flex-col">
      {/* Tag */}
      {tag && (
        <div className="inline-flex px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-4">
          {tag}
        </div>
      )}

      {/* Train Name */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
          <Train className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-bold text-secondary">{name}</h3>
      </div>

      {/* Route */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1">
          <p className="text-sm text-muted-secondary mb-1">From</p>
          <p className="font-semibold text-secondary">{departure}</p>
          <p className="text-lg font-bold text-secondary">{departureTime}</p>
        </div>
        <div className="flex flex-col items-center px-4">
          <div className="flex items-center gap-2 text-muted-secondary">
            <div className="w-12 h-px bg-border" />
            <Clock className="h-4 w-4" />
            <div className="w-12 h-px bg-border" />
          </div>
          <span className="text-xs text-muted-secondary mt-1">{duration}</span>
        </div>
        <div className="flex-1 text-right">
          <p className="text-sm text-muted-secondary mb-1">To</p>
          <p className="font-semibold text-secondary">{destination}</p>
          <p className="text-lg font-bold text-secondary">{arrivalTime}</p>
        </div>
      </div>

      {/* Price & CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
        <div>
          <p className="text-sm text-muted-secondary">From</p>
          <p className="text-2xl font-bold text-secondary">
            ${price}
            <span className="text-sm font-normal text-muted-secondary">
              /person
            </span>
          </p>
        </div>
        <Link href={`/schedule/${id}`}>
          <Button
            variant="accent"
            className="group-hover:shadow-lg transition-shadow bg-bg-primary text-primary cursor-pointer"
          >
            Book Now
            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
