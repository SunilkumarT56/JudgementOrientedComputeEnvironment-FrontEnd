import { useState, useEffect, useRef, useCallback } from 'react';
import { Check, Lock, Search, Loader2, X, ArrowUpDown, Filter, ChevronRight, PanelLeftClose, EyeOff } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { clsx } from 'clsx';
import type { Problem } from '../../types/problem';
import { useDebounce } from '../../hooks/useDebounce';

interface ProblemListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProblemListDrawer = ({ isOpen, onClose }: ProblemListDrawerProps) => {
  const { id } = useParams();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const observer = useRef<IntersectionObserver | null>(null);

  // Sorting State
  const [sortBy, setSortBy] = useState('custom');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement>(null);

  // Handle click outside sort menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target as Node)) {
        setIsSortMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSortChange = (newSortBy: string, newOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setSortOrder(newOrder);
    setIsSortMenuOpen(false);
    // Reset page and fetch problems with new sort
    setPage(1);
    setProblems([]);
    setHasMore(true);
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const lastProblemElementRef = useCallback((node: HTMLAnchorElement) => {
    if (isLoading || isFetchingMore || debouncedSearchQuery) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, isFetchingMore, hasMore, debouncedSearchQuery]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setIsLoading(true);
        
        if (debouncedSearchQuery) {
          // Search mode
          const response = await axios.get(`http://localhost:30000/problem/search?q=${encodeURIComponent(debouncedSearchQuery)}`);
          setProblems(response.data.results);
          setHasMore(false);
        } else {
          // Default list mode
          if (page === 1) setIsLoading(true);
          else setIsFetchingMore(true);

          const limit = 50;
          const response = await axios.get(`http://localhost:30000/problems?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${sortOrder}`);
          
          setProblems(prev => {
            const results = response.data.results || [];
            if (page === 1) return results;
            const newProblems = results.filter((p: Problem) => 
              !prev.some(existing => existing.problem_id === p.problem_id)
            );
            return [...prev, ...newProblems];
          });
          
          setHasMore(response.data.results?.length === limit);
        }
      } catch (err) {
        console.error('Error fetching problems:', err);
      } finally {
        setIsLoading(false);
        setIsFetchingMore(false);
      }
    };

    if (isOpen) {
      fetchProblems();
    }
  }, [page, isOpen, debouncedSearchQuery, sortBy, sortOrder]);

  useEffect(() => {
    if (!debouncedSearchQuery) {
      setPage(1);
    }
  }, [debouncedSearchQuery]);

  return (
    <div className={clsx(
      "fixed inset-y-0 left-0 w-[600px] bg-[#1a1a1a] shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>

      {/* Header */}
      <div className="h-14 flex items-center justify-between px-5 border-b border-[#282828] bg-[#1a1a1a] shrink-0">
        <div className="flex items-center gap-2 text-white font-medium cursor-pointer hover:text-gray-300 transition-colors">
          <span className="text-[16px]">Problem List</span>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="w-4 h-4 rounded-full border-2 border-[#00b8a3]/30 border-t-[#00b8a3]"></div>
            <span>127/3758 Solved</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* ⭐ SEARCH BAR (FULLY FIXED VERSION) */}
      <div className="px-5 py-3 bg-[#1a1a1a] shrink-0 flex items-center gap-3">

        {/* Parent wrapper FIXED */}
        <div 
          className="
            relative flex-1 bg-[#282828] rounded-lg flex items-center

            focus-within:outline-none 
            focus-within:ring-0 
            focus-within:border-none 
            focus-within:shadow-none

            [outline:none!important]
            [border:none!important]
            [box-shadow:none!important]
          "
        >
          <Search className="absolute left-3 text-gray-500 pointer-events-none" size={16} />

          {/* Input FIXED */}
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions" 
            className="
              w-full bg-transparent text-sm text-white 
              placeholder:text-gray-500 py-2 pl-10 pr-4

              border-none outline-none ring-0
              focus:border-none focus:outline-none focus:ring-0 
              focus:shadow-none focus:ring-offset-0

              [outline:none!important]
              [border:none!important]
              [box-shadow:none!important]
            "
          />
          
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-gray-500 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Sort & Filter */}
        <div className="relative" ref={sortMenuRef}>
          <button 
            onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
            className={clsx(
              "p-2 rounded-lg transition-colors",
              isSortMenuOpen ? "bg-[#282828] text-white" : "bg-[#282828] text-gray-400 hover:text-white"
            )}
          >
            <ArrowUpDown size={18} />
          </button>

          {isSortMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-[#282828] rounded-lg shadow-xl z-50 overflow-hidden py-1">
              <div onClick={() => handleSortChange('custom', 'asc')} className="flex items-center justify-between px-4 py-2 hover:bg-[#3e3e3e] cursor-pointer text-gray-200">
                <span className="text-sm">Custom</span>
                {sortBy === 'custom' && <Check size={16} />}
              </div>
              <div onClick={() => handleSortChange('frequency', 'desc')} className="flex items-center justify-between px-4 py-2 hover:bg-[#3e3e3e] cursor-pointer text-gray-400">
                <span className="text-sm">Frequency</span>
                {sortBy === 'frequency' && <Check size={16} />}
                <Lock size={14} className="text-[#ffa116] ml-auto" />
              </div>
              <div onClick={() => handleSortChange('contestPoint', 'desc')} className="flex items-center justify-between px-4 py-2 hover:bg-[#3e3e3e] cursor-pointer text-gray-400">
                <span className="text-sm">Contest Point</span>
                {sortBy === 'contestPoint' && <Check size={16} />}
                <Lock size={14} className="text-[#ffa116] ml-auto" />
              </div>
              <div className="h-[1px] bg-[#3e3e3e] my-1"></div>
              <div onClick={() => handleSortChange('difficulty', 'asc')} className="flex items-center justify-between px-4 py-2 hover:bg-[#3e3e3e] cursor-pointer text-gray-200">
                  <span className="text-sm">Difficulty</span>
                  {sortBy === 'difficulty' && <Check size={16} />}
              </div>
              <div onClick={() => handleSortChange('acceptance', 'desc')} className="flex items-center justify-between px-4 py-2 hover:bg-[#3e3e3e] cursor-pointer text-gray-200">
                  <span className="text-sm">Acceptance</span>
                  {sortBy === 'acceptance' && <Check size={16} />}
              </div>
              <div onClick={() => handleSortChange('questionId', 'asc')} className="flex items-center justify-between px-4 py-2 hover:bg-[#3e3e3e] cursor-pointer text-gray-200">
                  <span className="text-sm">Question ID</span>
                  {sortBy === 'questionId' && <Check size={16} />}
              </div>
               <div onClick={() => handleSortChange('newest', 'desc')} className="flex items-center justify-between px-4 py-2 hover:bg-[#3e3e3e] cursor-pointer text-gray-200">
                  <span className="text-sm">Newest</span>
                  {sortBy === 'newest' && <Check size={16} />}
              </div>
               <div onClick={() => handleSortChange('oldest', 'asc')} className="flex items-center justify-between px-4 py-2 hover:bg-[#3e3e3e] cursor-pointer text-gray-200">
                  <span className="text-sm">Oldest</span>
                  {sortBy === 'oldest' && <Check size={16} />}
              </div>
              <div className="h-[1px] bg-[#3e3e3e] my-1"></div>
              <div onClick={() => handleSortChange('tags', 'asc')} className="flex items-center justify-between px-4 py-2 hover:bg-[#3e3e3e] cursor-pointer text-gray-200">
                <span className="text-sm">Tags</span>
                {sortBy === 'tags' && <Check size={16} />}
                <EyeOff size={16} className="text-gray-400 ml-auto" />
              </div>
            </div>
          )}
        </div>
        <button className="p-2 bg-[#282828] rounded-lg text-gray-400 hover:text-white transition-colors focus:outline-none">
          <Filter size={18} />
        </button>
        <div className="w-[1px] h-6 bg-[#282828] mx-1"></div>
        <button 
          onClick={onClose}
          className="p-2 bg-[#282828] rounded-lg text-gray-400 hover:text-white transition-colors"
        >
          <PanelLeftClose size={18} />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#1a1a1a] px-3 pb-4">
        {isLoading && page === 1 && !isFetchingMore ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-gray-400" size={24} />
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            {problems.map((problem, index) => {
              const isLast = problems.length === index + 1;
              const safeTitle = problem.title || '';
              const safeDifficulty = problem.difficulty || 'Easy';
              const isSelected = problem.problem_id === id || problem.slug === id || safeTitle.toLowerCase().replace(/ /g, '-') === id;
              
              return (
                <Link
                  key={problem.problem_id}
                  to={`/problems/${problem.slug || safeTitle.toLowerCase().replace(/ /g, '-')}`}
                  onClick={onClose}
                  ref={isLast ? lastProblemElementRef : undefined}
                  className={clsx(
                    "flex items-center justify-between px-4 py-3.5 rounded-lg transition-colors group cursor-pointer",
                    isSelected ? "bg-white text-black" : "text-gray-200 odd:bg-[#1a1a1a] even:bg-[#282828]"
                  )}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-5 flex justify-center shrink-0">
                      {problem.status === 'solved' && <Check size={14} className={isSelected ? "text-black" : "text-[#00b8a3]"} />}
                    </div>
                    <span className={clsx("text-[14px] truncate", isSelected ? "font-medium" : "")}>
                      {problem.frontend_id || problem.problem_id}. {safeTitle}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 shrink-0">
                    <span className={clsx(
                      "text-xs font-medium",
                      isSelected ? "text-black" : (
                        safeDifficulty.toLowerCase() === 'easy' ? "text-[#00b8a3]" :
                        safeDifficulty.toLowerCase() === 'medium' ? "text-[#ffc01e]" :
                        "text-[#ff375f]"
                      )
                    )}>
                      {safeDifficulty.toLowerCase() === 'medium' ? 'Med.' : safeDifficulty.charAt(0).toUpperCase() + safeDifficulty.slice(1).toLowerCase()}
                    </span>
                    {problem.is_premium && <Lock size={14} className={isSelected ? "text-black" : "text-[#ffa116]"} />}
                  </div>
                </Link>
              );
            })}

            {isFetchingMore && (
              <div className="flex justify-center items-center py-4">
                <Loader2 className="animate-spin text-gray-400" size={20} />
              </div>
            )}

            {!isLoading && problems.length === 0 && (
              <div className="text-center py-10 text-gray-500 text-sm">
                No problems found.
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default ProblemListDrawer;