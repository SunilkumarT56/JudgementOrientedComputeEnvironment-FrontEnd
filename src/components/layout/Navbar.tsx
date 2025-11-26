import { Link, useLocation } from 'react-router-dom';
import { List, ChevronLeft, ChevronRight, Shuffle, Timer, Settings, LayoutGrid, Flame, User, Bell, ChevronDown, Gift, LogOut, FileText, Layout, CreditCard, FlaskConical, Moon, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  onOpenProblemList?: () => void;
}

const Navbar = ({ onOpenProblemList }: NavbarProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/problems';
  const { theme, setTheme } = useTheme();
  
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isAppearanceSubmenuOpen, setIsAppearanceSubmenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
        setIsAppearanceSubmenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="h-14 bg-dark-layer-3 flex items-center px-4 sticky top-0 z-50">
      <div className="max-w-[1800px] mx-auto w-full flex items-center justify-between">
        
        {/* Home Page Navbar */}
        {isHomePage ? (
          <>
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2 mr-2">
                <img src="/leetcode.png" alt="Logo" className="h-6 w-6" />
                <span className="text-dark-label-1 font-medium text-lg tracking-tight">LeetCode</span>
              </Link>
              
              <div className="flex items-center gap-5 text-sm text-dark-label-2">
                <a href="#" className="hover:text-dark-label-1 transition-colors">Explore</a>
                <a href="#" className="text-dark-label-1 font-medium">Problems</a>
                <a href="#" className="hover:text-dark-label-1 transition-colors">Contest</a>
                <a href="#" className="hover:text-dark-label-1 transition-colors">Discuss</a>
                <div className="flex items-center gap-1 hover:text-dark-label-1 transition-colors cursor-pointer group">
                  <span>Interview</span>
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                </div>
                <div className="flex items-center gap-1 hover:text-dark-label-1 transition-colors cursor-pointer group">
                  <span className="text-dark-brand-orange">Store</span>
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform text-dark-brand-orange" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="text-dark-label-2 hover:text-dark-label-1 transition-colors relative">
                <Bell size={20} />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </button>
              
              <div className="flex items-center gap-1 text-dark-label-2 hover:text-dark-label-1 transition-colors cursor-pointer">
                <Flame size={20} />
                <span className="text-sm font-medium">0</span>
              </div>

              <div className="relative" ref={profileMenuRef}>
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="w-8 h-8 rounded-full bg-dark-fill-3 flex items-center justify-center overflow-hidden border border-transparent hover:border-dark-label-2 transition-colors"
                >
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-dark-layer-1 rounded-xl shadow-2xl z-50 overflow-hidden">
                    {/* Header */}
                    <div className="p-4 flex items-center gap-3 border-b border-dark-divider">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-dark-fill-3">
                         <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                      </div>
                      <div>
                        <div className="font-bold text-dark-label-1">Sunilkumar_T</div>
                        <div className="text-xs text-dark-brand-orange">Access all features with our Premium subscription!</div>
                      </div>
                    </div>

                    {/* Quick Links */}
                    <div className="p-2 grid grid-cols-3 gap-2">
                       <button className="flex flex-col items-center gap-1 p-2 hover:bg-dark-fill-3 rounded-lg transition-colors">
                          <div className="w-8 h-8 rounded bg-green-500/10 text-green-500 flex items-center justify-center"><List size={18} /></div>
                          <span className="text-xs text-dark-label-2">My Lists</span>
                       </button>
                       <button className="flex flex-col items-center gap-1 p-2 hover:bg-dark-fill-3 rounded-lg transition-colors">
                          <div className="w-8 h-8 rounded bg-blue-500/10 text-blue-500 flex items-center justify-center"><FileText size={18} /></div>
                          <span className="text-xs text-dark-label-2">Notebook</span>
                       </button>
                       <button className="flex flex-col items-center gap-1 p-2 hover:bg-dark-fill-3 rounded-lg transition-colors">
                          <div className="w-8 h-8 rounded bg-green-500/10 text-green-500 flex items-center justify-center"><Timer size={18} /></div>
                          <span className="text-xs text-dark-label-2">Progress</span>
                       </button>
                    </div>

                    {/* Points */}
                    <div className="px-4 py-2">
                       <div className="bg-dark-fill-3 rounded-lg p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center text-xs font-bold">P</div>
                             <span className="text-sm text-dark-label-2">Points</span>
                          </div>
                          <span className="text-sm font-bold text-dark-label-1">0</span>
                       </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                       <button className="w-full px-4 py-2 text-left text-sm text-dark-label-2 hover:bg-dark-fill-3 hover:text-dark-label-1 flex items-center gap-3 transition-colors">
                          <FlaskConical size={16} /> Try New Features
                       </button>
                       <button className="w-full px-4 py-2 text-left text-sm text-dark-label-2 hover:bg-dark-fill-3 hover:text-dark-label-1 flex items-center gap-3 transition-colors">
                          <CreditCard size={16} /> Orders
                       </button>
                       <button className="w-full px-4 py-2 text-left text-sm text-dark-label-2 hover:bg-dark-fill-3 hover:text-dark-label-1 flex items-center gap-3 transition-colors">
                          <Layout size={16} /> My Playgrounds
                       </button>
                       <button className="w-full px-4 py-2 text-left text-sm text-dark-label-2 hover:bg-dark-fill-3 hover:text-dark-label-1 flex items-center gap-3 transition-colors">
                          <Settings size={16} /> Settings
                       </button>
                       
                       {/* Appearance Toggle */}
                       <div className="relative">
                         <button 
                            onClick={() => setIsAppearanceSubmenuOpen(!isAppearanceSubmenuOpen)}
                            className="w-full px-4 py-2 text-left text-sm text-dark-label-2 hover:bg-dark-fill-3 hover:text-dark-label-1 flex items-center justify-between transition-colors"
                         >
                            <div className="flex items-center gap-3">
                               <Moon size={16} /> Appearance
                            </div>
                            <ChevronRight size={14} />
                         </button>

                         {isAppearanceSubmenuOpen && (
                            <div className="absolute right-full top-0 mr-2 w-48 bg-dark-layer-1 rounded-lg shadow-xl overflow-hidden">
                               <button 
                                  onClick={() => setTheme('system')}
                                  className="w-full px-4 py-2 text-left text-sm text-dark-label-2 hover:bg-dark-fill-3 hover:text-dark-label-1 flex items-center justify-between transition-colors"
                               >
                                  <span>System Default</span>
                                  {theme === 'system' && <Check size={14} />}
                               </button>
                               <button 
                                  onClick={() => setTheme('light')}
                                  className="w-full px-4 py-2 text-left text-sm text-dark-label-2 hover:bg-dark-fill-3 hover:text-dark-label-1 flex items-center justify-between transition-colors"
                               >
                                  <span>Light</span>
                                  {theme === 'light' && <Check size={14} />}
                               </button>
                               <button 
                                  onClick={() => setTheme('dark')}
                                  className="w-full px-4 py-2 text-left text-sm text-dark-label-2 hover:bg-dark-fill-3 hover:text-dark-label-1 flex items-center justify-between transition-colors"
                               >
                                  <span>Dark</span>
                                  {theme === 'dark' && <Check size={14} />}
                               </button>
                            </div>
                         )}
                       </div>

                       <div className="h-[1px] bg-dark-divider my-1"></div>
                       <button className="w-full px-4 py-2 text-left text-sm text-dark-label-2 hover:bg-dark-fill-3 hover:text-dark-label-1 flex items-center gap-3 transition-colors">
                          <LogOut size={16} /> Sign Out
                       </button>
                    </div>
                  </div>
                )}
              </div>

              <button className="px-3 py-1.5 bg-dark-brand-orange/20 text-dark-brand-orange hover:bg-dark-brand-orange/30 rounded text-sm font-medium transition-all">
                Premium
              </button>
              
              <div className="w-8 h-8 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                 {/* Placeholder for Turkey Icon */}
                 <Gift size={24} className="text-red-500" /> 
              </div>
            </div>
          </>
        ) : (
          /* Problem Detail Navbar (Existing) */
          <>
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 mr-2">
                <img src="/leetcode.png" alt="Logo" className="h-6 w-6" />
              </Link>
              
              <div className="flex items-center gap-1">
                <button 
                  onClick={onOpenProblemList}
                  className="flex items-center gap-2 px-3 py-1.5 text-dark-label-2 hover:text-dark-label-1 hover:bg-dark-fill-3 rounded transition-colors"
                >
                  <List size={16} />
                  <span className="text-sm font-medium">Problem List</span>
                </button>
                
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-dark-label-2 hover:text-dark-label-1 hover:bg-dark-fill-3 rounded transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="p-1.5 text-dark-label-2 hover:text-dark-label-1 hover:bg-dark-fill-3 rounded transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>

                <button className="p-1.5 text-dark-label-2 hover:text-dark-label-1 hover:bg-dark-fill-3 rounded transition-colors ml-1">
                  <Shuffle size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
               <button className="p-2 text-dark-label-2 hover:text-dark-label-1 hover:bg-dark-fill-3 rounded transition-colors">
                <LayoutGrid size={18} />
              </button>
              
              <button className="p-2 text-dark-label-2 hover:text-dark-label-1 hover:bg-dark-fill-3 rounded transition-colors">
                <Settings size={18} />
              </button>
              
              <button className="flex items-center gap-1 p-2 text-dark-label-2 hover:text-dark-label-1 hover:bg-dark-fill-3 rounded transition-colors">
                <Flame size={18} />
                <span className="text-sm font-medium">0</span>
              </button>

              <button className="p-2 text-blue-500 hover:bg-dark-fill-3 rounded transition-colors">
                <Timer size={18} />
              </button>

              <button className="p-2 text-dark-label-2 hover:text-dark-label-1 hover:bg-dark-fill-3 rounded transition-colors">
                <User size={18} />
              </button>

              <button className="px-3 py-1.5 bg-[#ffa116]/10 text-[#ffa116] hover:bg-[#ffa116]/20 rounded text-sm font-medium transition-all ml-2">
                Premium
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
