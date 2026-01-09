import { Train, Calendar, Clock, Armchair } from "lucide-react";

interface TrainHeaderProps {
  trainName: string;
  trainNumber: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  classType: string;
}

const TrainHeader = ({
  trainName,
  trainNumber,
  origin,
  destination,
  date,
  time,
  classType,
}: TrainHeaderProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <div className="flex flex-col justify-center md:flex-row items-center sm:justify-between gap-6">
        {/* Train info */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shadow-lg">
            <Train className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl md:text-sm font-bold text-foreground">
              {trainName}
            </h1>
            <p className="text-muted-foreground text-sm">{trainNumber}</p>
          </div>
        </div>

        {/* Route */}
        <div className="flex items-center gap-10 flex-col text-center sm:flex-row sm:gap-3">
          <div className="">
            <p className="text-lg font-semibold text-foreground">{origin}</p>
            <p className="text-xs text-muted-foreground">Departure</p>
          </div>

          <div className="flex items-center gap-2 sm:px-4 my-4">
            <div className="flex items-center gap-2 rotate-90 sm:rotate-0">
              <div className="w-2 h-2 rounded-full bg-bg-primary" />
              <div className="w-16 sm:w-24 h-0.5 bg-linear-to-r from-primary to-bg-primary" />
              <svg
                className="w-5 h-5 text-bg-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>

          <div>
            <p className="text-lg font-semibold text-foreground">
              {destination}
            </p>
            <p className="text-xs text-muted-foreground">Arrival</p>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-wrap gap-4 lg:gap-6 justify-center sm:justify-start">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="font-medium text-foreground">{date}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Time</p>
              <p className="font-medium text-foreground">{time}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Armchair className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Class</p>
              <p className="font-medium text-foreground">{classType}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainHeader;
