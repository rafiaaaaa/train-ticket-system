import { SearchCard } from "./SearchCard";
import { getSchedules } from "../api/getSchedules";
import { formatTime } from "@/utils/formatTime";
import { calculateDuration } from "@/utils/calculateDuration";

type ScheduleCardData = {
  scheduleId: string;
  train: {
    name: string;
    code: string;
  };
  origin: {
    name: string;
  };
  destination: {
    name: string;
  };
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
};

type Props = {
  searchParams?: {
    departure?: string;
    destination?: string;
    date?: string;
    passengers?: string;
  };
};

export default async function SearchResult({ searchParams = {} }: Props) {
  const { departure, destination, date, passengers = "1" } = await searchParams;
  if (!departure || !destination || !date) {
    return (
      <section className="py-16 text-center text-muted-foreground">
        Invalid search parameters
      </section>
    );
  }

  const data: ScheduleCardData[] = await getSchedules({
    from: departure,
    to: destination,
    date,
    passengers,
  });
  return (
    <section id="search-results" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Search Results
          </h2>
        </div>
        {data.length === 0 && (
          <div className="text-center text-muted-foreground">
            No train schedules found
          </div>
        )}
        {data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {data.map((s, index) => (
              <div
                key={s.scheduleId}
                className="animate-fade-in h-full"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <SearchCard
                  id={s.scheduleId}
                  name={s.train.name}
                  departure={s.origin.name}
                  destination={s.destination.name}
                  departureTime={formatTime(s.departureTime)}
                  arrivalTime={formatTime(s.arrivalTime)}
                  duration={calculateDuration(s.departureTime, s.arrivalTime)}
                  price={s.price}
                  tag={s.availableSeats <= 5 ? "Limited Seats" : undefined}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
