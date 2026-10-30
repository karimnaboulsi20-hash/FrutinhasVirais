import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateDiscountPercentage,
  formatBRL,
  VIRAL_ACCOUNTS,
  MOTIVE_ITEMS,
  TESTIMONIALS,
  FAQ_ITEMS,
  CHECKOUT_URL
} from './salesData';

test('calculateDiscountPercentage calculates correct savings', () => {
  // Original 176.93 to 19.90
  const discount1 = calculateDiscountPercentage(176.93, 19.90);
  assert.equal(discount1, 89);

  // Original 197.00 to 19.90
  const discount2 = calculateDiscountPercentage(197.00, 19.90);
  assert.equal(discount2, 90);

  // Edge cases
  assert.equal(calculateDiscountPercentage(0, 19.90), 0);
  assert.equal(calculateDiscountPercentage(100, 100), 0);
});

test('formatBRL formats Brazilian currency correctly', () => {
  const formatted = formatBRL(19.90);
  assert.ok(formatted.includes('19,90'));
});

test('sales dataset integrity check', () => {
  assert.equal(VIRAL_ACCOUNTS.length, 2);
  assert.equal(MOTIVE_ITEMS.length, 10);
  assert.equal(TESTIMONIALS.length, 3);
  assert.equal(FAQ_ITEMS.length, 4);
  assert.ok(CHECKOUT_URL.startsWith('https://pay.kirvano.com/'));
});
