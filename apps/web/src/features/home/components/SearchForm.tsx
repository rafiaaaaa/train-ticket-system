"use client";

import {
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  ArrowLeftRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

const popularStations = [
  "New York Penn Station",
  "Los Angeles Union Station",
  "Chicago Union Station",
  "Boston South Station",
  "Washington DC Union Station",
  "San Francisco",
  "Seattle King Street",
  "Philadelphia 30th Street",
  "Denver Union Station",
  "Miami Central",
  "Portland Union Station",
  "San Diego Santa Fe",
  "Detroit",
  "Atlanta Peachtree",
  "Dallas Union Station",
];

interface StationDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  stations: string[];
}

function StationDropdown({
  value,
  onChange,
  placeholder,
  stations,
}: StationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredStations, setFilteredStations] = useState(stations);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const filtered = stations.filter((station) =>
        station.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStations(filtered.length > 0 ? filtered : stations);
    } else {
      setFilteredStations(stations);
    }
  }, [value, stations]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (station: string) => {
    onChange(station);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsOpen(true)}
        className="w-full h-12 pl-11 pr-4 rounded-xl input-search border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
      />
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2  bg-card border border-border rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto overflow-visible backdrop-blur-xl bg-background">
          <ul className="py-2">
            {filteredStations.slice(0, 8).map((station) => (
              <li key={station}>
                <button
                  type="button"
                  onClick={() => handleSelect(station)}
                  className="w-full px-4 py-3 text-left text-foreground hover:bg-secondary transition-colors flex items-center gap-3"
                >
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="truncate">{station}</span>
                </button>
              </li>
            ))}
            {filteredStations.length === 0 && (
              <li className="px-4 py-3 text-muted-foreground text-sm">
                No stations found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export function SearchForm() {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");

  const swapStations = () => {
    const temp = departure;
    setDeparture(destination);
    setDestination(temp);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-card rounded-2xl p-6 md:p-8 card-elevated">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Departure */}
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              From
            </label>
            <StationDropdown
              value={departure}
              onChange={setDeparture}
              placeholder="Departure station"
              stations={popularStations}
            />
          </div>

          {/* Destination */}
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              To
            </label>
            <StationDropdown
              value={destination}
              onChange={setDestination}
              placeholder="Destination station"
              stations={popularStations}
            />
          </div>

          {/* Date */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-12 rounded-xl px-4 md:px-2 input-search border border-border text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 scheme-dark"
              />
            </div>
          </div>

          {/* Passengers */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Passengers
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              <select
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="w-full h-12 rounded-xl input-search border border-border text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer md:text-right pl-11 md:pl-0 md:pr-3"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="md:col-span-full">
            <Button
              variant="hero"
              size="lg"
              className="w-full h-12 bg-amber-600 shadow-lg shadow-amber-600/50 hover:bg-amber-500 hover:shadow-lg hover:shadow-amber-500/50 active:bg-amber-600 active:shadow-lg active:shadow-amber-600/50 cursor-pointer"
            >
              Search
              <ArrowRight className="h-5 w-5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
