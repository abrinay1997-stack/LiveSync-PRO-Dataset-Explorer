
import { Concept, DatasetStats } from './types';
import { physicsData } from './data_physics';
import { psychoData } from './data_psychoacoustics';
import { cableData } from './data_cables';
import { lisaData } from './data_lisa';
import { audienceData } from './data_audience';
import { measurementData } from './data_measurement';
import { hfMeasurementData } from './data_hf_measurement';
import { optimumLocationsData } from './data_optimum_locations';
import { spatialFillsData } from './data_spatial_fills';
import { combFilteringData } from './data_comb_filtering';
import { distributedFillsData } from './data_distributed_fills';
import { networkingData } from './data_networking';

// Agregación de todos los módulos
export const acousticDataset: Concept[] = [
  ...physicsData,
  ...psychoData,
  ...cableData,
  ...lisaData,
  ...audienceData,
  ...measurementData,
  ...hfMeasurementData,
  ...optimumLocationsData,
  ...spatialFillsData,
  ...combFilteringData,
  ...distributedFillsData,
  ...networkingData
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
