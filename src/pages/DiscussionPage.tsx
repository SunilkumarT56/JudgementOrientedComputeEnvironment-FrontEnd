import { MessageSquare, Eye, Search, Filter } from 'lucide-react';


const MOCK_DISCUSSIONS = [
  { id: 1, title: 'Google Interview Experience (L4) - Accepted', author: 'dev_wizard', views: '12.5K', replies: 45, tags: ['Interview Experience', 'Google'] },
  { id: 2, title: 'Blind 75 LeetCode Questions', author: 'neetcode', views: '450K', replies: 120, tags: ['Study Guide'] },
  { id: 3, title: 'System Design Primer', author: 'donne_martin', views: '89K', replies: 230, tags: ['System Design'] },
  { id: 4, title: 'Amazon OA Questions 2024', author: 'anonymous_user', views: '5.2K', replies: 12, tags: ['Amazon', 'OA'] },
  { id: 5, title: 'Dynamic Programming Patterns', author: 'dp_master', views: '34K', replies: 89, tags: ['Algorithms', 'DP'] },
];

const DiscussionPage = () => {
  return (
    <div className="flex-1 bg-dark-layer-2 p-6">
      <div className="max-w-[1000px] mx-auto grid grid-cols-[1fr_250px] gap-6">
        
        {/* Main Content */}
        <div>
          {/* Search & Filter */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-label-3" size={18} />
              <input 
                type="text" 
                placeholder="Search topics..." 
                className="w-full bg-dark-layer-1 text-dark-label-1 pl-10 pr-4 py-2.5 rounded-lg border border-dark-divider focus:border-dark-brand-blue/50 outline-none transition-all"
              />
            </div>
            <button className="px-4 py-2.5 bg-dark-layer-1 border border-dark-divider rounded-lg text-dark-label-2 hover:text-dark-label-1 hover:bg-dark-fill-3 flex items-center gap-2 transition-colors">
              <Filter size={18} />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2.5 bg-dark-brand-blue text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors">
              New Post
            </button>
          </div>

          {/* Discussion List */}
          <div className="bg-dark-layer-1 rounded-lg border border-dark-divider overflow-hidden">
            <div className="divide-y divide-dark-divider/50">
              {MOCK_DISCUSSIONS.map((item) => (
                <div key={item.id} className="p-4 hover:bg-dark-fill-3 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-dark-label-1 font-medium mb-2 group-hover:text-dark-brand-blue transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        {item.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded bg-dark-fill-2 text-xs text-dark-label-2">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-dark-label-3 flex items-center gap-1">
                        <span>by</span>
                        <span className="text-dark-label-2 hover:text-dark-brand-blue hover:underline">{item.author}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-dark-label-3 text-sm">
                      <div className="flex flex-col items-center gap-1 min-w-[40px]">
                        <Eye size={16} />
                        <span className="text-xs">{item.views}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 min-w-[40px]">
                        <MessageSquare size={16} />
                        <span className="text-xs">{item.replies}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-dark-layer-1 rounded-lg border border-dark-divider p-4">
            <h3 className="font-medium text-dark-label-1 mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['Interview', 'Google', 'Amazon', 'DP', 'Graph', 'System Design', 'Python', 'C++'].map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-dark-fill-2 rounded-full text-xs text-dark-label-2 hover:bg-dark-fill-3 hover:text-dark-label-1 cursor-pointer transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DiscussionPage;
