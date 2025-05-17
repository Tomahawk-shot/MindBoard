import { useState, useEffect } from "react";
import PageDetails from "../components/PageDetails";

export default function Page({ page, onUpdateContent, onRenamePage, onUpdateDeadline, loading }) {
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handleChangeTitle = (title) => {
  setCurrentPage(p => ({ ...p, title }));
  onRenamePage(page.id, title); // ให้ไป toast ใน onRenamePage หลัง save สำเร็จ
};

const handleChangeDeadline = (dueDate) => {
  setCurrentPage(p => ({ ...p, dueDate }));
  if (onUpdateDeadline) onUpdateDeadline(page.id, dueDate); // ให้ไป toast ใน onUpdateDeadline หลัง save สำเร็จ
};

const handleChangeContent = (content) => {
  setCurrentPage(p => ({ ...p, content }));
  onUpdateContent(page.id, content); // ให้ไป toast ใน onUpdateContent หลัง save สำเร็จ
};

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col items-center py-4 md:py-8">
      <div className="bg-white rounded-xl shadow p-2 md:p-8 max-w-full lg:max-w-4xl w-full min-h-[300px] flex items-center justify-center">
        {loading ? (
          // Loading spinner
          <div className="flex flex-col items-center gap-2 py-12">
            <div className="w-10 h-10 border-4 border-green-300 border-t-green-600 rounded-full animate-spin"></div>
            <div className="text-gray-500 mt-2">Loading...</div>
          </div>
        ) : !currentPage ? (
          // Empty state
          <div className="text-gray-400 text-center py-12 text-lg">No data</div>
        ) : (
          <PageDetails
            page={currentPage}
            onChangeTitle={handleChangeTitle}
            onChangeDeadline={handleChangeDeadline}
            onChangeContent={handleChangeContent}
          />
        )}
      </div>
    </div>
  );
}