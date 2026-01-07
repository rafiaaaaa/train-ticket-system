"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";

export function DatePicker({
  value,
  onChange,
}: {
  value?: Date;
  onChange: (date?: Date) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="w-full h-12 justify-start text-left font-normal pl-11"
        onClick={() => setOpen(!open)}
      >
        <CalendarIcon className="absolute left-3 h-5 w-5 text-muted-foreground" />
        {value ? format(value, "PPP") : "Pick a date"}
      </Button>

      {open && (
        <div className="absolute z-50 mt-2 rounded-xl border bg-background p-3 shadow-md">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
            className="w-64"
          />
        </div>
      )}
    </div>
  );
}
