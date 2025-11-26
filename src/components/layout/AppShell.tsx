import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import ProblemListDrawer from './ProblemListDrawer';

const AppShell = () => {
  const [isProblemListOpen, setIsProblemListOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-layer-3 text-dark-label-1 flex flex-col relative">
      <Navbar onOpenProblemList={() => setIsProblemListOpen(true)} />
      <ProblemListDrawer isOpen={isProblemListOpen} onClose={() => setIsProblemListOpen(false)} />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;
