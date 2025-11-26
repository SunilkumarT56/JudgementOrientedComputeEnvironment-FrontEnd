import { useState } from 'react';
import { X, Search, Check, ChevronRight, ArrowUpDown, Filter } from 'lucide-react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'solved' | 'attempted' | 'todo';
  isSelected?: boolean;
}

const DUMMY_PROBLEMS: Problem[] = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', status: 'solved', isSelected: true },
  { id: 2, title: 'Add Two Numbers', difficulty: 'Medium', status: 'todo' },
  { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', status: 'todo' },
  { id: 4, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', status: 'solved' },
  { id: 5, title: 'Longest Palindromic Substring', difficulty: 'Medium', status: 'todo' },
  { id: 6, title: 'Zigzag Conversion', difficulty: 'Medium', status: 'todo' },
  { id: 7, title: 'Reverse Integer', difficulty: 'Medium', status: 'solved' },
  { id: 8, title: 'String to Integer (atoi)', difficulty: 'Medium', status: 'solved' },
  { id: 9, title: 'Palindrome Number', difficulty: 'Easy', status: 'solved' },
  { id: 10, title: 'Regular Expression Matching', difficulty: 'Hard', status: 'todo' },
  { id: 11, title: 'Container With Most Water', difficulty: 'Medium', status: 'todo' },
  { id: 12, title: 'Integer to Roman', difficulty: 'Medium', status: 'todo' },
  { id: 13, title: 'Roman to Integer', difficulty: 'Easy', status: 'solved' },
  { id: 14, title: 'Longest Common Prefix', difficulty: 'Easy', status: 'todo' },
  { id: 15, title: '3Sum', difficulty: 'Medium', status: 'todo' },
  { id: 16, title: '3Sum Closest', difficulty: 'Medium', status: 'todo' },
  { id: 17, title: 'Letter Combinations of a Phone Number', difficulty: 'Medium', status: 'todo' },
];

interface ProblemListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProblemListDrawer = ({ isOpen, onClose }: ProblemListDrawerProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredProblems = DUMMY_PROBLEMS.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.id.toString().includes(searchQuery)
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-dark-brand-green';
      case 'Medium': return 'text-dark-brand-yellow';
      case 'Hard': return 'text-dark-status-error';
      default: return 'text-dark-label-2';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Drawer */}
      <div className="relative w-[500px] h-full bg-dark-layer-2 flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-dark-divider shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium text-dark-label-1">Problem List</h2>
            <ChevronRight size={16} className="text-dark-label-3" />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-dark-label-2">
              <div className="w-4 h-4 rounded-full border-2 border-dark-brand-green/20 border-t-dark-brand-green animate-spin-slow" />
              <span>127/3758 Solved</span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-dark-fill-3 rounded-md transition-colors text-dark-label-2 hover:text-dark-label-1"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="p-4 flex gap-3 shrink-0">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-label-3" size={16} />
            <input 
              type="text" 
              placeholder="Search questions" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-fill-3 text-dark-label-1 text-sm pl-9 pr-3 py-2 rounded-lg border border-transparent focus:border-dark-brand-blue/50 focus:bg-dark-layer-1 outline-none transition-all"
            />
          </div>
          <button className="p-2 bg-dark-fill-3 text-dark-label-2 hover:text-dark-label-1 rounded-lg transition-colors">
            <ArrowUpDown size={18} />
          </button>
          <button className="p-2 bg-dark-fill-3 text-dark-label-2 hover:text-dark-label-1 rounded-lg transition-colors">
            <Filter size={18} />
          </button>
        </div>

        {/* Problem List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-2">
          <div className="space-y-0.5">
            {filteredProblems.map((problem) => (
              <div 
                key={problem.id}
                onClick={() => {
                  navigate(`/problems/${problem.title.toLowerCase().replace(/\s+/g, '-')}`);
                  onClose();
                }}
                className={clsx(
                  "flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors group",
                  problem.isSelected 
                    ? "bg-dark-fill-2 text-dark-label-1" 
                    : "hover:bg-dark-fill-2 text-dark-label-1"
                )}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  {problem.status === 'solved' && (
                    <Check size={16} className={problem.isSelected ? "text-dark-brand-green" : "text-dark-brand-green"} />
                  )}
                  {problem.status !== 'solved' && <div className="w-4" />}
                  
                  <span className="truncate text-sm font-medium">
                    {problem.id}. {problem.title}
                  </span>
                </div>
                
                <span className={clsx(
                  "text-xs font-medium shrink-0",
                  problem.isSelected ? "text-black/60" : getDifficultyColor(problem.difficulty)
                )}>
                  {problem.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemListDrawer;
