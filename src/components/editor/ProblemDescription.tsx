import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Star, Share2, MessageSquare, BookOpen, FlaskConical, Clock, CheckCircle2, Tag, ChevronRight, ChevronDown, Lock, Lightbulb, List, ChevronLeft, Maximize2, Loader2, FileText } from 'lucide-react';
import type { Problem } from '../../types/problem';

interface ProblemDescriptionProps {
  problem?: Problem;
  onCollapse?: () => void;
  onExpand?: () => void;
}

const ProblemDescription = ({ problem, onCollapse, onExpand }: ProblemDescriptionProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!problem) {
    return (
      <div className="h-full flex flex-col bg-dark-layer-2">
        <div className="flex items-center justify-between px-4 py-2 bg-dark-layer-3 select-none">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm font-medium text-dark-label-1">
              <div className="text-blue-500"><BookOpen size={16} /></div>
              Description
            </button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin text-dark-label-2" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-dark-layer-2">
      {/* Tabs */}
      <div className="flex items-center justify-between px-4 py-2 bg-dark-layer-3 select-none border-b border-zinc-700/50">
        <div className="flex items-center gap-4">
          
          <button className="flex items-center gap-2 text-sm font-medium text-dark-label-1 hover:text-dark-label-1 transition-colors">
            <div className="text-blue-500"><FileText size={16} /></div>
            Description
          </button>
          
          <div className="w-[1px] h-4 bg-dark-divider"></div>
          
          <button className="flex items-center gap-2 text-sm font-medium text-dark-label-2 hover:text-dark-label-1 transition-colors">
            <div className="text-dark-brand-orange"><BookOpen size={16} /></div>
            Editorial
          </button>
          
          <div className="w-[1px] h-4 bg-dark-divider"></div>
          
          <button className="flex items-center gap-2 text-sm font-medium text-dark-label-2 hover:text-dark-label-1 transition-colors">
            <div className="text-dark-label-2"><FlaskConical size={16} /></div>
            Solutions
          </button>
          
          <div className="w-[1px] h-4 bg-dark-divider"></div>
          
          <button className="flex items-center gap-2 text-sm font-medium text-dark-label-2 hover:text-dark-label-1 transition-colors">
            <div className="text-dark-label-2"><Clock size={16} /></div>
            Submissions
          </button>
        </div>

        <div className="flex items-center gap-2">
           <button 
             onClick={onCollapse}
             className="p-1 text-dark-label-2 hover:text-dark-label-1 rounded transition-colors"
           >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={onExpand}
            className="p-1 text-dark-label-2 hover:text-dark-label-1 rounded transition-colors"
           >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-dark-label-1">{problem.problem_id}. {problem.title}</h1>
          <div className="flex items-center gap-2 text-sm">
            {problem.is_verified && (
              <>
                <span className="text-dark-brand-green">Verified</span>
                <CheckCircle2 size={16} className="text-dark-brand-green" />
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            problem.difficulty.toLowerCase() === 'easy' ? 'text-[#00b8a3] bg-[#00b8a3]/20' :
            problem.difficulty.toLowerCase() === 'medium' ? 'text-[#ffc01e] bg-[#ffc01e]/20' :
            'text-[#ff375f] bg-[#ff375f]/20'
          }`}>
            {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1).toLowerCase()}
          </span>
          <button className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-dark-fill-3 text-xs text-dark-label-2 hover:text-dark-label-1 hover:bg-dark-fill-2 transition-colors">
            <Tag size={13} />
            <span>Topics</span>
          </button>
          <button className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-dark-fill-3 text-xs text-dark-label-2 hover:text-dark-label-1 hover:bg-dark-fill-2 transition-colors">
            <Lock size={13} />
            <span>Companies</span>
          </button>
          <button className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-dark-fill-3 text-xs text-dark-label-2 hover:text-dark-label-1 hover:bg-dark-fill-2 transition-colors">
            <Lightbulb size={13} />
            <span>Hint</span>
          </button>
        </div>

        <div className="prose prose-invert prose-sm max-w-none text-dark-label-1 text-[15px] leading-relaxed">
          <div className="whitespace-pre-wrap mb-8" dangerouslySetInnerHTML={{ __html: problem.description.split('Example 1:')[0] }} />

          {problem.examples.map((example, index) => (
            <div key={index} className="my-8">
              <h3 className="text-dark-label-1 font-bold mb-4 text-base">Example {example.example_num}:</h3>
              <div className="bg-dark-fill-3 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap border-l-2 border-transparent">
                {example.example_text.split('\n').map((line, i) => (
                  <div key={i} className="mb-1 last:mb-0">
                    {line.startsWith('Input:') ? (
                      <>
                        <span className="text-dark-label-1 font-bold">Input:</span> <span className="text-dark-label-2">{line.replace('Input:', '').trim()}</span>
                      </>
                    ) : line.startsWith('Output:') ? (
                      <>
                        <span className="text-dark-label-1 font-bold">Output:</span> <span className="text-dark-label-2">{line.replace('Output:', '').trim()}</span>
                      </>
                    ) : line.startsWith('Explanation:') ? (
                      <>
                        <span className="text-dark-label-1 font-bold">Explanation:</span> <span className="text-dark-label-2">{line.replace('Explanation:', '').trim()}</span>
                      </>
                    ) : (
                      <span className="text-dark-label-2">{line}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {problem.constraints.length > 0 && (
            <div className="my-8">
              <h3 className="text-dark-label-1 font-bold mb-4 text-base">Constraints:</h3>
              <ul className="list-disc pl-5 space-y-2 text-dark-label-1">
                {problem.constraints.map((constraint, index) => (
                  <li key={index} className="font-mono text-sm bg-dark-fill-3 px-2 py-1 rounded w-fit">
                    {constraint}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {problem.follow_ups.length > 0 && (
             <div className="mt-8">
               {problem.follow_ups.map((followUp, index) => (
                 <p key={index} className="text-dark-label-1">
                   <span className="font-bold">Follow-up:</span> {followUp}
                 </p>
               ))}
             </div>
          )}
        </div>

        <div className="mt-12 pt-4 border-t border-zinc-700/50">
          <div className="text-dark-label-2 text-sm mb-4">Seen this question in a real interview before? <span className="text-dark-label-3">1/5</span></div>
          <div className="flex gap-2 mb-8">
            <button className="px-6 py-2 rounded-lg bg-zinc-700 text-dark-label-2 hover:bg-zinc-600 hover:text-dark-label-1 text-sm transition-colors font-medium">Yes</button>
            <button className="px-6 py-2 rounded-lg bg-zinc-700 text-dark-label-2 hover:bg-zinc-600 hover:text-dark-label-1 text-sm transition-colors font-medium">No</button>
          </div>
        
          <div className="py-4 flex items-center gap-8 text-sm text-dark-label-2 border-t border-zinc-700/50">
            <div>Accepted <span className="text-dark-label-1 font-medium ml-1">{problem.submission_count}</span></div>
            <div>Acceptance Rate <span className="text-dark-label-1 font-medium ml-1">{problem.acceptance}%</span></div>
          </div>
        </div>

        <div className="py-2">
          <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-dark-fill-2 px-2 -mx-2 rounded transition-colors group">
            <div className="flex items-center gap-2 text-dark-label-2 group-hover:text-dark-label-1">
              <Tag size={16} />
              <span className="text-sm font-medium">Topics</span>
            </div>
            <ChevronRight size={16} className="text-dark-label-3 group-hover:text-dark-label-1" />
          </div>
          
          <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-dark-fill-2 px-2 -mx-2 rounded transition-colors group">
            <div className="flex items-center gap-2 text-dark-label-2 group-hover:text-dark-label-1">
              <Lock size={16} />
              <span className="text-sm font-medium">Companies</span>
            </div>
            <ChevronRight size={16} className="text-dark-label-3 group-hover:text-dark-label-1" />
          </div>

          {problem.hints.map((hint, index) => (
            <div key={index} className="border-b border-zinc-700/50 last:border-0">
              <div 
                className="flex items-center justify-between py-3 cursor-pointer hover:bg-dark-fill-2 px-2 -mx-2 rounded transition-colors group"
                onClick={() => toggle(`hint${index}`)}
              >
                <div className="flex items-center gap-2 text-dark-label-2 group-hover:text-dark-label-1">
                  <Lightbulb size={16} />
                  <span className="text-sm font-medium">Hint {index + 1}</span>
                </div>
                {expanded[`hint${index}`] ? <ChevronDown size={16} className="text-dark-label-1" /> : <ChevronRight size={16} className="text-dark-label-3 group-hover:text-dark-label-1" />}
              </div>
              {expanded[`hint${index}`] && (
                <div className="pl-6 pb-4 text-sm text-dark-label-2 animate-in fade-in slide-in-from-top-1 duration-300">
                  {hint}
                </div>
              )}
            </div>
          ))}
          
          <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-dark-fill-2 px-2 -mx-2 rounded transition-colors group">
            <div className="flex items-center gap-2 text-dark-label-2 group-hover:text-dark-label-1">
              <List size={16} />
              <span className="text-sm font-medium">Similar Questions</span>
            </div>
            <ChevronRight size={16} className="text-dark-label-3 group-hover:text-dark-label-1" />
          </div>
        </div>
        
        <div className="mt-4 pt-4 flex items-center gap-6 text-dark-label-2 border-t border-zinc-700/50">
          <button className="flex items-center gap-2 hover:text-dark-label-1 transition-colors">
            <ThumbsUp size={18} />
            <span className="text-sm">{problem.likes}</span>
          </button>
          <button className="flex items-center gap-2 hover:text-dark-label-1 transition-colors">
            <ThumbsDown size={18} />
            <span className="text-sm">{problem.dislikes}</span>
          </button>
          <button className="flex items-center gap-2 hover:text-dark-label-1 transition-colors">
            <MessageSquare size={18} />
            <span className="text-sm">Comments</span>
          </button>
          <button className="flex items-center gap-2 hover:text-dark-label-1 transition-colors ml-auto">
            <Star size={18} />
          </button>
          <button className="flex items-center gap-2 hover:text-dark-label-1 transition-colors">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
