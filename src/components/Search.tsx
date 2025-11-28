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
      <label for="wiki-search-input" class="sr-only">Search wiki documentation</label>
      <div class="relative">
        <input
          id="wiki-search-input"
          type="text"
          value={query}
          onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
          placeholder="Search wiki..."
          class="w-full px-4 py-2.5 pl-10 bg-[#1e232f] border border-[#292e3b] rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          aria-label="Search wiki documentation"
          aria-expanded={isOpen}
          aria-controls="search-results"
        />
        <svg
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
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
      </div>

      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        <div
          id="search-results"
          role="listbox"
          class="absolute z-50 w-full mt-2 bg-[#1e232f] border border-[#292e3b] rounded-lg shadow-xl overflow-hidden"
        >
          {results.map((doc) => (
            <a
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              class="block px-4 py-3 hover:bg-indigo-500/10 transition-colors border-b border-[#292e3b] last:border-b-0"
              role="option"
              onClick={() => setIsOpen(false)}
            >
              <div class="text-sm font-medium text-white">{doc.title}</div>
              <div class="text-xs text-slate-400 mt-1 font-mono">{doc.slug}</div>
            </a>
          ))}
        </div>
      )}

      {/* No results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div
          class="absolute z-50 w-full mt-2 bg-[#1e232f] border border-[#292e3b] rounded-lg shadow-xl p-4"
        >
          <p class="text-sm text-slate-400 text-center">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
