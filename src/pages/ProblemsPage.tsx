import { Search, Calendar as CalendarIcon, Filter, ChevronDown, ChevronUp, Lock, Star, X, Box, GitFork, Database, Terminal, ArrowRightLeft, FileCode, BarChart3, ChevronLeft, ChevronRight, ArrowUp, Check, EyeOff, ArrowUpDown } from 'lucide-react';
import { clsx } from 'clsx';
import { useState, useRef, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import ProblemList from '../components/problems/ProblemList';

const DAILY_CHALLENGE = {
  id: 2435,
  title: 'Paths in Matrix Whose Sum Is Divisible by K',
  difficulty: 'Hard',
  acceptance: '55.2%',
  status: 'todo'
};

const CATEGORIES = [
  { id: 'all', label: 'All Topics', icon: Box, color: 'text-white' },
  { id: 'algorithms', label: 'Algorithms', icon: GitFork, color: 'text-orange-500' },
  { id: 'database', label: 'Database', icon: Database, color: 'text-blue-500' },
  { id: 'shell', label: 'Shell', icon: Terminal, color: 'text-green-500' },
  { id: 'concurrency', label: 'Concurrency', icon: ArrowRightLeft, color: 'text-purple-500' },
  { id: 'javascript', label: 'JavaScript', icon: FileCode, color: 'text-yellow-500' },
  { id: 'pandas', label: 'pandas', icon: BarChart3, color: 'text-purple-400' },
];

const TOPICS = [
  { name: 'Array', count: 2050 },
  { name: 'String', count: 832 },
  { name: 'Hash Table', count: 759 },
  { name: 'Math', count: 638 },
  { name: 'Dynamic Programming', count: 632 },
  { name: 'Sorting', count: 485 },
  { name: 'Greedy', count: 445 },
  { name: 'Depth-First Search', count: 338 },
  { name: 'Binary Search', count: 302 },
  { name: 'Matrix', count: 256 },
  { name: 'Tree', count: 245 },
   { name: 'Array', count: 2050 },
  { name: 'String', count: 832 },
  { name: 'Hash Table', count: 759 },
  { name: 'Math', count: 638 },
  { name: 'Dynamic Programming', count: 632 },
  { name: 'Sorting', count: 485 },
  { name: 'Greedy', count: 445 },
  { name: 'Depth-First Search', count: 338 },
  { name: 'Binary Search', count: 302 },
  { name: 'Matrix', count: 256 },
  { name: 'Tree', count: 245 }
];

const TRENDING_COMPANIES = [
  { name: 'Google', count: 2169, color: 'bg-yellow-600' },
  { name: 'Amazon', count: 1899, color: 'bg-orange-600' },
  { name: 'Uber', count: 431, color: 'bg-gray-600' },
  { name: 'Bloomberg', count: 1150, color: 'bg-purple-600' },
  { name: 'Apple', count: 448, color: 'bg-gray-500' },
  { name: 'Oracle', count: 331, color: 'bg-red-600' },
  { name: 'Microsoft', count: 1200, color: 'bg-blue-600' },
  { name: 'Meta', count: 1500, color: 'bg-blue-500' },
  { name: 'TikTok', count: 600, color: 'bg-black' },
  { name: 'LinkedIn', count: 500, color: 'bg-blue-700' },
  { name: 'Adobe', count: 400, color: 'bg-red-500' },
  { name: 'Nvidia', count: 300, color: 'bg-green-600' },
  { name: 'Citadel', count: 200, color: 'bg-blue-800' },
  { name: 'IBM', count: 150, color: 'bg-blue-900' },
  { name: 'Atlassian', count: 100, color: 'bg-blue-400' },
  { name: 'Visa', count: 120, color: 'bg-blue-600' },
  { name: 'Intuit', count: 90, color: 'bg-blue-500' },
  { name: 'Salesforce', count: 180, color: 'bg-blue-400' },
];

const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  const normalizedDifficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
  const colors = {
    Easy: 'text-dark-brand-green bg-dark-brand-green/10',
    Medium: 'text-dark-brand-orange bg-dark-brand-orange/10',
    Hard: 'text-dark-brand-red bg-dark-brand-red/10'
  };

  return (
    <span className={clsx('px-2.5 py-1 rounded text-sm font-medium', colors[normalizedDifficulty as keyof typeof colors])}>
      {normalizedDifficulty === 'Medium' ? 'Med.' : normalizedDifficulty}
    </span>
  );
};

const ProblemsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [isTopicsExpanded, setIsTopicsExpanded] = useState(false);
  
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
  };

  return (
    <div className="flex-1 bg-dark-layer-2 p-6 min-h-[calc(100vh-56px)]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-[1fr_350px] gap-10">
        
        {/* Main Content */}
        <div className="space-y-4">
          
          {/* Promotional Banners */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="h-[140px] rounded-lg bg-gradient-to-r from-purple-900 to-black p-4 relative overflow-hidden group cursor-pointer">
              <div className="absolute top-2 right-2 bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded">ENDS DEC 01</div>
              <div className="text-pink-500 font-bold text-xl mt-2">BLACK</div>
              <div className="text-white font-bold text-xl">FRIDAY</div>
              <div className="text-yellow-400 font-bold text-lg">SALE</div>
              <div className="text-white text-xs mt-1">$40 OFF <span className="text-gray-400">Annual Subscription</span></div>
            </div>
            
            <div className="h-[140px] rounded-lg bg-gradient-to-br from-white to-blue-100 p-4 relative overflow-hidden group cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-black font-bold text-lg">Quest</span>
                <span className="bg-blue-500 text-white text-[10px] px-1 rounded">NEW</span>
              </div>
              <div className="text-gray-600 text-xs mb-3 w-2/3">Turn coding practice into an epic adventure</div>
              <button className="bg-black text-white text-xs px-3 py-1.5 rounded-full font-medium group-hover:bg-gray-800 transition-colors">Begin Now</button>
            </div>

            <div className="h-[140px] rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 p-4 relative overflow-hidden group cursor-pointer">
              <div className="text-white font-bold text-lg">JavaScript</div>
              <div className="text-white/90 text-sm">30 Days Challenge</div>
              <div className="absolute bottom-4 left-4">
                <button className="bg-white text-orange-600 text-xs px-3 py-1.5 rounded-full font-medium">Start Learning</button>
              </div>
              <div className="absolute right-4 bottom-4 text-white/20 text-4xl font-bold">JS</div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            {CATEGORIES.map((category) => (
              <button 
                key={category.id}
                className={clsx(
                  "px-4 py-2 rounded-full flex items-center gap-2 transition-colors",
                  category.id === 'all' 
                    ? "bg-white text-black font-medium" 
                    : "bg-dark-fill-3 hover:bg-dark-fill-2 text-dark-label-2 hover:text-dark-label-1"
                )}
              >
                <category.icon size={18} className={clsx(category.id === 'all' ? "text-black" : category.color)} />
                <span className="text-sm">{category.label}</span>
              </button>
            ))}
          </div>

          {/* Topics Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-3 items-center">
              {TOPICS.slice(0, isTopicsExpanded ? undefined : 8).map((topic) => (
                <button 
                  key={topic.name}
                  className="px-3 py-1.5 bg-dark-fill-3 hover:bg-dark-fill-2 rounded-full flex items-center gap-2 transition-colors group"
                >
                  <span className="text-sm text-white group-hover:text-white">{topic.name}</span>
                  <span className="text-xs text-dark-label-2 bg-dark-layer-1 px-1.5 py-0.5 rounded-full group-hover:bg-dark-fill-3 transition-colors">{topic.count}</span>
                </button>
              ))}
              <button 
                onClick={() => setIsTopicsExpanded(!isTopicsExpanded)}
                className="flex items-center gap-1 text-sm text-dark-label-2 hover:text-dark-label-1 transition-colors px-2"
              >
                <span>{isTopicsExpanded ? 'Collapse' : 'Expand'}</span>
                {isTopicsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </div>

          {/* Top Bar */}
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-[280px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-label-3" size={15} />
                <input 
                  type="text" 
                  placeholder="Search questions" 
                  className="w-full bg-[#282828] !border-none !outline-none focus:!outline-none focus:!ring-0 focus:!border-transparent !ring-0 focus:!ring-offset-0 !shadow-none rounded-full py-2 pl-10 pr-4 text-sm text-dark-label-1 placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Sort Menu */}
              <div className="relative" ref={sortMenuRef}>
                <button 
                  onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                  className={clsx(
                    "w-9 h-9 rounded-full flex items-center justify-center transition-colors",
                    isSortMenuOpen ? "bg-[#282828] text-white" : "bg-[#282828] text-dark-label-2 hover:text-dark-label-1"
                  )}
                >
                  <ArrowUpDown size={16} />
                </button>

                {isSortMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-dark-layer-1 rounded-lg shadow-xl z-50 overflow-hidden py-1">
                    <div onClick={() => handleSortChange('custom', 'asc')} className="flex items-center justify-between px-4 py-2 hover:bg-dark-fill-3 cursor-pointer text-dark-label-1">
                      <span className="text-sm">Custom</span>
                      {sortBy === 'custom' && <Check size={16} />}
                    </div>
                    <div onClick={() => handleSortChange('frequency', 'desc')} className="flex items-center justify-between px-4 py-2 hover:bg-dark-fill-3 cursor-pointer text-dark-label-2">
                      <span className="text-sm">Frequency</span>
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
              
              <button className="p-2 bg-[#282828] rounded-full text-dark-label-2 hover:text-dark-label-1 transition-colors">
                <Filter size={18} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-dark-label-2">
                <div className="w-5 h-5 rounded-full border-2 border-dark-brand-green/30 border-t-dark-brand-green"></div>
                <span>127/3758 Solved</span>
              </div>
              <button className="text-dark-label-2 hover:text-dark-label-1">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Problem List Container */}
          <div className="space-y-2">
            
            {/* Daily Challenge */}
            <div className="grid grid-cols-[1fr_100px_80px_80px] gap-4 px-4 py-3 bg-dark-layer-1 rounded-lg items-center cursor-pointer group border-l-2 border-transparent">
              <div className="flex items-center gap-3">
                <CalendarIcon className="text-blue-500" size={18} />
                <span className="text-dark-label-1 font-medium transition-colors">
                  {DAILY_CHALLENGE.id}. {DAILY_CHALLENGE.title}
                </span>
              </div>
              <div className="text-dark-label-2 text-base text-right">{DAILY_CHALLENGE.acceptance}</div>
              <div className="text-right">
                <DifficultyBadge difficulty={DAILY_CHALLENGE.difficulty} />
              </div>
              <div className="flex justify-end gap-2 text-dark-label-3">
                 <div className="w-6 flex justify-center"><Lock size={18} /></div>
                 <div className="w-6 flex justify-center"><Star size={18} /></div>
              </div>
            </div>

            {/* Problem List */}
            <ProblemList searchQuery={debouncedSearchQuery} sortBy={sortBy} sortOrder={sortOrder} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          
          {/* Calendar Widget */}
          <div className="bg-dark-layer-1 rounded-lg p-4 relative overflow-hidden">
            {/* 11 NOV Badge */}
            <div className="absolute top-0 right-4 w-12 h-14 bg-dark-fill-3 rounded-b-lg flex flex-col items-center justify-center border-x border-b border-dark-divider shadow-lg z-10">
              <span className="text-2xl font-bold text-dark-label-2 leading-none">11</span>
              <span className="text-[10px] text-dark-label-3 font-medium">NOV</span>
            </div>

            <div className="flex items-center justify-between mb-6 mt-1">
              <div className="flex items-center gap-2">
                <span className="text-dark-label-1 font-medium text-lg">Day 26</span>
                <span className="text-xs text-dark-label-3">08:49:36 left</span>
              </div>
              <div className="flex gap-4 mr-16">
                <ChevronLeft size={16} className="text-dark-label-3 cursor-pointer hover:text-dark-label-1" />
                <ChevronRight size={16} className="text-dark-label-3 cursor-pointer hover:text-dark-label-1" />
              </div>
            </div>
            <div className="grid grid-cols-7 gap-y-4 text-center mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                <div key={day} className="text-xs text-dark-label-3 font-medium">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-4 text-center">
              {/* Mock calendar days */}
              {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
                const hasRedDot = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26].includes(day);
                const isSelected = day === 26;
                
                return (
                  <div key={day} className="flex flex-col items-center gap-1 cursor-pointer group">
                    <div 
                      className={clsx(
                        "text-sm w-8 h-8 flex items-center justify-center rounded-full transition-colors",
                        isSelected 
                          ? "bg-green-500 text-white font-medium shadow-lg shadow-green-500/20" 
                          : "text-dark-label-2 group-hover:bg-dark-fill-3"
                      )}
                    >
                      {day}
                    </div>
                    {hasRedDot && !isSelected && (
                      <div className="w-1 h-1 rounded-full bg-red-500"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Premium Widget */}
          <div className="bg-gradient-to-br from-[#3E3023] to-[#2A231D] rounded-lg p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2 text-orange-400 font-medium">
                <span>Weekly Premium</span>
                <div className="w-3.5 h-3.5 rounded-full border border-orange-400/50 flex items-center justify-center text-[10px]">?</div>
              </div>
              <span className="text-xs text-orange-400/60">2 days left</span>
            </div>
            
            <div className="flex justify-between gap-2 mb-4 relative z-10">
              {['W1', 'W2', 'W3', 'W4', 'W5'].map((week) => (
                <div key={week} className={clsx(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                  week === 'W4' 
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" 
                    : "text-orange-600/50 hover:bg-orange-900/30"
                )}>
                  {week}
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-xs relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-green-500/20 flex items-center justify-center">
                  <Check size={12} className="text-green-500" />
                </div>
                <span className="text-gray-300">0 <span className="text-green-500 ml-1">Redeem</span></span>
              </div>
              <span className="text-gray-400 hover:text-gray-200 cursor-pointer">Rules</span>
            </div>
          </div>

          {/* Trending Companies */}
          <div className="bg-dark-layer-1 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-dark-label-1">Trending Companies</h3>
              <div className="flex gap-1">
                 <div className="w-6 h-6 flex items-center justify-center bg-dark-fill-3 rounded hover:bg-dark-fill-2 cursor-pointer">
                   <ChevronLeft size={14} className="text-dark-label-2" />
                 </div>
                 <div className="w-6 h-6 flex items-center justify-center bg-dark-fill-3 rounded hover:bg-dark-fill-2 cursor-pointer">
                   <ChevronRight size={14} className="text-dark-label-2" />
                 </div>
              </div>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-label-3" size={16} />
              <input 
                type="text" 
                placeholder="Search for a company..." 
                className="w-full bg-dark-fill-3 border-none rounded-lg py-2 pl-10 pr-4 text-sm text-dark-label-1 placeholder:text-dark-label-3 focus:ring-0"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 relative">
              {TRENDING_COMPANIES.map(company => (
                <div key={company.name} className="flex items-center bg-dark-fill-3 rounded-full pl-3 pr-1 py-1 cursor-pointer hover:bg-dark-fill-2 transition-colors group">
                  <span className="text-xs text-dark-label-2 mr-2 font-medium">{company.name}</span>
                  <span className="text-[10px] bg-orange-500 text-black font-bold px-1.5 py-0.5 rounded-full">{company.count}</span>
                </div>
              ))}
              
              {/* Floating Arrow Up Button */}
              <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/4">
                <div className="w-10 h-10 bg-dark-fill-3 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-dark-fill-2 transition-colors border border-dark-divider">
                  <ArrowUp size={20} className="text-dark-label-2" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProblemsPage;
