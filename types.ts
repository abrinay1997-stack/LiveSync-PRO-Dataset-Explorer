export type ConceptType = 'Fórmula' | 'Definición' | 'Constante' | 'Hallazgo';

/**
 * Procedencia de un concepto. Debe identificar SIEMPRE al autor real del
 * material (norma, paper, manual de fabricante...). Nunca atribuir a
 * LiveSync Pro material de terceros.
 */
export interface Fuente {
  /** Título del documento original (norma, paper, manual, libro). */
  documento: string;
  año: number;
  /** Autores u organismo emisor reales (p. ej. "ISO/TC 43", "AFMG", "Moulin & Corteel (L-Acoustics)"). */
  autor?: string;
  /** Sección/capítulo del documento (p. ej. "Section 13.4", "Annex B"). */
  seccion?: string;
  /** URL pública del documento, si se conoce. */
  url?: string;
  /** DOI, si se conoce. */
  doi?: string;
}

export interface Concept {
  id_concepto: string;
  categoria: string;
  tipo: ConceptType;
  titulo: string;
  fuente: Fuente;
  contenido_tecnico: {
    definicion_detallada: string;
    formula_latex: string;
    /** Versión en texto plano de la fórmula. Si falta, se genera desde formula_latex. */
    formula_texto?: string;
    variables: Record<string, string>;
    restricciones: string;
    /** Ejemplo resuelto, verificado numéricamente (ver CLAUDE.md). */
    ejemplo?: string;
  };
  meta_tags: string[];
  version_dataset: string;
  /**
   * true solo si la fórmula/valor se contrastó con la referencia citada y el
   * ejemplo se verificó numéricamente. Por defecto se considera no verificado.
   */
  verificado?: boolean;
  /** Advertencias pendientes de verificación (p. ej. "verificar: ..."). */
  nota_verificacion?: string;
}

export interface DatasetStats {
  total: number;
  porTipo: Record<ConceptType, number>;
  porFuente: Record<string, number>;
}
