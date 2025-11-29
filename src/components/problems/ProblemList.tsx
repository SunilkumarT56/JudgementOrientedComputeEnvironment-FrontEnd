import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Check, Lock, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import type { Problem, ProblemListResponse } from '../../types/problem';

interface ProblemListProps {
  searchQuery?: string;
  className?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  if (!difficulty) return null;
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

const ProblemList = ({ searchQuery, className, sortBy = 'custom', sortOrder = 'asc' }: ProblemListProps) => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  
  const observer = useRef<IntersectionObserver | null>(null);

  const lastProblemElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoading || isFetchingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, isFetchingMore, hasMore]);

  // Fetch Problems
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        if (page === 1) setIsLoading(true);
        else setIsFetchingMore(true);
        setError(null);

        let endpoint = '';
        
        if (searchQuery) {
          // Search Mode
          endpoint = `http://localhost:30000/problem/search?q=${encodeURIComponent(searchQuery)}`;
        } else {
          // List Mode with Sort
          const limit = 50;
          endpoint = `http://localhost:30000/problems?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${sortOrder}`;
        }

        const response = await axios.get(endpoint);
        
        let newProblems: Problem[] = [];
        let hasMoreResults = false;

        if (searchQuery) {
           // Search API returns { count, results: [...] }
           // Map search results to Problem interface
           newProblems = response.data.results.map((result: any) => ({
            problem_id: result.frontend_id, // Map frontend_id to problem_id for display
            title: result.title,
            difficulty: result.difficulty,
            acceptance: result.acceptance + '%', // Add % if missing
            is_premium: false,
            status: 'todo',
            ...result
          }));
          hasMoreResults = false; // Search API currently doesn't support pagination in this flow
        } else {
          // List API returns { page, limit, count, results: [...] }
          const data = response.data as ProblemListResponse;
          newProblems = data.results;
          hasMoreResults = newProblems.length === data.limit;
        }

        setProblems(prev => {
          if (page === 1 || searchQuery) return newProblems;
          
          // Filter duplicates
          const uniqueNewProblems = newProblems.filter(p => 
            !prev.some(existing => existing.problem_id === p.problem_id)
          );
          return [...prev, ...uniqueNewProblems];
        });
        
        setHasMore(hasMoreResults);

      } catch (err) {
        console.error('Error fetching problems:', err);
        setError('Failed to load problems. Please try again later.');
      } finally {
        setIsLoading(false);
        setIsFetchingMore(false);
      }
    };

    // Debounce search is handled by parent, but we need to reset page when query changes
    if (searchQuery) {
        setPage(1);
    }

    fetchProblems();
  }, [page, sortBy, sortOrder, searchQuery]);

  // Reset page when sort changes
  useEffect(() => {
    setPage(1);
  }, [sortBy, sortOrder]);


  return (
    <div className={clsx("space-y-4", className)}>
      
      {/* List */}
      <div className="space-y-2">
        {isLoading && page === 1 ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-dark-label-2" size={32} />
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            {error}
          </div>
        ) : (
          <>
            {problems.map((problem, index) => {
               const isLast = problems.length === index + 1;
               return (
                  <div 
                    ref={isLast ? lastProblemElementRef : null}
                    key={problem.problem_id} 
                    className={clsx(
                      "grid grid-cols-[1fr_100px_80px_80px] gap-4 px-4 py-3 rounded-lg transition-colors items-center group",
                      index % 2 === 0 ? "bg-dark-layer-2" : "bg-dark-layer-1"
                    )}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-5 flex justify-center shrink-0">
                        {problem.status === 'solved' && <Check size={18} className="text-dark-brand-green" />}
                      </div>
                      <Link to={`/problems/${(problem.title || '').toLowerCase().replace(/ /g, '-')}`} className="text-dark-label-1 text-base font-medium transition-colors truncate block">
                        {problem.frontend_id || problem.problem_id}. {problem.title}
                      </Link>
                    </div>
                    <div className="text-dark-label-2 text-base text-right">{problem.acceptance}</div>
                    <div className="text-right">
                      <DifficultyBadge difficulty={problem.difficulty} />
                    </div>
                     <div className="flex justify-end gap-2 text-dark-label-3">
                       <div className="w-6 flex justify-center">{problem.is_premium && <Lock size={18} />}</div>
                     </div>
                  </div>
                );
            })}
            {isFetchingMore && (
              <div className="flex justify-center items-center py-4">
                <Loader2 className="animate-spin text-dark-label-2" size={24} />
              </div>
            )}
             {!hasMore && problems.length > 0 && (
              <div className="text-center py-6 text-dark-label-3 text-sm">
                You have reached the end.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProblemList;
