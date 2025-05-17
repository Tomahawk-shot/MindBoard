import MainLayout from "./layouts/MainLayouts";
import Page from "./pages/Page";
import { useEffect, useState, useRef } from "react";
import CalendarView from "./pages/CalendarView";
import useAuth from "./auth/useAuth";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

const LOCAL_KEY = "mindboard_pages";

function App() {
  const { user } = useAuth();
  if (!user) return <AuthPage />;
  const [pages, setPages] = useState([]);
  const [currentPageId, setCurrentPageId] = useState('calendar'); // เริ่มที่ calendar
  const [isDirty, setIsDirty] = useState(false); // สำหรับตรวจสอบว่ามีการแก้ไขหรือไม่

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.find(p => p.id === 'calendar')) {
        setPages(parsed);
        setCurrentPageId('calendar');
      } else {
        setPages([{ id: 'calendar', title: "➕ Add New", content: "", parentId: null }]);
        setCurrentPageId('calendar');
      }
    } else {
      setPages([{ id: 'calendar', title: "➕ Add New", content: "", parentId: null }]);
      setCurrentPageId('calendar');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(pages));
  }, [pages]);

  // แจ้งเตือนเมื่อออกจากหน้า (เปลี่ยน currentPageId) ถ้ามีการแก้ไข
  const prevPageId = useRef(currentPageId);
  useEffect(() => {
    if (
      prevPageId.current &&
      prevPageId.current !== currentPageId &&
      isDirty
    ) {
      toast.success("Page saved!");
      setIsDirty(false);
    }
    prevPageId.current = currentPageId;
  }, [currentPageId, isDirty]);

  // เปลี่ยนชื่อ page
  const handleRenamePage = (id, newTitle) => {
    setPages(pages => pages.map(p => p.id === id ? { ...p, title: newTitle } : p));
    setIsDirty(true);
  };

  // อัปเดตเนื้อหา page
  const handleUpdateContent = (id, content) => {
    setPages(pages => pages.map(p => p.id === id ? { ...p, content } : p));
    setIsDirty(true);
  };

  // อัปเดต deadline
  const handleUpdateDeadline = (id, dueDate) => {
    setPages(pages => pages.map(p => p.id === id ? { ...p, dueDate } : p));
    setIsDirty(true);
  };

  // เพิ่ม page (ถ้าเป็นหน้าหลักต้องมี deadline)
  const handleAddPage = (parentId = null, dueDate = null) => {
    if (parentId === null && !dueDate) return;
    const newPage = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 15),
      title: "Untitled",
      content: "",
      parentId,
      dueDate,
    };
    setPages(pages => [...pages, newPage]);
    setCurrentPageId(newPage.id);
    toast.success("Page added!");
  };

  // เพิ่ม task จาก calendar
  const handleAddTaskWithDate = (dueDate) => {
    handleAddPage(null, dueDate);
  };

  // ลบ page
  const handleDeletePage = (id) => {
    setPages(pages => pages.filter(p => p.id !== id));
    toast.success("Page deleted!");
  };

  const currentPage = pages.find(p => p.id === currentPageId);

  return (
    <ProtectedRoute>
      <Toaster position="top-right" />
      <MainLayout
        pages={pages}
        onSelectPage={setCurrentPageId}
        onAddPage={handleAddPage}
        onRenamePage={handleRenamePage}
      >
        {currentPage?.id === 'calendar' ? (
          <CalendarView
            pages={pages}
            onSelectPage={setCurrentPageId}
            onAddTaskWithDate={handleAddTaskWithDate}
            onDeletePage={handleDeletePage}
          />
        ) : currentPage ? (
          <Page
            page={currentPage}
            onUpdateContent={handleUpdateContent}
            onRenamePage={handleRenamePage}
            onUpdateDeadline={handleUpdateDeadline}
          />
        ) : (
          <p>Select or create a page</p>
        )}
      </MainLayout>
    </ProtectedRoute>
  );
}

export default App;