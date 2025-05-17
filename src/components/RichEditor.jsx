import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

export default function RichEditor({ content, onChange, pageId }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || "",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== (content || "")) {
      editor.commands.setContent(content || "");
    }
  }, [content, pageId, editor]);

  if (!editor) return null;

  const toolbarBtn = (active, onClick, label, extra = "") => (
    <button
      type="button"
      className={`px-2 py-1 rounded transition border border-gray-200 shadow-sm
        ${active ? "bg-green-200 text-green-900 font-bold" : "bg-white text-gray-700 hover:bg-green-50"}
        ${extra}
      `}
      onClick={onClick}
      tabIndex={-1}
    >
      {label}
    </button>
  );

  return (
    <div className="rounded-xl p-6 min-h-[500px] bg-[#f3f3f3] text-[#222] shadow-xl border border-gray-100">
      {/* Toolbar */}
      <div className="mb-4 flex gap-2 flex-wrap items-center bg-white rounded-lg px-3 py-2 shadow border border-gray-200">
        {toolbarBtn(editor.isActive('bold'), () => editor.chain().focus().toggleBold().run(), <b>B</b>)}
        {toolbarBtn(editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run(), <i>I</i>)}
        {toolbarBtn(editor.isActive('strike'), () => editor.chain().focus().toggleStrike().run(), <s>S</s>)}
        <span className="mx-2 text-gray-300">|</span>
        {toolbarBtn(
          editor.isActive('bulletList'),
          () => {
            // ให้สามารถสร้าง bullet list ได้แม้ในบรรทัดแรก
            editor.chain().focus().toggleBulletList().run();
          },
          "• List"
        )}
        {toolbarBtn(
          editor.isActive('orderedList'),
          () => {
            editor.chain().focus().toggleOrderedList().run();
          },
          "1. List"
        )}
        <span className="mx-2 text-gray-300">|</span>
        {toolbarBtn(editor.isActive('heading', { level: 1 }), () => editor.chain().focus().toggleHeading({ level: 1 }).run(), "H1")}
        {toolbarBtn(editor.isActive('heading', { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), "H2")}
        {toolbarBtn(editor.isActive('heading', { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), "H3")}
        <span className="mx-2 text-gray-300">|</span>
        {toolbarBtn(false, () => editor.chain().focus().undo().run(), "⟲", "hover:bg-yellow-100")}
        {toolbarBtn(false, () => editor.chain().focus().redo().run(), "⟳", "hover:bg-yellow-100")}
      </div>
      <div className="bg-white rounded-lg shadow-inner border border-gray-200 min-h-[400px] px-4 py-3 focus-within:ring-2 focus-within:ring-green-200 transition">
        <EditorContent editor={editor} key={pageId} />
      </div>
    </div>
  );
}