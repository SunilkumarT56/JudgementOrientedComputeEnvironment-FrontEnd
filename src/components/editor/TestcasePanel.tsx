import { useState } from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import { clsx } from 'clsx';

interface TestcasePanelProps {
  result: { status: 'success' | 'error' | null, message: string } | null;
  onRun: () => void;
  onSubmit: () => void;
}

const TestcasePanel = ({ result, onRun, onSubmit }: TestcasePanelProps) => {
  const [activeTab, setActiveTab] = useState<'testcase' | 'result'>('testcase');
  const [activeCase, setActiveCase] = useState(0);

  const cases = [
    { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
    { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
    { input: 'nums = [3,3], target = 6', output: '[0,1]' },
  ];

  return (
    <div className="h-full flex flex-col bg-dark-layer-2">
      {/* Header with Tabs and Actions */}
      <div className="flex items-center justify-between px-4 pt-2 bg-dark-layer-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('testcase')}
            className={clsx(
              "px-4 py-2 text-base font-medium rounded-t-lg flex items-center gap-2",
              activeTab === 'testcase' 
                ? "bg-dark-layer-1 text-dark-label-1 relative -bottom-[1px]" 
                : "text-dark-label-2 hover:text-dark-label-1"
            )}
          >
            <div className={clsx(activeTab === 'testcase' ? "text-dark-brand-green" : "text-dark-label-3")}>
              <CheckCircle2 size={16} />
            </div>
            Testcase
          </button>
          <button
            onClick={() => setActiveTab('result')}
            className={clsx(
              "px-4 py-2 text-base font-medium rounded-t-lg flex items-center gap-2",
              activeTab === 'result' 
                ? "bg-dark-layer-1 text-dark-label-1 relative -bottom-[1px]" 
                : "text-dark-label-2 hover:text-dark-label-1"
            )}
          >
            Test Result
          </button>
        </div>

        <div className="flex items-center gap-3 pb-2">
          <button 
            onClick={onRun}
            className="px-6 py-2 rounded-lg bg-zinc-600 text-dark-label-1 hover:bg-opacity-90 text-sm font-medium transition-colors"
          >
            Run
          </button>
          <button 
            onClick={onSubmit}
            className="px-6 py-2 rounded-lg bg-dark-brand-green text-white hover:bg-opacity-90 text-sm font-medium transition-colors"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'testcase' ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              {cases.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCase(i)}
                  className={clsx(
                    "px-4 py-1 rounded-lg text-sm font-medium transition-colors",
                    activeCase === i
                      ? "bg-zinc-600 text-dark-label-1"
                      : "text-dark-label-2 hover:bg-dark-fill-2 hover:text-dark-label-1"
                  )}
                >
                  Case {i + 1}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs text-dark-label-2 mb-2 font-medium">nums =</div>
                <div className="bg-zinc-600 p-3 rounded-lg font-mono text-sm text-dark-label-1 border border-transparent focus-within:border-dark-label-3 transition-colors">
                  [2,7,11,15]
                </div>
              </div>
              <div>
                <div className="text-xs text-dark-label-2 mb-2 font-medium">target =</div>
                <div className="bg-zinc-600 p-3 rounded-lg font-mono text-sm text-dark-label-1 border border-transparent focus-within:border-dark-label-3 transition-colors">
                  9
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full">
            {result ? (
              <div className="space-y-4">
                <div className={clsx(
                  "text-lg font-medium flex items-center gap-2",
                  result.status === 'success' ? "text-dark-brand-green" : "text-red-500"
                )}>
                  {result.status === 'success' ? 'Accepted' : 'Wrong Answer'}
                </div>

                {result.status === 'success' && (
                  <div className="flex gap-4 text-xs text-dark-label-2">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>Runtime: 56 ms</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  {cases.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveCase(i)}
                      className={clsx(
                        "px-4 py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                        activeCase === i
                          ? "bg-zinc-600 text-dark-label-1"
                          : "text-dark-label-2 hover:bg-dark-fill-2 hover:text-dark-label-1"
                      )}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-dark-brand-green" />
                      Case {i + 1}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-dark-label-2 mb-2 font-medium">Input</div>
                    <div className="bg-zinc-600 p-3 rounded-lg font-mono text-sm text-dark-label-1">
                      nums = [2,7,11,15], target = 9
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-dark-label-2 mb-2 font-medium">Output</div>
                    <div className="bg-zinc-600 p-3 rounded-lg font-mono text-sm text-dark-label-1">
                      [0,1]
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-dark-label-2 mb-2 font-medium">Expected</div>
                    <div className="bg-zinc-600 p-3 rounded-lg font-mono text-sm text-dark-label-1">
                      [0,1]
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-dark-label-3">
                <div className="text-sm">Run code to see results</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestcasePanel;
