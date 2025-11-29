import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import ProblemListDrawer from '../editor/ProblemListDrawer';

const AppShell = () => {
  const [isProblemListOpen, setIsProblemListOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsProblemListOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-dark-layer-3 text-dark-label-1 flex flex-col relative">
      <ProblemListDrawer 
        isOpen={isProblemListOpen} 
        onClose={() => setIsProblemListOpen(false)} 
      />
      <Navbar onOpenProblemList={() => setIsProblemListOpen(true)} />
      <main className="flex-1 flex flex-col pt-14">
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;
