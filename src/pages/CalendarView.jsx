import { useState } from "react";
import Calendar from "../components/Calendar";
import dayjs from "dayjs";

export default function CalendarView({ pages, onSelectPage, onAddTaskWithDate, onDeletePage }) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [search, setSearch] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const tasks = pages.filter(
    p =>
      p.dueDate &&
      dayjs(p.dueDate).isSame(selectedDate, "day") &&
      (!search || p.title.toLowerCase().includes(search.toLowerCase()))
  );

  const getDateTimeISO = () => {
    const [hour, minute] = selectedTime.split(":");
    return selectedDate.hour(hour).minute(minute).second(0).millisecond(0).toISOString();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Task Calendar</h2>
      <div className="flex gap-8 flex-wrap">
        <Calendar value={selectedDate} onChange={setSelectedDate} />
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Tasks on {selectedDate.format("DD MMM YYYY")}
          </h3>
          <div className="flex flex-col gap-1 mb-4">
            <button
              className="px-4 py-2 bg-green-100 text-green-700 rounded font-semibold w-90 hover:bg-green-200 transition hover:text-green-800"
              onClick={() => onAddTaskWithDate(getDateTimeISO())}
            >
              ➕ Add Task for {selectedDate.format("DD MMM YYYY")}
            </button>
            <label className="text-gray-700">Select Time:</label>
            <input
              type="time"
              value={selectedTime}
              onChange={e => setSelectedTime(e.target.value)}
              className="border rounded px-2 py-1 text-gray-900 w-24"
            />
          </div>
          {tasks.length === 0 ? (
            <div className="text-gray-400">No tasks for this day.</div>
          ) : (
            <ul className="space-y-2">
              {tasks.map(task => (
  <li
    key={task.id}
    className="bg-white rounded p-3 flex items-center gap-3 hover:bg-gray-100 transition cursor-pointer group"
    onClick={() => onSelectPage(task.id)}
  >
    <span className="text-green-700 font-medium flex-1">{task.title}</span>
    <span className="text-xs text-gray-500 mr-2">
      {task.dueDate && dayjs(task.dueDate).format("HH:mm")}
    </span>
    <button
      className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition"
      onClick={e => {
        e.stopPropagation();
        setConfirmDeleteId(task.id);
      }}
      title="Delete"
    >
      🗑️
    </button>
    {/* Modal ยืนยันการลบ */}
    {confirmDeleteId === task.id && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
          <p className="mb-4 text-gray-800">Delete this task?</p>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => {
                onDeletePage(task.id);
                setConfirmDeleteId(null);
              }}
            >
              Delete
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              onClick={() => setConfirmDeleteId(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </li>
))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}