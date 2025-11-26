import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Maximize2, RotateCcw, Code2, ChevronDown, Check, Lock, Bookmark, Code } from 'lucide-react';
import { clsx } from 'clsx';

const LANGUAGES = [
  { id: 'cpp', name: 'C++' },
  { id: 'java', name: 'Java' },
  { id: 'python', name: 'Python' },
  { id: 'python3', name: 'Python3' },
  { id: 'c', name: 'C' },
  { id: 'csharp', name: 'C#' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'php', name: 'PHP' },
  { id: 'swift', name: 'Swift' },
  { id: 'kotlin', name: 'Kotlin' },
  { id: 'dart', name: 'Dart' },
  { id: 'go', name: 'Go' },
  { id: 'ruby', name: 'Ruby' },
  { id: 'scala', name: 'Scala' },
  { id: 'rust', name: 'Rust' },
  { id: 'racket', name: 'Racket' },
  { id: 'erlang', name: 'Erlang' },
  { id: 'elixir', name: 'Elixir' },
];

const CodeEditor = () => {
  const [language, setLanguage] = useState('python');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLang = LANGUAGES.find(l => l.id === language);

  return (
    <div className="h-full flex flex-col bg-dark-layer-2 relative">
      {/* Header Row 1: Title */}
      <div className="h-11 flex items-center justify-between px-4 bg-dark-layer-3 select-none">
        <div className="flex items-center gap-2 text-base text-dark-brand-green font-medium">
          <Code2 size={18} />
          <span>Code</span>
        </div>
      </div>

      {/* Header Row 2: Toolbar */}
      <div className="h-11 flex items-center justify-between px-4 bg-dark-layer-2 select-none">
        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <div 
              className="flex items-center gap-2 text-sm text-dark-label-1 cursor-pointer hover:bg-dark-fill-2 px-3 py-1.5 rounded-md transition-colors group"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>{selectedLang?.name}</span>
              <ChevronDown size={14} className="text-dark-label-3 group-hover:text-dark-label-1" />
            </div>

            {isOpen && (
              <div className="absolute top-full left-0 mt-1 w-[600px] bg-dark-layer-2 rounded-xl shadow-2xl z-50 p-4">
                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col gap-1">
                    {[
                      { id: 'cpp', name: 'C++' },
                      { id: 'java', name: 'Java' },
                      { id: 'python3', name: 'Python3' },
                      { id: 'python', name: 'Python' },
                      { id: 'javascript', name: 'JavaScript' },
                      { id: 'typescript', name: 'TypeScript' },
                      { id: 'csharp', name: 'C#' },
                      { id: 'c', name: 'C' },
                    ].map(lang => (
                      <div
                        key={lang.id}
                        className={clsx(
                          "flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors",
                          language === lang.id
                            ? "text-dark-label-1 bg-dark-fill-3"
                            : "text-dark-label-2 hover:bg-dark-fill-2 hover:text-dark-label-1"
                        )}
                        onClick={() => {
                          setLanguage(lang.id);
                          setIsOpen(false);
                        }}
                      >
                        <span>{lang.name}</span>
                        {language === lang.id && <Check size={14} className="text-dark-brand-blue" />}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-1 pl-4">
                    {[
                      { id: 'go', name: 'Go' },
                      { id: 'kotlin', name: 'Kotlin' },
                      { id: 'swift', name: 'Swift' },
                      { id: 'rust', name: 'Rust' },
                      { id: 'ruby', name: 'Ruby' },
                      { id: 'php', name: 'PHP' },
                      { id: 'dart', name: 'Dart' },
                      { id: 'scala', name: 'Scala' },
                    ].map(lang => (
                      <div
                        key={lang.id}
                        className={clsx(
                          "flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors",
                          language === lang.id
                            ? "text-dark-label-1 bg-dark-fill-3"
                            : "text-dark-label-2 hover:bg-dark-fill-2 hover:text-dark-label-1"
                        )}
                        onClick={() => {
                          setLanguage(lang.id);
                          setIsOpen(false);
                        }}
                      >
                        <span>{lang.name}</span>
                        {language === lang.id && <Check size={14} className="text-dark-brand-blue" />}
                      </div>
                    ))}
                  </div>

                  <div className="flex-1 flex flex-col gap-1 pl-4">
                    {[
                      { id: 'elixir', name: 'Elixir' },
                      { id: 'erlang', name: 'Erlang' },
                      { id: 'racket', name: 'Racket' },
                    ].map(lang => (
                      <div
                        key={lang.id}
                        className={clsx(
                          "flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors",
                          language === lang.id
                            ? "text-dark-label-1 bg-dark-fill-3"
                            : "text-dark-label-2 hover:bg-dark-fill-2 hover:text-dark-label-1"
                        )}
                        onClick={() => {
                          setLanguage(lang.id);
                          setIsOpen(false);
                        }}
                      >
                        <span>{lang.name}</span>
                        {language === lang.id && <Check size={14} className="text-dark-brand-blue" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-dark-label-3 cursor-pointer hover:text-dark-label-1 transition-colors px-2 py-1">
            <Lock size={14} />
            <span>Auto</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 text-dark-label-3 hover:text-dark-label-1 rounded-md transition-colors" title="Saved">
            <Bookmark size={16} />
          </button>
          <button className="p-2 text-dark-label-3 hover:text-dark-label-1 rounded-md transition-colors" title="Code">
            <Code size={16} />
          </button>
          <button className="p-2 text-dark-label-3 hover:text-dark-label-1 rounded-md transition-colors" title="Reset">
            <RotateCcw size={16} />
          </button>
          <button className="p-2 text-dark-label-3 hover:text-dark-label-1 rounded-md transition-colors" title="Maximize">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative overflow-hidden">
        <Editor
          height="100%"
          language={language}
          defaultValue={`class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """`}
          theme="vs-dark"
          onMount={() => console.log('Editor mounted')}
          loading={<div className="text-white p-4">Loading Editor...</div>}
          options={{
            minimap: { enabled: false },
            fontSize: 17,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
            lineHeight: 24,
            renderLineHighlight: 'none',
            hideCursorInOverviewRuler: true,
            overviewRulerBorder: false,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
