import React, { useState, useEffect, useRef } from 'react';
import { useToast } from './common/Toast';

interface Step {
  targetId: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  isModal?: boolean;
}

interface TourProps {
  startRequest?: number;
}

const TOUR_STEPS: Step[] = [
  {
    targetId: 'root', 
    title: 'Welcome to TriageAI',
    content: 'TriageAI uses Gemini AI to automatically categorize and prioritize customer support tickets. Let\'s take a quick tour of your new dashboard.',
    isModal: true
  },
  {
    targetId: 'stats-section',
    title: 'Key Metrics',
    content: 'Get an instant pulse on your support queue. Track Open tickets, Resolved counts, and Critical items that need immediate attention.',
    position: 'bottom'
  },
  {
    targetId: 'chart-volume-category',
    title: 'Volume by Category',
    content: 'Visualize incoming ticket types. Are you seeing a spike in "Billing" issues or "Bugs"? This chart helps you spot trends early.',
    position: 'right'
  },
  {
    targetId: 'chart-volume-priority',
    title: 'Volume by Priority',
    content: 'Understand the urgency distribution. Ensure your team is focused on the High Priority slice of the pie.',
    position: 'left'
  },
  {
    targetId: 'search-input',
    title: 'Instant Search',
    content: 'Quickly find specific tickets by searching for customer names, keywords, or ticket IDs.',
    position: 'bottom'
  },
  {
    targetId: 'filter-category',
    title: 'Smart Filters',
    content: 'Drill down into specific categories (e.g., Billing) or filter by Priority and Status to organize your workflow.',
    position: 'bottom'
  },
  {
    targetId: 'sort-by',
    title: 'Confidence Sorting',
    content: 'Sort by "AI Confidence" to verify the model\'s predictions, or stick to the default urgency-based sorting.',
    position: 'bottom'
  },
  {
    targetId: 'btn-simulate',
    title: 'Simulate Incoming Tickets',
    content: 'Want to test the AI? Click here to generate mock customer messages and watch TriageAI categorize them in real-time.',
    position: 'left'
  },
  {
    targetId: 'ticket-list',
    title: 'The Queue',
    content: 'Your main workspace. Click any ticket to expand details, edit classifications, or assign it to a team member.',
    position: 'top'
  },
  {
    targetId: 'toast-container-anchor',
    title: 'Live Notifications',
    content: 'Keep an eye here. You\'ll get real-time alerts for every new ticket, assignment change, or resolution.',
    position: 'top'
  }
];

export const Tour: React.FC<TourProps> = ({ startRequest }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const { addToast } = useToast();
  
  const stepRef = useRef(currentStep);
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    stepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // Handle Manual Trigger via Prop
  useEffect(() => {
    if (startRequest && startRequest > 0) {
      setIsOpen(true);
      setCurrentStep(0);
      // We do NOT clear localStorage here, because manual triggering shouldn't 
      // affect the "auto-start on first visit" logic for future reloads.
    }
  }, [startRequest]);

  // Handle Auto-Start on First Visit
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('triageai_tour_seen');
    if (!hasSeenTour) {
      setTimeout(() => setIsOpen(true), 1200);
    }
  }, []);

  // RAF Loop for tracking element position smoothly
  useEffect(() => {
    if (!isOpen) return;

    let rafId: number;
    
    const updatePosition = () => {
      if (!isOpenRef.current) return;

      const step = TOUR_STEPS[stepRef.current];
      
      if (step.isModal) {
        setTargetRect(null);
      } else {
        const el = document.getElementById(step.targetId);
        if (el) {
          const newRect = el.getBoundingClientRect();
          setTargetRect(prevRect => {
            if (!prevRect) return newRect;
            if (
              Math.abs(prevRect.top - newRect.top) < 1 &&
              Math.abs(prevRect.left - newRect.left) < 1 &&
              Math.abs(prevRect.width - newRect.width) < 1 &&
              Math.abs(prevRect.height - newRect.height) < 1
            ) {
              return prevRect;
            }
            return newRect;
          });
        } else {
          setTargetRect(null);
        }
      }
      rafId = requestAnimationFrame(updatePosition);
    };

    updatePosition();
    return () => cancelAnimationFrame(rafId);
  }, [isOpen]);

  // Scroll into view on step change
  useEffect(() => {
    if (!isOpen) return;
    
    const step = TOUR_STEPS[currentStep];
    if (!step.isModal) {
      const el = document.getElementById(step.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    if (step.title === 'Live Notifications') {
      addToast('🔔 New Ticket: "Login failed on iOS"', 'info');
    }
  }, [currentStep, isOpen, addToast]);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    // Ensure we mark it as seen when closing, so it doesn't auto-pop again on reload
    localStorage.setItem('triageai_tour_seen', 'true');
  };

  if (!isOpen) return null;

  const step = TOUR_STEPS[currentStep];

  // --- Positioning Logic ---
  let popoverStyle: React.CSSProperties = {};
  const POPOVER_WIDTH = 340;
  const GAP = 16;
  const VIEWPORT_PADDING = 20;

  if (targetRect) {
    let top = 0;
    let left = 0;
    let transform = '';

    switch (step.position) {
      case 'top':
        top = targetRect.top - GAP;
        left = targetRect.left + (targetRect.width / 2) - (POPOVER_WIDTH / 2);
        transform = 'translateY(-100%)';
        break;
      case 'bottom':
        top = targetRect.bottom + GAP;
        left = targetRect.left + (targetRect.width / 2) - (POPOVER_WIDTH / 2);
        break;
      case 'left':
        top = targetRect.top + (targetRect.height / 2);
        left = targetRect.left - GAP - POPOVER_WIDTH;
        transform = 'translateY(-50%)';
        break;
      case 'right':
        top = targetRect.top + (targetRect.height / 2);
        left = targetRect.right + GAP;
        transform = 'translateY(-50%)';
        break;
      default: // bottom fallback
        top = targetRect.bottom + GAP;
        left = targetRect.left + (targetRect.width / 2) - (POPOVER_WIDTH / 2);
        break;
    }

    // Horizontal clamping
    const maxLeft = window.innerWidth - POPOVER_WIDTH - VIEWPORT_PADDING;
    left = Math.max(VIEWPORT_PADDING, Math.min(maxLeft, left));

    if (top < VIEWPORT_PADDING) top = VIEWPORT_PADDING;

    popoverStyle = {
      top: `${top}px`,
      left: `${left}px`,
      width: `${POPOVER_WIDTH}px`,
      transform: transform,
      position: 'fixed',
    };
  } else {
    // Center Modal
    popoverStyle = {
      top: '50%',
      left: '50%',
      width: `${POPOVER_WIDTH}px`,
      transform: 'translate(-50%, -50%)',
      position: 'fixed',
    };
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden font-sans">
      <div className="absolute inset-0 bg-transparent" /> 

      {/* Dark Overlay via massive shadow technique */}
      {targetRect ? (
        <div 
          className="absolute rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] pointer-events-none transition-all duration-300 ease-in-out border-2 border-white/50"
          style={{
            top: targetRect.top - 4,
            left: targetRect.left - 4,
            width: targetRect.width + 8,
            height: targetRect.height + 8,
          }}
        >
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
        </div>
      ) : (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500" />
      )}

      {/* Popover Card */}
      <div 
        className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-0 flex flex-col animate-in fade-in zoom-in-95 duration-300 transition-all overflow-hidden"
        style={popoverStyle}
      >
        <div className="h-1 bg-gray-100 w-full">
           <div 
             className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300" 
             style={{ width: `${((currentStep + 1) / TOUR_STEPS.length) * 100}%` }}
           />
        </div>

        <div className="p-6">
            <div className="flex justify-between items-start mb-3">
            <div>
                <span className="inline-block py-0.5 px-2 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider mb-2 border border-blue-100">
                    Step {currentStep + 1} of {TOUR_STEPS.length}
                </span>
                <h3 className="text-xl font-bold text-gray-900 leading-tight">{step.title}</h3>
            </div>
            <button 
                onClick={handleSkip} 
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Skip tour"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {step.content}
            </p>

            <div className="flex items-center justify-between">
                <button 
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                >
                    Back
                </button>

                <button 
                    onClick={handleNext}
                    className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-gray-200 flex items-center gap-2"
                >
                    {currentStep === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next'}
                    {currentStep !== TOUR_STEPS.length - 1 && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    )}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};