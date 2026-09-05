// src/data/index.ts
import { exp01 } from './exp-01';
import { exp02 } from './exp-02';
import { exp03 } from './exp-03';
import { exp04 } from './exp-04';
import { exp05 } from './exp-05';
import { exp06 } from './exp-06';
import { exp07 } from './exp-07';
import { exp08 } from './exp-08';
import { exp09 } from './exp-09';
import { exp10 } from './exp-10';

export const experimentDataMap: Record<string, any> = {
  '1': exp01,
  '2': exp02,
  '3': exp03,
  '4': exp04,
  '5': exp05,
  '6': exp06,
  '7': exp07,
  '8': exp08,
  '9': exp09,
  '10': exp10,
};

import { normalizeExpId } from './experiments';

export function getExperimentContent(id: string | number) {
  const normalized = normalizeExpId(id);
  return experimentDataMap[normalized] || null;
}

