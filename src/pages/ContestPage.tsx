import { Trophy, Calendar, Clock, ChevronRight } from 'lucide-react';


const ContestCard = ({ title, time, status, image }: { title: string, time: string, status: 'active' | 'upcoming' | 'ended', image: string }) => {
  return (
    <div className="bg-dark-layer-1 rounded-lg border border-dark-divider overflow-hidden hover:border-dark-label-2 transition-colors cursor-pointer group">
      <div className="h-32 bg-dark-fill-3 relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium bg-black/50 backdrop-blur-sm text-white border border-white/10">
          {status === 'active' && <span className="text-dark-brand-green">Live Now</span>}
          {status === 'upcoming' && <span className="text-dark-brand-yellow">Upcoming</span>}
          {status === 'ended' && <span className="text-dark-label-3">Ended</span>}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-dark-label-1 mb-2 group-hover:text-dark-brand-blue transition-colors">{title}</h3>
        <div className="flex items-center gap-4 text-xs text-dark-label-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{time}</span>
          </div>
        </div>
        {status === 'active' && (
          <button className="w-full mt-4 py-1.5 rounded bg-dark-brand-green text-white text-sm font-medium hover:bg-opacity-90 transition-colors">
            Enter Contest
          </button>
        )}
        {status === 'upcoming' && (
          <button className="w-full mt-4 py-1.5 rounded bg-dark-fill-3 text-dark-label-1 text-sm font-medium hover:bg-dark-fill-2 transition-colors">
            Register
          </button>
        )}
      </div>
    </div>
  );
};

const ContestPage = () => {
  return (
    <div className="flex-1 bg-dark-layer-2 p-6">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Hero Section */}
        <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-dark-layer-1 to-dark-fill-3 p-8 rounded-xl border border-dark-divider">
          <div>
            <h1 className="text-2xl font-bold text-dark-label-1 mb-2">LeetCode Weekly Contest 386</h1>
            <p className="text-dark-label-2 mb-6 max-w-xl">
              Join our weekly contest to challenge yourself and compete with others. Solve 4 problems in 1 hour 30 minutes.
            </p>
            <div className="flex items-center gap-4">
              <button className="px-6 py-2 rounded-lg bg-dark-brand-blue text-white font-medium hover:bg-opacity-90 transition-colors shadow-lg shadow-blue-500/20">
                Register Now
              </button>
              <div className="flex items-center gap-2 text-dark-label-2 text-sm">
                <Clock size={16} />
                <span>Starts in 2 days 14 hours</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Trophy size={120} className="text-dark-brand-yellow opacity-20 rotate-12" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ContestCard 
            title="Weekly Contest 386" 
            time="Feb 25, 2024 at 8:00 AM" 
            status="upcoming"
            image="https://assets.leetcode.com/static_assets/public/images/contest/weekly-contest-386.png"
          />
          <ContestCard 
            title="Biweekly Contest 124" 
            time="Feb 24, 2024 at 8:00 PM" 
            status="active"
            image="https://assets.leetcode.com/static_assets/public/images/contest/biweekly-contest-124.png"
          />
          <ContestCard 
            title="Weekly Contest 385" 
            time="Feb 18, 2024 at 8:00 AM" 
            status="ended"
            image="https://assets.leetcode.com/static_assets/public/images/contest/weekly-contest-385.png"
          />
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-dark-label-1">Past Contests</h2>
            <button className="flex items-center gap-1 text-sm text-dark-brand-blue hover:underline">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[384, 383, 382, 381].map(num => (
              <div key={num} className="bg-dark-layer-1 p-4 rounded-lg border border-dark-divider hover:border-dark-label-2 cursor-pointer transition-colors">
                <div className="text-dark-label-3 text-xs mb-1">Weekly Contest</div>
                <div className="text-dark-label-1 font-medium text-lg mb-4">{num}</div>
                <button className="w-full py-1.5 rounded bg-dark-fill-3 text-dark-label-2 text-xs hover:bg-dark-fill-2 transition-colors">
                  Virtual Participate
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContestPage;
