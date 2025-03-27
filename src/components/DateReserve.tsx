"use client";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from "dayjs";

interface DateReserveProps {
  onDateChange: (date: string) => void;
  defaultDate?: string; // optional
}

export default function DateReserve({ onDateChange, defaultDate }: DateReserveProps) {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(defaultDate ? dayjs(defaultDate) : null);

  useEffect(() => {
    if (defaultDate) {
      setSelectedDate(dayjs(defaultDate));
    }
  }, [defaultDate]);

  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
    onDateChange(newValue ? newValue.format("YYYY-MM-DD") : "");
  };

  return (
    <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="bg-white"
          value={selectedDate}
          onChange={handleDateChange}
          slots={{ textField: TextField }}
          slotProps={{ textField: { variant: "outlined" } }}
        />
      </LocalizationProvider>
    </div>
  );
}
