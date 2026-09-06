import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  User, 
  Ticket,
  PhoneCall
} from 'lucide-react';
import { UserAccount } from '../types';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserAccount | null;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
}) => {
  const navItems = [
    { id: 'events', label: 'Missions', icon: Calendar },
    { id: 'home', label: 'Base', icon: Sparkles },
    { id: 'register', label: 'Enlist', icon: Ticket },
    { id: 'coordinators', label: 'Command', icon: PhoneCall },
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden backdrop-blur-2xl border-t transition-all pb-safe"
      style={{
        backgroundColor: 'rgba(5, 7, 22, 0.96)',
        borderColor: 'rgba(21, 144, 151, 0.4)',
      }}
    >
      <div className="grid grid-cols-4 h-16 max-w-lg mx-auto px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center relative transition-all py-1 cursor-pointer ${
                isActive ? 'text-[#f8d092]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <span 
                  className="absolute top-0 w-8 h-1 rounded-full bg-[#f8d092] shadow-[0_0_10px_#f8d092]" 
                />
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              </div>

              <span className={`text-[10px] font-chakra font-semibold mt-1 tracking-wider ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
