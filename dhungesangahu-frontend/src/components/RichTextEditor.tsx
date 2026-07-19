import React, { useRef, useEffect } from 'react';
import { Bold, Italic, Underline, Strikethrough, Heading3, List, ListOrdered, Quote, Link, Eraser } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder = "Start typing notice content..." }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Sync editor contents with incoming value state
  useEffect(() => {
    if (editorRef.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const executeCommand = (command: string, arg: string = '') => {
    document.execCommand(command, false, arg);
    handleInput();
    
    // Maintain focus in the editor
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleAddLink = () => {
    const url = prompt('Enter website URL (e.g., https://example.com):');
    if (url !== null) {
      executeCommand('createLink', url);
    }
  };

  return (
    <div className="w-full flex flex-col border border-slate-200 focus-within:border-[#652d90] focus-within:ring-1 focus-within:ring-[#652d90] rounded-xl overflow-hidden bg-white transition-all duration-300">
      {/* WYSIWYG Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 border-b border-slate-200 select-none">
        <button
          type="button"
          onClick={() => executeCommand('bold')}
          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('italic')}
          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('underline')}
          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('strikeThrough')}
          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </button>

        <div className="h-5 w-[1px] bg-slate-200 mx-1" />

        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<h3>')}
          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
          title="Heading"
        >
          <Heading3 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('insertUnorderedList')}
          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('insertOrderedList')}
          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<blockquote>')}
          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </button>

        <div className="h-5 w-[1px] bg-slate-200 mx-1" />

        <button
          type="button"
          onClick={handleAddLink}
          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
          title="Insert Link"
        >
          <Link className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('removeFormat')}
          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
          title="Clear Formatting"
        >
          <Eraser className="h-4 w-4" />
        </button>
      </div>

      {/* WYSIWYG Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        data-placeholder={placeholder}
        className="w-full px-4 py-3 min-h-[160px] max-h-[300px] overflow-y-auto bg-white text-slate-700 text-xs sm:text-sm font-light leading-relaxed focus:outline-none select-text"
        style={{ outline: 'none' }}
      />

      {/* Injected style to support placeholders inside contentEditable */}
      <style dangerouslySetInnerHTML={{ __html: `
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          cursor: text;
        }
        [contenteditable] blockquote {
          border-left: 3px solid #652d90;
          padding-left: 12px;
          color: #64748b;
          font-style: italic;
          margin: 8px 0;
        }
        [contenteditable] ul {
          list-style-type: disc;
          padding-left: 20px;
          margin: 8px 0;
        }
        [contenteditable] ol {
          list-style-type: decimal;
          padding-left: 20px;
          margin: 8px 0;
        }
        [contenteditable] h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #1e293b;
          margin-top: 12px;
          margin-bottom: 6px;
        }
        [contenteditable] a {
          color: #652d90;
          text-decoration: underline;
        }
      `}} />
    </div>
  );
};
