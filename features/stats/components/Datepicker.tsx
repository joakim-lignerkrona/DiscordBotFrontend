import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Datepicker({ onDatepick }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        showTimeSelect
        dateFormat="Pp"
      />
      <DatePicker
        selected={endDate}
        onChange={(date: Date) => setEndDate(date)}
        showTimeSelect
        dateFormat="Pp"
      />
    </div>
  );
}
