
import React, { useState, useEffect, useMemo } from 'react';
import { acousticDataset, getDatasetStats } from './data';
import { Concept, ConceptType } from './types';

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
          setHtml(`<span class="text-red-500 text-xs">Error LaTeX</span>`);
        }
      } else {
        setTimeout(renderMath, 100);
      }
    };
    renderMath();
  }, [tex]);

  if (!html) return <div className="h-12 flex items-center justify-center text-slate-800">...</div>;
  return <div className="my-6 py-4 overflow-x-auto font-mono text-lg border-y border-white/5" dangerouslySetInnerHTML={{ __html: html }} />;
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
    <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-[100]">
      <div 
        className="h-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-purple-500 transition-all duration-150"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

const ConceptCard: React.FC<{ concept: Concept; index: number }> = ({ concept, index }) => {
  return (
    <div 
      className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300 group flex flex-col h-full animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
            ID: {concept.id_concepto}
          </span>
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]"></div>
            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em]">
              v{concept.version_dataset}
            </span>
          </div>
        </div>
        <span className="text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white uppercase tracking-widest">
          {concept.tipo}
        </span>
      </div>
      
      <h3 className="text-2xl font-black text-white mb-2 tracking-tighter leading-tight group-hover:text-cyan-400 transition-colors">
        {concept.titulo}
      </h3>
      <p className="text-[11px] text-purple-400 font-bold uppercase tracking-widest mb-6 opacity-70">
        {concept.fuente.documento} • {concept.fuente.año}
      </p>
      
      <div className="flex-1">
        <p className="text-slate-400 text-base mb-6 leading-relaxed">
          {concept.contenido_tecnico.definicion_detallada.split(' ').map((word, i) => (
            <span key={i} className={i % 7 === 0 ? "border-b border-dotted border-cyan-500/40 cursor-help" : ""}>
              {word}{' '}
            </span>
          ))}
        </p>
        <MathRenderer tex={concept.contenido_tecnico.formula_latex} />
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
        <div>
          <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Variables</span>
          <div className="flex flex-wrap gap-1">
            {Object.keys(concept.contenido_tecnico.variables).map(v => (
              <code key={v} className="text-[10px] font-mono text-cyan-400 bg-cyan-500/5 px-1.5 py-0.5 rounded border border-cyan-500/10">
                {v}
              </code>
            ))}
          </div>
        </div>
        <div className="text-right">
          <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Categoría</span>
          <span className="text-[11px] text-white font-medium">{concept.categoria}</span>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('Todos');
  const [sourceFilter, setSourceFilter] = useState<string>('Todas');
  
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

  return (
    <div className="flex h-screen bg-[#050505] text-slate-400">
      <ReadingProgress />

      {/* Sidebar Navigation */}
      <aside className="w-80 bg-[#080808] border-r border-white/5 flex flex-col hidden md:flex overflow-y-auto">
        <div className="p-8 pb-12">
          <div className="relative mb-12">
            <div className="absolute -inset-4 bg-cyan-500/10 blur-2xl rounded-full"></div>
            <h1 className="relative text-xl font-black text-white tracking-[0.3em] uppercase">
              LiveSync <span className="text-cyan-500">PRO</span>
            </h1>
            <p className="text-[9px] font-bold text-slate-600 tracking-[0.2em] uppercase mt-2">
              Engineering Dataset v1.2
            </p>
          </div>

          <nav className="space-y-12">
            <div>
              <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Módulos de Sistema</h2>
              <div className="space-y-3">
                {sources.map(s => (
                  <button
                    key={s}
                    onClick={() => setSourceFilter(s === sourceFilter ? 'Todas' : s)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-xs transition-all border ${
                      sourceFilter === s 
                        ? 'bg-white/5 border-white/10 text-white border-l-2 border-l-cyan-500' 
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Métricas de Estado</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0f0f0f] border border-white/5 p-4 rounded-xl">
                  <div className="text-white font-black text-xl">{stats.total}</div>
                  <div className="text-[8px] uppercase tracking-tighter">Conceptos</div>
                </div>
                <div className="bg-[#0f0f0f] border border-white/5 p-4 rounded-xl">
                  <div className="text-cyan-500 font-black text-xl">{stats.porTipo['Fórmula'] || 0}</div>
                  <div className="text-[8px] uppercase tracking-tighter text-slate-500">Fórmulas</div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 overflow-y-auto relative bg-[#050505]">
        {/* Sticky Backdrop-Blur Header */}
        <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 px-8 md:px-12 py-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-2/3">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500/50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl pl-12 pr-6 py-3 text-sm text-white placeholder-slate-600 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all"
                placeholder="Explorar por término técnico, ID o parámetro..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <select 
                className="flex-1 md:flex-none bg-[#0f0f0f] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-cyan-500/50"
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
              >
                {['Todos', 'Fórmula', 'Definición', 'Constante', 'Hallazgo'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </header>

        {/* Grid Content */}
        <div className="px-8 md:px-12 py-12 max-w-6xl mx-auto min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filtered.map((concept, idx) => (
              <ConceptCard key={concept.id_concepto} concept={concept} index={idx} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-40 text-center border border-dashed border-white/10 rounded-3xl animate-fade-in">
              <div className="text-cyan-500/20 mb-4 flex justify-center">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <p className="text-slate-600 text-lg font-medium tracking-tight">Sin resultados para la consulta actual.</p>
              <button 
                onClick={() => {setQuery(''); setTypeFilter('Todos'); setSourceFilter('Todas');}}
                className="mt-4 text-cyan-500 text-xs font-black uppercase tracking-widest hover:text-white transition-colors"
              >
                Resetear Filtros
              </button>
            </div>
          )}
        </div>

        <footer className="px-12 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.2em] text-slate-600 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-green-500"></span>
            LIVESYNC KNOWLEDGE CORE
          </div>
          <div className="text-center md:text-right space-y-1">
            <p>Predictive Acoustic Explorer v1.2</p>
            <p className="text-slate-800">© 2024 Modular Data Architecture</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
