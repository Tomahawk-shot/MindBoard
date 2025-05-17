import { useState } from "react";
import dayjs from "dayjs";
import RichEditor from "./RichEditor";

export default function PageDetails({
  page,
  onChangeTitle,
  onChangeDeadline,
  onChangeContent,
}) {
  const [editingDeadline, setEditingDeadline] = useState(false);
  const [deadline, setDeadline] = useState(page.dueDate ? dayjs(page.dueDate).format("YYYY-MM-DDTHH:mm") : "");

  const handleDeadlineSave = () => {
    onChangeDeadline(deadline ? dayjs(deadline).toISOString() : null);
    setEditingDeadline(false);
  };

  return (
    <div className="w-full max-w-full md:max-w-2xl mx-auto bg-white rounded-xl shadow p-2 md:p-6 flex flex-col gap-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
        <input
          className="text-2xl font-bold text-gray-900 bg-transparent border-b border-gray-200 focus:border-green-400 outline-none flex-1 min-w-0"
          value={page.title}
          onChange={e => onChangeTitle(e.target.value)}
        />
      </div>

      {/* Deadline & เวลา */}
      <div className="mb-2 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
        <span className="font-semibold text-gray-700">Deadline:</span>
        {editingDeadline ? (
          <div className="flex gap-2 flex-wrap">
            <input
              type="datetime-local"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <button
              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleDeadlineSave}
            >
              Save
            </button>
            <button
              className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              onClick={() => setEditingDeadline(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-gray-800">
              {page.dueDate ? dayjs(page.dueDate).format("DD MMM YYYY HH:mm") : "—"}
            </span>
            <button
              className="px-2 py-1 text-green-600 hover:underline"
              onClick={() => setEditingDeadline(true)}
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* วันที่สร้าง/แก้ไขล่าสุด */}
      <div className="text-xs text-gray-500 mb-2">
        Created: {page.createdAt ? dayjs(page.createdAt).format("DD MMM YYYY HH:mm") : "-"}
        {" | "}
        Updated: {page.updatedAt ? dayjs(page.updatedAt).format("DD MMM YYYY HH:mm") : "-"}
      </div>

      {/* เนื้อหา */}
      <div className="w-full">
        <RichEditor
          content={page.content}
          onChange={onChangeContent}
          pageId={page.id}
        />
      </div>
    </div>
  );
}