import { useState, useEffect, useRef } from 'preact/hooks';

interface SearchProps {
  docs: Array<{
    slug: string;
    title: string;
    description?: string;
  }>;
}

export default function Search({ docs }: SearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<typeof docs>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = docs
      .filter(doc => {
        const titleMatch = doc.title.toLowerCase().includes(lowerQuery);
        const slugMatch = doc.slug.toLowerCase().includes(lowerQuery);
        const descMatch = doc.description?.toLowerCase().includes(lowerQuery);
        return titleMatch || slugMatch || descMatch;
      })
      .slice(0, 8);

    setResults(filtered);
    setIsOpen(true);
  }, [query, docs]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('wiki-search-input')?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div class="relative" ref={searchRef}>
      <label htmlFor="wiki-search-input" class="sr-only">Search wiki documentation</label>
      <div class="relative group" role="combobox" aria-expanded={isOpen} aria-controls="search-results" aria-haspopup="listbox">
        <input
          id="wiki-search-input"
          type="text"
          value={query}
          onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
          placeholder="Search wiki... (Ctrl+K)"
          class="w-full px-4 py-3 pl-11 pr-20 bg-surface-hover border-2 border-border rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all hover:border-primary/30"
          aria-label="Search wiki documentation"
          aria-autocomplete="list"
        />
        <svg
          class="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <kbd class="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-surface-800 border border-border rounded text-xs text-slate-400 font-mono hidden sm:inline-block">
          Ctrl+K
        </kbd>
      </div>

      {/* Results dropdown with glassmorphism */}
      {isOpen && results.length > 0 && (
        <div
          id="search-results"
          role="listbox"
          class="absolute z-50 w-full mt-2 bg-surface-hover/95 backdrop-blur-lg border border-border rounded-xl shadow-2xl overflow-hidden"
        >
          <div class="p-2">
            {results.map((doc, index) => (
              <a
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                class="group flex items-start gap-3 px-3 py-3 hover:bg-primary/10 transition-colors rounded-lg border-b border-border/50 last:border-b-0"
                role="option"
                aria-selected={index === 0}
                onClick={() => setIsOpen(false)}
              >
                <div class="flex-shrink-0 w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                  {index + 1}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium text-white group-hover:text-primary transition-colors truncate">
                    {doc.title}
                  </div>
                  <div class="text-xs text-slate-400 mt-1 font-mono truncate">{doc.slug}</div>
                </div>
                <svg class="w-4 h-4 text-slate-600 group-hover:text-primary transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div
          class="absolute z-50 w-full mt-2 bg-surface-hover/95 backdrop-blur-lg border border-border rounded-xl shadow-2xl p-6"
        >
          <div class="text-center">
            <svg class="w-12 h-12 text-slate-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm text-slate-400">No results found for <span class="text-white font-medium">"{query}"</span></p>
            <p class="text-xs text-slate-500 mt-2">Try a different search term</p>
          </div>
        </div>
      )}
    </div>
  );
}
