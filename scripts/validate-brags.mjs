import { readFileSync } from 'fs';

const raw = readFileSync('./src/data/brags.json', 'utf8');
let data;

try {
  data = JSON.parse(raw);
} catch (e) {
  console.error('brags.json is not valid JSON:', e.message);
  process.exit(1);
}

if (!Array.isArray(data)) {
  console.error('brags.json must be an array');
  process.exit(1);
}

const errors = [];

for (let i = 0; i < data.length; i++) {
  const entry = data[i];
  const p = `Entry [${i}] "${entry?.name ?? '?'}"`;

  if (!entry.name?.trim()) errors.push(`${p}: "name" is required`);
  if (!entry.brag_url?.trim()) {
    errors.push(`${p}: "brag_url" is required`);
  } else if (!entry.brag_url.startsWith('https://')) {
    errors.push(`${p}: "brag_url" must start with https://`);
  }
  if (!entry.description?.trim()) {
    errors.push(`${p}: "description" is required`);
  } else if (entry.description.length > 200) {
    errors.push(`${p}: "description" is ${entry.description.length} chars (max 200)`);
  }
}

if (errors.length > 0) {
  console.error('Validation failed:\n');
  errors.forEach((e) => console.error(`  ✗ ${e}`));
  process.exit(1);
}

console.log(`✓ All ${data.length} entries valid`);
