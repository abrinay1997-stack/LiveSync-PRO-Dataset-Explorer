
import { Concept, DatasetStats } from './types';
import { physicsData } from './data_physics';
import { psychoData } from './data_psychoacoustics';
import { cableData } from './data_cables';

// Agregación de todos los módulos
export const acousticDataset: Concept[] = [
  ...physicsData,
  ...psychoData,
  ...cableData
];

// Cálculo de estadísticas para validación de integridad
export const getDatasetStats = (): DatasetStats => {
  const stats: DatasetStats = {
    total: acousticDataset.length,
    porTipo: { 'Fórmula': 0, 'Definición': 0, 'Constante': 0, 'Hallazgo': 0 },
    porFuente: {}
  };

  acousticDataset.forEach(c => {
    stats.porTipo[c.tipo]++;
    const doc = c.fuente.documento;
    stats.porFuente[doc] = (stats.porFuente[doc] || 0) + 1;
  });

  return stats;
};
