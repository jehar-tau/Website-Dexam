import test from 'node:test';
import assert from 'node:assert/strict';
import { examData, guideCalendar } from '../data.js';

const byId = Object.fromEntries(examData.map((exam) => [exam.id, exam]));

test('all exam guides link directly to the current official authority', () => {
  assert.deepEqual(Object.keys(byId).sort(), ['ceed', 'nata', 'nid', 'nift', 'uceed']);
  for (const exam of examData) assert.match(exam.sourceUrl, /^https:\/\//, `${exam.name} official link`);
  for (const item of guideCalendar) assert.match(item.sourceUrl, /^https:\/\//, `${item.exam} calendar source`);
});

test('NID dates distinguish published dates from the unannounced Mains schedule', () => {
  assert.match(byId.nid.cycle2027, /30 Nov 2026/);
  assert.match(byId.nid.cycle2027, /20 Dec 2026/);
  assert.match(byId.nid.cycle2027, /Mains dates are to be announced/);
  assert.ok(guideCalendar.some((item) => item.exam === 'NID DAT' && item.stage === 'DAT Prelims result scheduled' && item.time === '16 Mar 2027'));
});

test('UCEED and CEED show closed registration and their official result dates', () => {
  assert.match(byId.uceed.cycle2027, /5 Nov 2026/);
  assert.match(byId.uceed.cycle2027, /10 Nov at 5 pm/);
  assert.match(byId.uceed.cycle2027, /6 Mar 2027/);
  assert.match(byId.ceed.cycle2027, /3 Mar 2027/);
});

test('NIFTEE extension dates are not confused with an exam date', () => {
  assert.match(byId.nift.cycle2027, /24 Nov 2026/);
  assert.match(byId.nift.cycle2027, /29 Nov/);
  assert.match(byId.nift.cycle2027, /30 Nov–2 Dec/);
  assert.match(byId.nift.cycle2027, /exam schedule is not stated/);
});

test('NATA calendar does not project the 2026 timetable onto 2027', () => {
  assert.match(byId.nata.cycle2027, /2027 application window and examination schedule have not been posted/);
  assert.ok(guideCalendar.some((item) => item.exam === 'NATA' && /Not announced/.test(item.time)));
});

test('planning calendar contains no July-era guessed dates', () => {
  const copy = [...examData.map((exam) => exam.cycle2027), ...guideCalendar.map((item) => `${item.stage} ${item.time}`)].join('\n');
  assert.doesNotMatch(copy, /expected Nov|Mar–Apr 2027|Apr – Jun 2027|Aug 2027|first week of March/);
});
