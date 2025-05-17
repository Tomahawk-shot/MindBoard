import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayouts({ children, pages, onSelectPage, onAddPage, onRenamePage }) {
  return (
    <div className="flex min-h-screen bg-[#f3f3f3]">
      {/* Sidebar: ให้สูงเต็มจอและติดซ้ายเสมอ */}
      <div className="hidden md:block h-screen fixed top-0 left-0 z-40">
        <Sidebar
          pages={pages}
          onSelectPage={onSelectPage}
          onAddPage={onAddPage}
          onRenamePage={onRenamePage}
        />
      </div>
      {/* สำหรับ mobile ให้ Sidebar อยู่ใน flow เดิม */}
      <div className="block md:hidden">
        <Sidebar
          pages={pages}
          onSelectPage={onSelectPage}
          onAddPage={onAddPage}
          onRenamePage={onRenamePage}
        />
      </div>
      {/* Main content: ขยับขวาเมื่อ desktop */}
      <div className="flex flex-col flex-1 w-full md:ml-64 min-h-screen">
        <Navbar title="Dashboard" />
        <main className="flex-1 w-full max-w-full p-2 md:p-8">{children}</main>
      </div>
    </div>
  );
}

export default MainLayouts;