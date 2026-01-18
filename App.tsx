
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

  if (!html) return <div className="h-12 flex items-center justify-center text-slate-700">...</div>;
  return <div className="my-4 py-2 overflow-x-auto" dangerouslySetInnerHTML={{ __html: html }} />;
};

const StatsBar: React.FC = () => {
  const stats = useMemo(() => getDatasetStats(), []);
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl text-center">
        <div className="text-2xl font-black text-white">{stats.total}</div>
        <div className="text-[10px] text-slate-500 uppercase tracking-widest">Total Conceptos</div>
      </div>
      {Object.entries(stats.porTipo).map(([tipo, count]) => (
        <div key={tipo} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl text-center">
          <div className="text-xl font-bold text-blue-400">{count}</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-widest">{tipo}s</div>
        </div>
      ))}
    </div>
  );
};

const ConceptCard: React.FC<{ concept: Concept }> = ({ concept }) => {
  const colorMap: Record<ConceptType, string> = {
    'Fórmula': 'border-blue-500/30 text-blue-400',
    'Definición': 'border-emerald-500/30 text-emerald-400',
    'Constante': 'border-amber-500/30 text-amber-400',
    'Hallazgo': 'border-purple-500/30 text-purple-400'
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-600 transition-all flex flex-col h-full">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
          {concept.id_concepto} • v{concept.version_dataset}
        </span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colorMap[concept.tipo] || ''}`}>
          {concept.tipo}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-white mb-1">{concept.titulo}</h3>
      <p className="text-xs text-blue-400/80 mb-4 italic">{concept.fuente.documento} ({concept.fuente.año})</p>
      
      <div className="flex-1">
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">{concept.contenido_tecnico.definicion_detallada}</p>
        <MathRenderer tex={concept.contenido_tecnico.formula_latex} />
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-2">
        <div className="text-[10px] text-slate-500">
          <span className="block font-bold text-slate-400 mb-1 tracking-widest uppercase">Variables</span>
          {Object.keys(concept.contenido_tecnico.variables).join(', ')}
        </div>
        <div className="text-[10px] text-slate-500">
          <span className="block font-bold text-slate-400 mb-1 tracking-widest uppercase">Categoría</span>
          {concept.categoria}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('Todos');
  const [sourceFilter, setSourceFilter] = useState<string>('Todas');

  const sources = useMemo(() => Array.from(new Set(acousticDataset.map(d => d.fuente.documento))), []);

  const filtered = useMemo(() => {
    return acousticDataset.filter(c => {
      const matchesQuery = c.titulo.toLowerCase().includes(query.toLowerCase()) || 
                           c.id_concepto.toLowerCase().includes(query.toLowerCase());
      const matchesType = typeFilter === 'Todos' || c.tipo === typeFilter;
      const matchesSource = sourceFilter === 'Todas' || c.fuente.documento === sourceFilter;
      return matchesQuery && matchesType && matchesSource;
    });
  }, [query, typeFilter, sourceFilter]);

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12 max-w-7xl mx-auto">
      <header className="mb-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tighter">
              LiveSync <span className="text-blue-500">PRO</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Knowledge Base Management System v1.2</p>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-xs text-slate-600 uppercase tracking-widest font-bold">Última actualización</div>
            <div className="text-slate-400 font-mono">2024.05.25.PRED</div>
          </div>
        </div>

        <StatsBar />

        <div className="flex flex-col md:flex-row gap-4">
          <input 
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Filtrar por término técnico, ID o concepto..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <select 
            className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-slate-400 outline-none focus:border-blue-500"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            {['Todos', 'Fórmula', 'Definición', 'Constante', 'Hallazgo'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select 
            className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-slate-400 outline-none focus:border-blue-500 max-w-xs"
            value={sourceFilter}
            onChange={e => setSourceFilter(e.target.value)}
          >
            <option value="Todas">Todas las fuentes</option>
            {sources.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(concept => (
          <ConceptCard key={concept.id_concepto} concept={concept} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center border border-dashed border-slate-800 rounded-2xl">
            <p className="text-slate-500">No se encontraron resultados para los filtros seleccionados.</p>
          </div>
        )}
      </main>

      <footer className="mt-20 py-12 border-t border-slate-900 flex justify-between items-center text-slate-600 text-[10px] uppercase tracking-widest">
        <span>Predictive Acoustic Explorer</span>
        <span>Integridad de datos garantizada por estructura modular</span>
        <span>© 2024</span>
      </footer>
    </div>
  );
}
