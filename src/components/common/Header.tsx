import React from 'react';

interface HeaderProps {
  onResetTour: () => void;
  onOpenSidebar: () => void;
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ onResetTour, onOpenSidebar, title }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between shadow-sm md:shadow-none">
      <div className="flex items-center gap-4">
         {/* Hamburger Button (Mobile Only) */}
         <button 
            onClick={onOpenSidebar}
            className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md"
            aria-label="Open Menu"
         >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
         </button>

         <div>
             <h1 className="text-lg md:text-2xl font-bold text-gray-900">{title}</h1>
             <p className="hidden md:block text-sm text-gray-500 mt-1">Overview of ticket inflow, priorities, and team performance.</p>
         </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-3">
         <div className="hidden sm:flex items-center px-3 py-1.5 bg-green-50 border border-green-200 rounded-md text-xs md:text-sm text-green-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            Online
         </div>
         <button 
            onClick={onResetTour}
            className="text-xs md:text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors"
          >
            Start Tour
          </button>
      </div>
    </header>
  );
};