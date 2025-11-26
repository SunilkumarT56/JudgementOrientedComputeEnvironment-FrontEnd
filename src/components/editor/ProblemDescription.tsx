import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Star, Share2, MessageSquare, BookOpen, FlaskConical, Clock, CheckCircle2, Tag, ChevronRight, ChevronDown, Lock, Lightbulb, List, ChevronLeft, Maximize2 } from 'lucide-react';


interface ProblemDescriptionProps {
  onCollapse?: () => void;
  onExpand?: () => void;
}

const ProblemDescription = ({ onCollapse, onExpand }: ProblemDescriptionProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="h-full flex flex-col bg-dark-layer-2">
      {/* Tabs */}
      <div className="flex items-center justify-between px-4 py-2 bg-dark-layer-3 select-none">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm font-medium text-dark-label-1 hover:text-dark-label-1 transition-colors">
            <div className="text-blue-500"><BookOpen size={16} /></div>
            Description
          </button>
          
          <div className="w-[1px] h-4 bg-dark-divider"></div>
          
          <button className="flex items-center gap-2 text-sm font-medium text-dark-label-2 hover:text-dark-label-1 transition-colors">
            <div className="text-dark-brand-orange"><FlaskConical size={16} /></div>
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
          <h1 className="text-2xl font-bold text-dark-label-1">1. Two Sum</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-dark-brand-green">Solved</span>
            <CheckCircle2 size={16} className="text-dark-brand-green" />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-cyan-500 bg-dark-fill-2 px-2.5 py-1 rounded-full text-sm font-medium">Easy</span>
          <button className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-dark-fill-2 text-sm text-dark-label-2 hover:text-dark-label-1 hover:bg-dark-fill-3 transition-colors">
            <Tag size={14} />
            <span>Topics</span>
          </button>
          <button className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-dark-fill-2 text-sm text-dark-brand-orange hover:text-dark-brand-yellow hover:bg-dark-fill-3 transition-colors">
            <Lock size={14} />
            <span>Companies</span>
          </button>
          <button className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-dark-fill-2 text-sm text-dark-label-2 hover:text-dark-label-1 hover:bg-dark-fill-3 transition-colors">
            <Lightbulb size={14} />
            <span>Hint</span>
          </button>
        </div>

        <div className="prose prose-invert prose-sm max-w-none text-dark-label-1 text-base leading-relaxed">
          <p>
            Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.
          </p>
          <p>
            You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
          </p>
          <p>
            You can return the answer in any order.
          </p>

          <div className="my-8">
            <h3 className="text-dark-label-1 font-bold mb-4">Example 1:</h3>
            <div className="bg-dark-fill-2 p-4 rounded-lg font-mono text-sm">
              <p className="mb-2"><span className="text-dark-label-2">Input:</span> nums = [2,7,11,15], target = 9</p>
              <p className="mb-2"><span className="text-dark-label-2">Output:</span> [0,1]</p>
              <p><span className="text-dark-label-2">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].</p>
            </div>
          </div>

          <div className="my-8">
            <h3 className="text-dark-label-1 font-bold mb-4">Example 2:</h3>
            <div className="bg-dark-fill-2 p-4 rounded-lg font-mono text-sm">
              <p className="mb-2"><span className="text-dark-label-2">Input:</span> nums = [3,2,4], target = 6</p>
              <p className="mb-2"><span className="text-dark-label-2">Output:</span> [1,2]</p>
            </div>
          </div>

          <div className="my-8">
            <h3 className="text-dark-label-1 font-bold mb-4">Example 3:</h3>
            <div className="bg-dark-fill-2 p-4 rounded-lg font-mono text-sm">
              <p className="mb-2"><span className="text-dark-label-2">Input:</span> nums = [3,3], target = 6</p>
              <p className="mb-2"><span className="text-dark-label-2">Output:</span> [0,1]</p>
            </div>
          </div>

          <div className="my-8">
            <h3 className="text-dark-label-1 font-bold mb-4">Constraints:</h3>
            <ul className="list-disc pl-5 space-y-2 text-dark-label-1">
              <li><code>2 &le; nums.length &le; 10<sup>4</sup></code></li>
              <li><code>-10<sup>9</sup> &le; nums[i] &le; 10<sup>9</sup></code></li>
              <li><code>-10<sup>9</sup> &le; target &le; 10<sup>9</sup></code></li>
              <li>Only one valid answer exists.</li>
            </ul>
          </div>

          <div className="mt-8">
            <p className="text-dark-label-1">
              <span className="font-bold">Follow-up:</span> Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code> time complexity?
            </p>
          </div>
        </div>

        <div className="mt-8 pb-4">
          <div className="text-dark-label-2 text-sm mb-4">Seen this question in a real interview before? <span className="text-dark-label-3">1/5</span></div>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 rounded-lg bg-dark-fill-2 text-dark-label-2 hover:bg-dark-fill-3 hover:text-dark-label-1 text-sm transition-colors">Yes</button>
            <button className="px-4 py-1.5 rounded-lg bg-dark-fill-2 text-dark-label-2 hover:bg-dark-fill-3 hover:text-dark-label-1 text-sm transition-colors">No</button>
          </div>
        </div>

        <div className="py-4 flex items-center gap-8 text-sm text-dark-label-2">
          <div>Accepted <span className="text-dark-label-1 font-medium ml-1">19,622,756</span><span className="text-xs text-dark-label-3 ml-1">/34.7M</span></div>
          <div>Acceptance Rate <span className="text-dark-label-1 font-medium ml-1">56.6%</span></div>
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
            <div className="flex items-center gap-2 text-dark-brand-orange group-hover:text-dark-brand-yellow">
              <Lock size={16} />
              <span className="text-sm font-medium">Companies</span>
            </div>
            <ChevronRight size={16} className="text-dark-label-3 group-hover:text-dark-label-1" />
          </div>

          <div className="border-b border-gray-700">
            <div 
              className="flex items-center justify-between py-3 cursor-pointer hover:bg-dark-fill-2 px-2 -mx-2 rounded transition-colors group"
              onClick={() => toggle('hint1')}
            >
              <div className="flex items-center gap-2 text-dark-label-2 group-hover:text-dark-label-1">
                <Lightbulb size={16} />
                <span className="text-sm font-medium">Hint 1</span>
              </div>
              {expanded['hint1'] ? <ChevronDown size={16} className="text-dark-label-1" /> : <ChevronRight size={16} className="text-dark-label-3 group-hover:text-dark-label-1" />}
            </div>
            {expanded['hint1'] && (
              <div className="pl-6 pb-4 text-sm text-dark-label-2 animate-in fade-in slide-in-from-top-1 duration-300">
                A really brute force way would be to search for all possible pairs of numbers but that would be slow. Again, it's best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.
              </div>
            )}
          </div>

          <div className="border-b border-gray-700">
            <div 
              className="flex items-center justify-between py-3 cursor-pointer hover:bg-dark-fill-2 px-2 -mx-2 rounded transition-colors group"
              onClick={() => toggle('hint2')}
            >
              <div className="flex items-center gap-2 text-dark-label-2 group-hover:text-dark-label-1">
                <Lightbulb size={16} />
                <span className="text-sm font-medium">Hint 2</span>
              </div>
              {expanded['hint2'] ? <ChevronDown size={16} className="text-dark-label-1" /> : <ChevronRight size={16} className="text-dark-label-3 group-hover:text-dark-label-1" />}
            </div>
            {expanded['hint2'] && (
              <div className="pl-6 pb-4 text-sm text-dark-label-2 animate-in fade-in slide-in-from-top-1 duration-300">
                So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?
              </div>
            )}
          </div>

          <div className="border-b border-gray-700">
            <div 
              className="flex items-center justify-between py-3 cursor-pointer hover:bg-dark-fill-2 px-2 -mx-2 rounded transition-colors group"
              onClick={() => toggle('hint3')}
            >
              <div className="flex items-center gap-2 text-dark-label-2 group-hover:text-dark-label-1">
                <Lightbulb size={16} />
                <span className="text-sm font-medium">Hint 3</span>
              </div>
              {expanded['hint3'] ? <ChevronDown size={16} className="text-dark-label-1" /> : <ChevronRight size={16} className="text-dark-label-3 group-hover:text-dark-label-1" />}
            </div>
            {expanded['hint3'] && (
              <div className="pl-6 pb-4 text-sm text-dark-label-2 animate-in fade-in slide-in-from-top-1 duration-300">
                The second train of thought is, without changing the array, can we use additional space to somehow check if the complement exists?
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-dark-fill-2 px-2 -mx-2 rounded transition-colors group">
            <div className="flex items-center gap-2 text-dark-label-2 group-hover:text-dark-label-1">
              <List size={16} />
              <span className="text-sm font-medium">Similar Questions</span>
            </div>
            <ChevronRight size={16} className="text-dark-label-3 group-hover:text-dark-label-1" />
          </div>
        </div>
        
        <div className="mt-4 pt-4 flex items-center gap-6 text-dark-label-2">
          <button className="flex items-center gap-2 hover:text-dark-label-1 transition-colors">
            <ThumbsUp size={18} />
            <span className="text-sm">24.5K</span>
          </button>
          <button className="flex items-center gap-2 hover:text-dark-label-1 transition-colors">
            <ThumbsDown size={18} />
            <span className="text-sm">1.2K</span>
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
