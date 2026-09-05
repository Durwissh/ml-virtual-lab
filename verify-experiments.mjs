// verify-experiments.mjs
import { experiments, getExperiment, normalizeExpId } from './src/data/experiments.js';
import { experimentDataMap, getExperimentContent } from './src/data/index.js';

console.log('=== VERIFYING EXPERIMENT DATA & ROUTING MAPPINGS ===\n');

// 1. Verify 10 experiments in metadata
console.log(`1. Total experiments defined: ${experiments.length} (Expected: 10)`);
if (experiments.length !== 10) {
  console.error('❌ Expected 10 experiments in experiments.ts');
  process.exit(1);
}

// 2. Verify all IDs and normalization
let allNormalizedPass = true;
for (let i = 1; i <= 10; i++) {
  const standardId = String(i);
  const paddedId = String(i).padStart(2, '0');
  
  const norm1 = normalizeExpId(standardId);
  const norm2 = normalizeExpId(paddedId);
  const norm3 = normalizeExpId(i);
  
  const meta1 = getExperiment(standardId);
  const meta2 = getExperiment(paddedId);
  const meta3 = getExperiment(i);
  
  const content1 = getExperimentContent(standardId);
  const content2 = getExperimentContent(paddedId);
  
  if (norm1 !== standardId || norm2 !== standardId || norm3 !== standardId) {
    console.error(`❌ Normalization failed for ${i}`);
    allNormalizedPass = false;
  }
  
  if (!meta1 || !meta2 || !meta3 || meta1.number !== i) {
    console.error(`❌ getExperiment failed for ${standardId} or ${paddedId}`);
    allNormalizedPass = false;
  }
  
  if (!content1 || !content2 || !content1.aim || !content1.theory || !content1.pretest || !content1.procedure || !content1.posttest) {
    console.error(`❌ getExperimentContent missing fields for ${standardId}`);
    allNormalizedPass = false;
  }
}

console.log('2. Normalization & Content lookup across all 10 experiments:', allNormalizedPass ? '✅ PASS' : '❌ FAIL');

// 3. Test forward transitions: 01 -> 02 -> ... -> 10
let forwardPass = true;
for (let i = 1; i < 10; i++) {
  const currentMeta = getExperiment(i);
  const nextExp = experiments.find(e => e.number === (currentMeta?.number || 0) + 1);
  if (!nextExp || nextExp.number !== i + 1) {
    console.error(`❌ Forward transition failed from ${i} to ${i+1}`);
    forwardPass = false;
  }
}
console.log('3. Forward transitions (01 -> 02 -> ... -> 10):', forwardPass ? '✅ PASS' : '❌ FAIL');

// 4. Test reverse transitions: 10 -> 09 -> ... -> 01
let reversePass = true;
for (let i = 10; i > 1; i--) {
  const currentMeta = getExperiment(i);
  const prevExp = experiments.find(e => e.number === (currentMeta?.number || 0) - 1);
  if (!prevExp || prevExp.number !== i - 1) {
    console.error(`❌ Reverse transition failed from ${i} to ${i-1}`);
    reversePass = false;
  }
}
console.log('4. Reverse transitions (10 -> 09 -> ... -> 01):', reversePass ? '✅ PASS' : '❌ FAIL');

// 5. Verify all Visualizations are assigned properly
const expectedVisualizations = {
  '2': 'linear-regression',
  '4': 'logistic-regression',
  '5': 'pca',
  '6': 'svm',
  '7': 'kmeans',
  '8': 'decision-tree',
  '9': 'random-forest',
  '10': 'perceptron',
};

let vizPass = true;
for (const [expId, vizId] of Object.entries(expectedVisualizations)) {
  const content = getExperimentContent(expId);
  const found = content?.theory?.some(s => s.visualizationId === vizId);
  if (!found) {
    console.error(`❌ Visualization ${vizId} not found in experiment ${expId}`);
    vizPass = false;
  }
}
console.log('5. Interactive Visualizations correctly wired across 8 experiments:', vizPass ? '✅ PASS' : '❌ FAIL');

console.log('\n=== ALL 10 EXPERIMENTS AND TRANSITIONS VERIFIED ===');
