import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import ProblemsPage from './pages/ProblemsPage';
import ProblemDetailPage from './pages/ProblemDetailPage';
import ContestPage from './pages/ContestPage';
import DiscussionPage from './pages/DiscussionPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/problems" replace />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/problems/:id" element={<ProblemDetailPage />} />
          <Route path="/contest" element={<ContestPage />} />
          <Route path="/discuss" element={<DiscussionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
