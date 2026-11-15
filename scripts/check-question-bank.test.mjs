import test from 'node:test';
import assert from 'node:assert/strict';
import { validateQuestion } from './check-question-bank.mjs';

const draft = { exam: 'sample', year: null, topic: 'sample topic', difficulty: 'unknown', question_type: 'editorial placeholder', source_class: 'unknown', source_url: null, license_status: 'pending', question: null, answer: null, explanation: null, answer_uncertain: null, reviewed_by: null, reviewed_at: null, media_alt: null, media_assets: [], publish_state: 'draft' };
const reviewed = { ...draft, exam: 'sample exam', topic: 'sample topic', question_type: 'sample type', source_class: 'original', source_url: null, license_status: 'original', question: 'synthetic question', answer: 'synthetic answer', explanation: 'synthetic explanation', reviewed_by: 'faculty reviewer', reviewed_at: '2026-11-15', publish_state: 'approved' };

test('allows an editorial draft without exam content', () => assert.deepEqual(validateQuestion(draft), []));
test('allows a cleared, faculty-reviewed original item', () => assert.deepEqual(validateQuestion(reviewed), []));
test('blocks approval without review, provenance, and cleared rights', () => {
  const errors = validateQuestion({ ...draft, publish_state: 'published' });
  assert.ok(errors.some(error => error.includes('reviewed_by')));
  assert.ok(errors.some(error => error.includes('rights')));
});
test('requires a traceable source for official material', () => {
  const item = { ...reviewed, source_class: 'official', source_url: null };
  assert.ok(validateQuestion(item).some(error => error.includes('official items require a source URL')));
});
test('requires uncertainty to be explicit for memory-based answers', () => {
  const item = { ...reviewed, source_class: 'memory-based', source_url: 'https://example.org/source', answer_uncertain: false };
  assert.ok(validateQuestion(item).some(error => error.includes('explicitly marked uncertain')));
});
test('requires accessible alternative text and cleared rights for attached media', () => {
  const item = { ...reviewed, media_assets: [{ path: 'art/diagram.svg', rights: 'pending' }] };
  const errors = validateQuestion(item);
  assert.ok(errors.some(error => error.includes('media_alt')));
  assert.ok(errors.some(error => error.includes('asset rights')));
});
test('rejects unexpected fields that could introduce personal data', () => assert.ok(validateQuestion({ ...draft, student_email: 'private@example.org' }).some(error => error.includes('unexpected field'))));
