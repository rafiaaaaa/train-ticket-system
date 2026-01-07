import { SearchCard } from "./SearchCard";

const featuredTrains = [
  {
    name: "Express Sunrise",
    departure: "New York",
    destination: "Boston",
    departureTime: "06:15",
    arrivalTime: "10:30",
    duration: "4h 15m",
    price: 49,
    tag: "Most Popular",
  },
  {
    name: "Coastal Line",
    departure: "Los Angeles",
    destination: "San Diego",
    departureTime: "09:00",
    arrivalTime: "11:45",
    duration: "2h 45m",
    price: 35,
    tag: "Best Value",
  },
  {
    name: "Metro Connect",
    departure: "Chicago",
    destination: "Detroit",
    departureTime: "14:30",
    arrivalTime: "19:15",
    duration: "4h 45m",
    price: 55,
  },
  {
    name: "Pacific Voyager",
    departure: "Seattle",
    destination: "Portland",
    departureTime: "08:00",
    arrivalTime: "11:30",
    duration: "3h 30m",
    price: 42,
    tag: "Scenic Route",
  },
];

export default function SearchResult() {
  return (
    <section id="promotions" className="py-16 md:py-24 bg-slate-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Search Results
          </h2>
          <p className="text-lg text-muted-secondary max-w-2xl mx-auto">
            Discover our most-loved train journeys with special promotions and
            guaranteed comfort.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {featuredTrains.map((train, index) => (
            <div
              key={train.name}
              className="animate-fade-in h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <SearchCard {...train} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
