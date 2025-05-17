import { useState } from "react";
import { useTranslation } from "react-i18next";

function buildPageTree(pages, parentId = null) {
  return pages
    .filter((p) => p.parentId === parentId)
    .map((p) => ({
      ...p,
      children: buildPageTree(pages, p.id),
    }));
}

export default function Sidebar({ pages, onSelectPage, onAddPage, onRenamePage }) {
  const [editingId, setEditingId] = useState(null);
  const [tempTitle, setTempTitle] = useState("");
  const [search, setSearch] = useState("");
  const safePages = Array.isArray(pages) ? pages : [];
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleRename = (id) => {
    if (tempTitle.trim()) onRenamePage(id, tempTitle);
    setEditingId(null);
  };

  // ฟังก์ชันกรอง pages ตาม search
  const filterPages = (pages) =>
    pages.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.children && filterPages(p.children).length > 0)
    ).map((p) => ({
      ...p,
      children: p.children ? filterPages(p.children) : [],
    }));

  const renderPageTree = (tree, level = 0) =>
    tree.map((page) => (
      <div
        key={page.id}
        className={`ml-${level ? 4 : 0} flex flex-col`}
      >
        {editingId === page.id ? (
          <input
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            onBlur={() => handleRename(page.id)}
            onKeyDown={(e) => e.key === "Enter" && handleRename(page.id)}
            className="w-full px-2 py-1 text-sm bg-white text-gray-900 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            autoFocus
          />
        ) : (
          <div className="flex items-center gap-2 group">
            <button
              className={`flex-1 text-left text-sm py-1 px-2 rounded-lg transition
                ${page.id === 'calendar'
                  ? "bg-green-100 text-green-700 font-semibold"
                  : "hover:bg-green-50 text-gray-900"}
              `}
              onClick={() => onSelectPage(page.id)}
              onDoubleClick={() => {
                setEditingId(page.id);
                setTempTitle(page.title);
              }}
            >
              {page.title}
            </button>
            {page.id !== 'calendar' && (
              <button
                className="text-xs text-green-500 hover:text-green-700 transition opacity-0 group-hover:opacity-100"
                onClick={() => onAddPage(page.id)}
                title="Add sub-page"
              >
                <span className="text-lg">＋</span>
              </button>
            )}
          </div>
        )}
        {page.children && page.children.length > 0 && (
          <div className="ml-4 border-l border-gray-100 pl-2">
            {renderPageTree(page.children, level + 1)}
          </div>
        )}
      </div>
    ));

  // กรอง tree ตาม search
  const filteredTree = filterPages(buildPageTree(safePages));

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-green-500 text-white p-2 rounded shadow"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-[#f3f3f3] border-r border-gray-200 shadow-lg flex flex-col
          transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:flex
        `}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-500"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar"
        >
          ✕
        </button>
        <div className="flex flex-col items-center gap-2 px-6 py-8">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow">
            <span className="text-3xl font-bold text-green-500">📝</span>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-wide mt-3">MindBoard</span>
          <span className="text-xs text-gray-500 mt-1">{t('navbar.welcome')}</span>
        </div>
        <div className="px-4 pb-2 relative">
          <input
            type="text"
            placeholder="Search pages..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-200 transition"
          />
        </div>
        <nav className="flex-1 px-2 space-y-1 overflow-y-auto custom-scrollbar">
          {renderPageTree(filteredTree)}
        </nav>
      </aside>
    </>
  );
}