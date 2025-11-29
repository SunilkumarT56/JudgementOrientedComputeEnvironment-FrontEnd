import { useState, useEffect, useRef, type KeyboardEvent, useCallback } from 'react';
import { Search, Command, Loader2, Check, Lock, EyeOff, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDebounce } from '../../hooks/useDebounce';
import { clsx } from 'clsx';
import type { Problem, ProblemListResponse } from '../../types/problem';



interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Sorting State
  const [sortBy, setSortBy] = useState('custom');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoading || isFetchingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, isFetchingMore, hasMore]);

  // Reset page when query or sort changes
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setResults([]);
  }, [debouncedQuery, sortBy, sortOrder]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      if (page === 1) setIsLoading(true);
      else setIsFetchingMore(true);

      try {
        const limit = 10;
        const response = await axios.get<ProblemListResponse>(
          `http://localhost:30000/problem/search?q=${encodeURIComponent(debouncedQuery)}&sortBy=${sortBy}&order=${sortOrder}&page=${page}&limit=${limit}`
        );
        
        const newResults = response.data.results;
        
        setResults(prev => {
          if (page === 1) return newResults;
          // Filter duplicates just in case
          const uniqueNew = newResults.filter(n => !prev.some(p => p.problem_id === n.problem_id));
          return [...prev, ...uniqueNew];
        });

        setHasMore(newResults.length === limit);
      } catch (error) {
        console.error('Search error:', error);
        if (page === 1) setResults([]);
      } finally {
        setIsLoading(false);
        setIsFetchingMore(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, sortBy, sortOrder, page]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutsideSort = (event: MouseEvent) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target as Node)) {
        setIsSortMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideSort);
    return () => document.removeEventListener('mousedown', handleClickOutsideSort);
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    setActiveIndex(-1);
  }, [results]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        handleSelect(results[activeIndex]);
      } else if (query && results.length > 0) {
        handleSelect(results[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelect = (result: Problem) => {
    navigate(`/problems/${result.title.toLowerCase().replace(/ /g, '-')}`);
    setIsOpen(false);
    setQuery('');
  };

  const highlightText = (text: string, highlight: string) => {
    if (!text) return '';
    if (!highlight || !highlight.trim()) return text;
    const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escaped})`, 'gi'));

    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="font-bold text-dark-label-1">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    if (!difficulty) return 'text-gray-400';
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-[#00b8a3]';
      case 'medium': return 'text-[#ffc01e]';
      case 'hard': return 'text-[#ff375f]';
      default: return 'text-gray-400';
    }
  };

  const handleSortChange = (newSortBy: string, newOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setSortOrder(newOrder);
    setIsSortMenuOpen(false);
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case 'frequency': return 'Frequency';
      case 'contestPoint': return 'Contest Point';
      case 'difficulty': return 'Difficulty';
      case 'acceptance': return 'Acceptance';
      case 'questionId': return 'Question ID';
      case 'tags': return 'Tags';
      case 'newest': return 'Newest';
      case 'oldest': return 'Oldest';
      default: return 'Custom';
    }
  };

  return (
    <div className={clsx("relative w-full max-w-[550px] flex items-center", className)} ref={containerRef}>

      {/* WRAPPER FIXED */}
      <div
        className="
          flex-1
          relative group
          focus-within:outline-none
          focus-within:ring-0
          focus-within:border-none
          focus-within:shadow-none
          [outline:none!important]
          [border:none!important]
          [box-shadow:none!important]
        "
      >

        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-label-2" size={16} />

        {/* INPUT FIXED */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search questions"
          className="
            w-full bg-transparent rounded-full py-2 pl-10 pr-12 text-sm
            text-dark-label-1 placeholder:text-dark-label-2

            border-none outline-none ring-0
            focus:border-none focus:outline-none focus:ring-0
            focus:shadow-none focus:bg-transparent

            [outline:none!important]
            [border:none!important]
            [box-shadow:none!important]
          "
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-dark-label-2 bg-dark-fill-2 px-1.5 py-0.5 rounded">
          <Command size={10} />
          <span>K</span>
        </div>
      </div>

      {/* SORT BUTTON */}
      <div className="relative ml-2" ref={sortMenuRef}>
        <button 
          onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
          className={clsx(
            "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium h-full whitespace-nowrap",
            isSortMenuOpen ? "bg-dark-fill-2 text-white" : "bg-dark-layer-1 text-dark-label-2 hover:bg-dark-fill-2 hover:text-dark-label-1"
          )}
        >
          <span>{getSortLabel()}</span>
          <ChevronDown size={14} />
        </button>

        {isSortMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-56 bg-dark-layer-1 rounded-lg shadow-xl z-50 overflow-hidden py-1 border border-dark-divider">
            <div onClick={() => handleSortChange('custom', 'asc')} className="flex items-center justify-between px-4 py-2 hover:bg-dark-fill-3 cursor-pointer text-dark-label-1">
              <span className="text-sm">Custommm</span>
              {sortBy === 'custom' && <Check size={16} />}
            </div>
            <div onClick={() => handleSortChange('frequency', 'desc')} className="flex items-center justify-between px-4 py-2 hover:bg-dark-fill-3 cursor-pointer text-dark-label-2">
              <span className="text-sm">Frequencyy</span>
              {sortBy === 'frequency' && <Check size={16} />}
              <Lock size={14} className="text-dark-brand-orange ml-auto" />
            </div>
            <div onClick={() => handleSortChange('contestPoint', 'desc')} className="flex items-center justify-between px-4 py-2 hover:bg-dark-fill-3 cursor-pointer text-dark-label-2">
              <span className="text-sm">Contest Point</span>
              {sortBy === 'contestPoint' && <Check size={16} />}
              <Lock size={14} className="text-dark-brand-orange ml-auto" />
            </div>
            <div className="h-[1px] bg-dark-divider my-1"></div>
            <div onClick={() => handleSortChange('difficulty', 'asc')} className="flex items-center justify-between px-4 py-2 hover:bg-dark-fill-3 cursor-pointer text-dark-label-1">
                <span className="text-sm">Difficulty</span>
                {sortBy === 'difficulty' && <Check size={16} />}
            </div>
            <div onClick={() => handleSortChange('acceptance', 'desc')} className="flex items-center justify-between px-4 py-2 hover:bg-dark-fill-3 cursor-pointer text-dark-label-1">
                <span className="text-sm">Acceptance</span>
                {sortBy === 'acceptance' && <Check size={16} />}
            </div>
            <div onClick={() => handleSortChange('questionId', 'asc')} className="flex items-center justify-between px-4 py-2 hover:bg-dark-fill-3 cursor-pointer text-dark-label-1">
                <span className="text-sm">Question ID</span>
                {sortBy === 'questionId' && <Check size={16} />}
            </div>
              <div onClick={() => handleSortChange('newest', 'desc')} className="flex items-center justify-between px-4 py-2 hover:bg-dark-fill-3 cursor-pointer text-dark-label-1">
                <span className="text-sm">Newest</span>
                {sortBy === 'newest' && <Check size={16} />}
            </div>
              <div onClick={() => handleSortChange('oldest', 'asc')} className="flex items-center justify-between px-4 py-2 hover:bg-dark-fill-3 cursor-pointer text-dark-label-1">
                <span className="text-sm">Oldest</span>
                {sortBy === 'oldest' && <Check size={16} />}
            </div>
            <div className="h-[1px] bg-dark-divider my-1"></div>
            <div onClick={() => handleSortChange('tags', 'asc')} className="flex items-center justify-between px-4 py-2 hover:bg-dark-fill-3 cursor-pointer text-dark-label-1">
              <span className="text-sm">Tags</span>
              {sortBy === 'tags' && <Check size={16} />}
              <EyeOff size={16} className="text-dark-label-2 ml-auto" />
            </div>
          </div>
        )}
      </div>

      {/* RESULTS DROPDOWN */}
      {isOpen && (query || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-dark-layer-1 rounded-lg shadow-2xl border border-dark-divider overflow-hidden z-50 max-h-[400px] overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="p-4 flex justify-center items-center text-dark-label-2">
              <Loader2 className="animate-spin mr-2" size={16} />
              <span>Searching...</span>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => {
                const isLast = results.length === index + 1;
                return (
                  <div
                    key={result.problem_id}
                    ref={isLast ? lastElementRef : null}
                    onClick={() => handleSelect(result)}
                    className={clsx(
                      "px-4 py-2.5 cursor-pointer flex items-center justify-between transition-colors group",
                      index === activeIndex ? "bg-dark-fill-3" : "hover:bg-dark-fill-3"
                    )}
                  >
                    <div className="flex flex-col gap-0.5 overflow-hidden flex-1 mr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-dark-label-2 font-mono">
                          {result.frontend_id}.
                        </span>
                        <div className="text-sm text-dark-label-1 truncate font-medium">
                          {highlightText(result.title, query)}
                        </div>
                        {result.is_premium && <Lock size={12} className="text-dark-brand-orange shrink-0" />}
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-dark-label-3">
                         <span>Acceptance: {result.acceptance}%</span>
                         {result.tags?.length > 0 && (
                            <span className="truncate max-w-[150px]">
                              • {result.tags.slice(0, 2).join(', ')}
                            </span>
                         )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={clsx("text-xs font-medium capitalize w-14 text-right", getDifficultyColor(result.difficulty))}>
                        {result.difficulty}
                      </span>
                    </div>
                  </div>
                );
              })}
              {isFetchingMore && (
                <div className="p-2 flex justify-center items-center text-dark-label-2">
                  <Loader2 className="animate-spin" size={14} />
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-dark-label-2 text-sm">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;