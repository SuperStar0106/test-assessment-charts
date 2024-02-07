import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import {  format, differenceInDays, max } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "~/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { PopoverClose } from "@radix-ui/react-popover"

export function DatePickerWithRange({
  className,
  setRange,
}: React.HTMLAttributes<HTMLDivElement> & {
    setRange: (range: DateRange) => void;
    }) {
  const maxRange = 7; // Set the maximum range to 7 days

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 27),
    to: new Date(2024, 1, 2),
  });

  const isOutsideRange = (day: Date) => {
    if (!date || !date.from) return false;

    const diff = differenceInDays(day, date.from);
    return diff < 0 || diff > maxRange;
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
          variant={"outline" }
            id="date"
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            modifiers={{
              range: { from: date?.from, to: date?.to },
              isOutsideRange,
            }}
            fromDate={new Date(2023, 9, 26)}
            
          />
            <div className="flex justify-end p-2">
                <PopoverClose>
                <Button
                variant="secondary"
                disabled={!date}
                onClick={() => {
                    if (date) setRange(date);
                }}
                >
                Apply
                </Button>
                </PopoverClose>
            </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
