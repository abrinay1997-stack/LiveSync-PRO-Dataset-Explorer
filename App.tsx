
import React, { useState, useEffect, useMemo } from 'react';
import { acousticDataset, getDatasetStats } from './data';
import { Concept, ConceptType } from './types';
import { Search, Filter, Database, Info, Activity, Menu, X } from 'lucide-react';

const MathRenderer: React.FC<{ tex: string }> = ({ tex }) => {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    const renderMath = () => {
      if ((window as any).katex) {
        try {
          const cleanTex = tex.replace(/\$\$/g, '').trim();
          const rendered = (window as any).katex.renderToString(cleanTex, {
            throwOnError: false,
            displayMode: true,
            strict: false
          });
          setHtml(rendered);
        } catch (err) {
          setHtml(`<span class="text-red-500 text-xs italic">Error en sintaxis matemática</span>`);
        }
      } else {
        setTimeout(renderMath, 100);
      }
    };
    renderMath();
  }, [tex]);

  if (!html) return <div className="h-16 flex items-center justify-center text-slate-800 animate-pulse">...</div>;
  return <div className="my-2 overflow-x-auto" dangerouslySetInnerHTML={{ __html: html }} />;
};

const ReadingProgress = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const mainArea = document.getElementById('main-content');
    if (!mainArea) return;

    const handleScroll = () => {
      const scrollHeight = mainArea.scrollHeight - mainArea.clientHeight;
      const progress = (mainArea.scrollTop / scrollHeight) * 100;
      setWidth(progress);
    };

    mainArea.addEventListener('scroll', handleScroll);
    return () => mainArea.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-[110]">
      <div 
        className="h-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-purple-500 transition-all duration-150 shadow-[0_0_10px_#06b6d4]"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

const ConceptCard: React.FC<{ concept: Concept; index: number }> = ({ concept, index }) => {
  const colorMap: Record<ConceptType, string> = {
    'Fórmula': 'text-cyan-400 border-cyan-400/20',
    'Definición': 'text-emerald-400 border-emerald-400/20',
    'Constante': 'text-amber-400 border-amber-400/20',
    'Hallazgo': 'text-purple-400 border-purple-400/20'
  };

  return (
    <div 
      className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group flex flex-col h-full animate-slide-up"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="absolute top-0 left-0 w-full h-0.5 bg-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:bg-cyan-400 transition-colors"></div>
      
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-1">
            Component ID: {concept.id_concepto}
          </span>
          <div className="flex gap-2 items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">
              LSP-CORE v{concept.version_dataset}
            </span>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-3 py-1 rounded-full border bg-white/5 uppercase tracking-widest ${colorMap[concept.tipo]}`}>
          {concept.tipo}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
        {concept.titulo}
      </h3>
      <p className="text-[11px] text-slate-500 font-medium uppercase tracking-[0.1em] mb-6">
        {concept.fuente.documento} • {concept.fuente.año}
      </p>
      
      <div className="flex-1">
        <div className="text-slate-400 text-sm leading-[1.7] mb-6">
          {concept.contenido_tecnico.definicion_detallada.split(' ').map((word, i) => (
            <span key={i} className={i % 8 === 0 ? "border-b border-dotted border-cyan-500/40 cursor-help" : ""}>
              {word}{' '}
            </span>
          ))}
        </div>
        <MathRenderer tex={concept.contenido_tecnico.formula_latex} />
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-6">
        <div>
          <span className="block text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">Technical Params</span>
          <div className="flex flex-wrap gap-1.5">
            {Object.keys(concept.contenido_tecnico.variables).map(v => (
              <code key={v} className="text-[10px] font-mono text-cyan-400 bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/10">
                {v}
              </code>
            ))}
          </div>
        </div>
        <div className="text-right">
          <span className="block text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">Category</span>
          <span className="text-xs text-slate-300 font-semibold">{concept.categoria}</span>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('Todos');
  const [sourceFilter, setSourceFilter] = useState<string>('Todas');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const stats = useMemo(() => getDatasetStats(), []);
  const sources = useMemo(() => Array.from(new Set(acousticDataset.map(d => d.fuente.documento))), []);

  const filtered = useMemo(() => {
    return acousticDataset.filter(c => {
      const matchesQuery = c.titulo.toLowerCase().includes(query.toLowerCase()) || 
                           c.id_concepto.toLowerCase().includes(query.toLowerCase()) ||
                           c.meta_tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
      const matchesType = typeFilter === 'Todos' || c.tipo === typeFilter;
      const matchesSource = sourceFilter === 'Todas' || c.fuente.documento === sourceFilter;
      return matchesQuery && matchesType && matchesSource;
    });
  }, [query, typeFilter, sourceFilter]);

  const handleSourceSelect = (s: string) => {
    setSourceFilter(s);
    setIsSidebarOpen(false); // Cierra el menú en móviles tras seleccionar
  };

  return (
    <div className="flex h-screen bg-[#050505] text-slate-400 font-sans relative overflow-hidden">
      <ReadingProgress />

      {/* Backdrop for Mobile Sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation - Shared for Desktop and Mobile */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 w-80 bg-[#080808] border-r border-white/5 flex flex-col z-[105] 
        transition-transform duration-500 ease-in-out lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-10 flex-1 overflow-y-auto custom-scrollbar">
          {/* Close Button for Mobile */}
          <button 
            className="lg:hidden absolute top-6 right-6 text-slate-500 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Logo Branding */}
          <div className="flex flex-col items-center mb-16">
            <div className="relative w-16 h-16 mb-6 group cursor-pointer">
              <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img 
                src="https://hostedimages-cdn.aweber-static.com/MjM0MTQ0NQ==/optimized/20657f92efa544489526caee3beef9d2.png" 
                alt="LiveSync Pro Logo" 
                className="relative w-full h-full object-contain opacity-90"
              />
            </div>
            <h1 className="text-xl font-bold tracking-[0.25em] uppercase">
              <span className="text-white">LIVESYNC</span> <span className="gradient-text">PRO</span>
            </h1>
            <p className="text-[#666] text-[9px] uppercase tracking-[0.3em] mt-2 font-bold text-center">
              System Engineering Suite
            </p>
          </div>

          <nav className="space-y-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Database className="w-3 h-3 text-cyan-500" />
                <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Library Modules</h2>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => handleSourceSelect('Todas')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all border ${
                    sourceFilter === 'Todas' 
                      ? 'bg-white/5 border-white/10 text-white border-l-2 border-l-cyan-500' 
                      : 'border-transparent text-slate-500 hover:text-slate-300'
                  }`}
                >
                  ALL KNOWLEDGE BASE
                </button>
                {sources.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSourceSelect(s)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all border ${
                      sourceFilter === s 
                        ? 'bg-white/5 border-white/10 text-white border-l-2 border-l-cyan-500' 
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6">
                <Info className="w-3 h-3 text-purple-500" />
                <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Metrics</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-[#0f0f0f] border border-white/5 p-5 rounded-2xl">
                  <div className="text-white font-bold text-2xl mb-1 tracking-tighter">{stats.total}</div>
                  <div className="text-[9px] uppercase tracking-widest text-slate-500">Core Concepts</div>
                </div>
                <div className="bg-[#0f0f0f] border border-white/5 p-5 rounded-2xl">
                  <div className="text-cyan-500 font-bold text-2xl mb-1 tracking-tighter">{stats.porTipo['Fórmula'] || 0}</div>
                  <div className="text-[9px] uppercase tracking-widest text-slate-500">Analytic Formulas</div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        
        <div className="p-8 border-t border-white/5">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
             <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Core Database Online</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 overflow-y-auto relative bg-[#050505]">
        {/* Sticky Glass Header */}
        <header className="sticky top-0 z-50 glass border-b border-white/5 px-6 md:px-8 lg:px-16 py-6 md:py-8">
          <div className="max-w-6xl mx-auto flex flex-col gap-6">
            
            {/* Mobile Brand Section */}
            <div className="flex items-center justify-between lg:hidden">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 group">
                    <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-30"></div>
                    <img 
                      src="https://hostedimages-cdn.aweber-static.com/MjM0MTQ0NQ==/optimized/20657f92efa544489526caee3beef9d2.png" 
                      alt="LiveSync Pro Logo" 
                      className="relative w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-[12px] font-black tracking-[0.2em] uppercase leading-none">
                      <span className="text-white">LIVESYNC</span> <span className="gradient-text">PRO</span>
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[7px] font-black text-slate-700 uppercase tracking-widest">LSP-DATA v1.2.4</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between">
              <div className="relative w-full md:w-2/3 group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500/50 group-focus-within:text-cyan-400 transition-colors">
                  <Search className="w-5 h-5" />
                </div>
                <input 
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm text-white placeholder-slate-600 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all shadow-2xl"
                  placeholder="Search technical terms, ID or parameters..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <select 
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl pl-10 pr-10 py-4 text-xs font-bold text-white uppercase tracking-widest outline-none focus:border-cyan-500/50 appearance-none cursor-pointer"
                    value={typeFilter}
                    onChange={e => setTypeFilter(e.target.value)}
                  >
                    {['Todos', 'Fórmula', 'Definición', 'Constante', 'Hallazgo'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Grid */}
        <div className="px-6 md:px-8 lg:px-16 py-8 md:py-16 max-w-6xl mx-auto min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {filtered.map((concept, idx) => (
              <ConceptCard key={concept.id_concepto} concept={concept} index={idx} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-24 md:py-48 text-center border border-dashed border-white/10 rounded-[2rem] md:rounded-[3rem] animate-fade-in bg-white/[0.01]">
              <div className="text-cyan-500/10 mb-8 flex justify-center">
                <Activity className="w-16 md:w-24 h-16 md:h-24" strokeWidth={0.5} />
              </div>
              <p className="text-slate-600 text-lg md:text-xl font-medium tracking-tight mb-6 px-4">No matching telemetry found in the database.</p>
              <button 
                onClick={() => {setQuery(''); setTypeFilter('Todos'); setSourceFilter('Todas');}}
                className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-200 transition-all shadow-2xl"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        <footer className="px-8 lg:px-16 py-12 md:py-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.25em] text-slate-700 gap-8">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
            LIVESYNC PRO ARCHITECTURE
          </div>
          <div className="text-center md:text-right space-y-2">
            <p className="font-black text-slate-500">Predictive Acoustic Explorer v1.2.4</p>
            <p className="text-slate-800">Modular Data & Asset Intelligence Layer</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
