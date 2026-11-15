import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../growth/question-bank/items');
const states = new Set(['draft', 'review', 'approved', 'published', 'withdrawn']);
const sourceClasses = new Set(['official', 'original', 'memory-based', 'unknown']);
const rightsStates = new Set(['original', 'licensed']);

export function validateQuestion(item) {
  const errors = [];
  if (!item || typeof item !== 'object' || Array.isArray(item)) return ['record must be a JSON object'];
  const allowed = new Set(['exam', 'year', 'topic', 'difficulty', 'question_type', 'source_class', 'source_url', 'license_status', 'question', 'answer', 'explanation', 'answer_uncertain', 'reviewed_by', 'reviewed_at', 'media_alt', 'media_assets', 'publish_state']);
  for (const key of Object.keys(item)) if (!allowed.has(key)) errors.push(`unexpected field: ${key}`);
  for (const key of ['exam', 'topic', 'question_type']) if (typeof item[key] !== 'string' || !item[key].trim()) errors.push(`${key} must be a non-empty string`);
  if (!(item.year === null || (Number.isInteger(item.year) && item.year >= 2000 && item.year <= 2100))) errors.push('year must be null or an integer from 2000 to 2100');
  if (!['easy', 'medium', 'hard', 'unknown'].includes(item.difficulty)) errors.push('difficulty is invalid');
  if (!sourceClasses.has(item.source_class)) errors.push('source_class is invalid');
  if (!['pending', 'original', 'licensed', 'not-cleared'].includes(item.license_status)) errors.push('license_status is invalid');
  if (!states.has(item.publish_state)) errors.push('publish_state is invalid');
  if (item.source_url != null && (typeof item.source_url !== 'string' || !/^https:\/\//i.test(item.source_url))) errors.push('source_url must be an HTTPS URL or null');
  if (!Array.isArray(item.media_assets ?? [])) errors.push('media_assets must be an array');
  for (const asset of item.media_assets ?? []) {
    if (!asset || typeof asset !== 'object' || Object.keys(asset).some(k => !['path', 'rights'].includes(k))) errors.push('each media asset must contain only path and rights');
    else {
      if (typeof asset.path !== 'string' || !asset.path.trim()) errors.push('media asset path is required');
      if (!rightsStates.has(asset.rights)) errors.push('media asset rights must be original or licensed');
    }
  }
  if ((item.media_assets?.length ?? 0) > 0 && (typeof item.media_alt !== 'string' || !item.media_alt.trim())) errors.push('media_alt is required when media assets are attached');
  if (item.answer_uncertain != null && typeof item.answer_uncertain !== 'boolean') errors.push('answer_uncertain must be boolean or null');

  if (['approved', 'published'].includes(item.publish_state)) {
    for (const key of ['question', 'answer', 'explanation', 'reviewed_by']) if (typeof item[key] !== 'string' || !item[key].trim()) errors.push(`${key} is required before approval/publication`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.reviewed_at ?? '') || Number.isNaN(Date.parse(`${item.reviewed_at}T00:00:00Z`))) errors.push('reviewed_at must be an ISO date');
    if (!item.source_url) errors.push('source_url is required before approval/publication');
    if (!['original', 'licensed'].includes(item.license_status)) errors.push('rights must be original or licensed before approval/publication');
    if (['official', 'memory-based'].includes(item.source_class) && !item.source_url) errors.push(`${item.source_class} items require a source URL`);
    if (item.source_class === 'memory-based' && item.answer_uncertain !== true) errors.push('memory-based answers must be explicitly marked uncertain');
  }
  return errors;
}

async function main() {
  const files = (await readdir(root)).filter(file => file.endsWith('.json')).sort();
  let failed = false;
  for (const file of files) {
    let item;
    try { item = JSON.parse(await readFile(path.join(root, file), 'utf8')); }
    catch (error) { console.error(`${file}: invalid JSON (${error.message})`); failed = true; continue; }
    const errors = validateQuestion(item);
    if (errors.length) {
      console.error(`${file}:\n  ${errors.join('\n  ')}`);
      failed = true;
    }
  }
  if (failed) process.exitCode = 1;
  else console.log(`Question bank check passed (${files.length} records).`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
