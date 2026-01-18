
export type ConceptType = 'Fórmula' | 'Definición' | 'Constante' | 'Hallazgo';

export interface Concept {
  id_concepto: string;
  categoria: string;
  tipo: ConceptType;
  titulo: string;
  fuente: {
    documento: string;
    año: number;
    autor?: string;
  };
  contenido_tecnico: {
    definicion_detallada: string;
    formula_latex: string;
    variables: Record<string, string>;
    restricciones: string;
  };
  meta_tags: string[];
  version_dataset: string;
}

export interface DatasetStats {
  total: number;
  porTipo: Record<ConceptType, number>;
  porFuente: Record<string, number>;
}
