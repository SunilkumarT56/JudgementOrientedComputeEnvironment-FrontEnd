import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Panel, PanelGroup, PanelResizeHandle, type ImperativePanelHandle } from 'react-resizable-panels';
import ProblemDescription from '../components/editor/ProblemDescription';
import CodeEditor from '../components/editor/CodeEditor';
import TestcasePanel from '../components/editor/TestcasePanel';
import type { Problem } from '../types/problem';

const ProblemDetailPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState<Problem | undefined>(undefined);
  const [result, setResult] = useState<{ status: 'success' | 'error' | null, message: string } | null>(null);
  const leftPanelRef = useRef<ImperativePanelHandle>(null);

  useEffect(() => {
    const fetchProblem = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`http://localhost:30000/problems/${id}`);
        setProblem(response.data);
      } catch (error) {
        console.error('Error fetching problem:', error);
      }
    };

    fetchProblem();
  }, [id]);

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
    <div className="h-[calc(100vh-56px)] bg-dark-layer-2 overflow-hidden p-2 relative">

      
      <PanelGroup direction="horizontal">
        {/* Left Panel - Description */}
        <Panel ref={leftPanelRef} defaultSize={50} minSize={0} collapsible>
          <div className="h-full rounded-xl overflow-hidden shadow-sm">
            <ProblemDescription 
              problem={problem}
              onCollapse={handleCollapse} 
              onExpand={handleExpand}
            />
          </div>
        </Panel>

        <PanelResizeHandle className="w-2 bg-transparent hover:bg-dark-layer-2 transition-colors" />

        {/* Right Panel - Editor & Testcase */}
        <Panel defaultSize={50} minSize={30}>
          <PanelGroup direction="vertical">
            {/* Top - Code Editor */}
            <Panel defaultSize={60} minSize={30}>
              <div className="h-full rounded-xl overflow-hidden shadow-sm">
                <CodeEditor 
                  codeSnippets={problem?.code_snippets} 
                  onRun={handleRun}
                  onSubmit={handleSubmit}
                />
              </div>
            </Panel>

            <PanelResizeHandle className="h-2 bg-transparent hover:bg-dark-layer-2 transition-colors" />

            {/* Bottom - Testcase Panel */}
            <Panel defaultSize={40} minSize={6}>
              <div className="h-full rounded-xl overflow-hidden shadow-sm">
                <TestcasePanel result={result} />
              </div>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default ProblemDetailPage;
