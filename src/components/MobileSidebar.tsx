import { useState, useEffect } from 'preact/hooks';

interface MobileSidebarProps {
  children: any;
}

export default function MobileSidebar({ children }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close on ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        class="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-lg flex items-center justify-center transition-all"
        aria-label="Open navigation menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          class="fixed inset-0 z-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true"></div>

          {/* Drawer */}
          <div
            class="absolute top-0 left-0 h-full w-80 max-w-[85vw] bg-[#0b0e14] border-r border-[#292e3b] shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div class="sticky top-0 z-10 bg-[#0b0e14] border-b border-[#292e3b] px-4 py-4 flex items-center justify-between">
              <h2 class="text-lg font-bold text-white">Navigation</h2>
              <button
                onClick={() => setIsOpen(false)}
                class="p-2 hover:bg-[#1e232f] rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div class="p-4" dangerouslySetInnerHTML={{ __html: children }}></div>
          </div>
        </div>
      )}
    </>
  );
}
