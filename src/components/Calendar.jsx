import { useState } from "react";
import dayjs from "dayjs";

export default function Calendar({ value, onChange }) {
  const [currentMonth, setCurrentMonth] = useState(dayjs(value || new Date()));

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const days = [];
  let day = startDate;
  while (day.isBefore(endDate) || day.isSame(endDate, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  return (
    <div className="bg-[#233554] rounded-lg p-4 shadow text-[#e0e6ed] w-fit">
      <div className="flex justify-between items-center mb-2">
        <button
          className="px-2 py-1 rounded hover:bg-[#38ef7d] hover:text-[#233554] transition"
          onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
        >
          &lt;
        </button>
        <span className="font-bold">{currentMonth.format("MMMM YYYY")}</span>
        <button
          className="px-2 py-1 rounded hover:bg-[#38ef7d] hover:text-[#233554] transition"
          onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-1">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map(d => (
          <button
  key={d.format("YYYY-MM-DD")}
  className={`rounded p-1 w-8 h-8
    ${d.isSame(value, "day") ? "bg-green-100 text-green-700 font-bold" : ""}
    ${d.isSame(currentMonth, "month") ? "" : "opacity-40"}
    hover:bg-green-100 hover:text-green-700 transition`}
  onClick={() => onChange && onChange(d)}
>
  {d.date()}
</button>
        ))}
      </div>
    </div>
  );
}