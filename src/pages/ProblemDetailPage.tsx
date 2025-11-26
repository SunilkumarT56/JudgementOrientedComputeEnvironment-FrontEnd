

import { useState, useRef } from 'react';
import { Panel, PanelGroup, PanelResizeHandle, type ImperativePanelHandle } from 'react-resizable-panels';
import ProblemDescription from '../components/editor/ProblemDescription';
import CodeEditor from '../components/editor/CodeEditor';
import TestcasePanel from '../components/editor/TestcasePanel';

const ProblemDetailPage = () => {
  const [result, setResult] = useState<{ status: 'success' | 'error' | null, message: string } | null>(null);
  const leftPanelRef = useRef<ImperativePanelHandle>(null);

  const handleRun = () => {
    setResult(null);
    setTimeout(() => {
      setResult({ 
        status: 'success', 
        message: 'Accepted',
      });
    }, 1000);
  };

  const handleSubmit = () => {
    setResult(null);
    setTimeout(() => {
      setResult({ 
        status: 'success', 
        message: 'Success',
      });
    }, 1500);
  };

  const handleCollapse = () => {
    const panel = leftPanelRef.current;
    if (panel) {
      panel.resize(0);
    }
  };

  const handleExpand = () => {
    const panel = leftPanelRef.current;
    if (panel) {
      panel.resize(100);
    }
  };

  return (
    <div className="h-[calc(100vh-56px)] bg-dark-layer-2 overflow-hidden p-2">
      <PanelGroup direction="horizontal">
        {/* Left Panel - Description */}
        <Panel ref={leftPanelRef} defaultSize={50} minSize={0} collapsible>
          <div className="h-full rounded-xl overflow-hidden shadow-sm">
            <ProblemDescription onCollapse={handleCollapse} onExpand={handleExpand} />
          </div>
        </Panel>

        <PanelResizeHandle className="w-2 bg-transparent hover:bg-dark-layer-2 transition-colors" />

        {/* Right Panel - Editor & Testcase */}
        <Panel defaultSize={50} minSize={30}>
          <PanelGroup direction="vertical">
            {/* Top - Code Editor */}
            <Panel defaultSize={60} minSize={30}>
              <div className="h-full rounded-xl overflow-hidden shadow-sm">
                <CodeEditor />
              </div>
            </Panel>

            <PanelResizeHandle className="h-2 bg-transparent hover:bg-dark-layer-2 transition-colors" />

            {/* Bottom - Testcase Panel */}
            <Panel defaultSize={40} minSize={6}>
              <div className="h-full rounded-xl overflow-hidden shadow-sm">
                <TestcasePanel result={result} onRun={handleRun} onSubmit={handleSubmit} />
              </div>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default ProblemDetailPage;
