#!/usr/bin/env node

/**
 * Validate all deck.json files in the decks/ directory
 * Checks for common errors and warnings
 */

import { readdir, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');
const DECKS_DIR = join(ROOT_DIR, 'decks');

/**
 * Validate a single deck
 */
async function validateDeck(deckName) {
  const deckPath = join(DECKS_DIR, deckName, 'deck.json');
  const errors = [];
  const warnings = [];
  
  try {
    const content = await readFile(deckPath, 'utf-8');
    const deck = JSON.parse(content);
    
    // Required fields
    if (!deck.id) errors.push('Missing required field: id');
    if (!deck.name) errors.push('Missing required field: name');
    if (!deck.cards) errors.push('Missing required field: cards');
    if (!Array.isArray(deck.cards)) errors.push('cards must be an array');
    if (typeof deck.cardCount !== 'number') errors.push('Missing required field: cardCount');
    if (typeof deck.supportsReversals !== 'boolean') errors.push('Missing required field: supportsReversals');
    if (typeof deck.isBuiltIn !== 'boolean') errors.push('Missing required field: isBuiltIn');
    
    if (deck.cards && Array.isArray(deck.cards)) {
      // Card count validation
      if (deck.cardCount !== deck.cards.length) {
        errors.push(`cardCount (${deck.cardCount}) doesn't match actual cards (${deck.cards.length})`);
      }
      
      // Index validation
      const indices = new Set();
      deck.cards.forEach((card, i) => {
        if (typeof card.index !== 'number') {
          errors.push(`Card ${i}: missing index field`);
        } else {
          if (indices.has(card.index)) {
            errors.push(`Duplicate card index: ${card.index}`);
          }
          indices.add(card.index);
          
          if (card.index !== i) {
            warnings.push(`Card ${i}: index ${card.index} doesn't match position (expected ${i})`);
          }
        }
        
        // Name validation
        if (!card.name) {
          errors.push(`Card ${i}: missing name field`);
        }
      });
      
      // Duplicate names (warning only)
      const names = new Map();
      deck.cards.forEach(card => {
        if (card.name) {
          const count = names.get(card.name) || 0;
          names.set(card.name, count + 1);
        }
      });
      names.forEach((count, name) => {
        if (count > 1) {
          warnings.push(`Duplicate card name "${name}" appears ${count} times`);
        }
      });
    }
    
    return { errors, warnings };
    
  } catch (error) {
    return { 
      errors: [`Failed to parse deck.json: ${error.message}`],
      warnings: []
    };
  }
}

/**
 * Main validation function
 */
async function validateAll() {
  console.log('Validating all decks...\n');
  
  const entries = await readdir(DECKS_DIR, { withFileTypes: true });
  const deckDirs = entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
  
  let hasErrors = false;
  
  for (const deckName of deckDirs) {
    const { errors, warnings } = await validateDeck(deckName);
    
    if (errors.length === 0 && warnings.length === 0) {
      console.log(`✓ ${deckName}`);
    } else {
      if (errors.length > 0) {
        hasErrors = true;
        console.log(`✗ ${deckName}:`);
        errors.forEach(err => console.log(`  ERROR: ${err}`));
      } else {
        console.log(`⚠ ${deckName}:`);
      }
      warnings.forEach(warn => console.log(`  WARNING: ${warn}`));
    }
  }
  
  console.log();
  
  if (hasErrors) {
    console.error('Validation failed with errors');
    process.exit(1);
  } else {
    console.log(`✓ All ${deckDirs.length} deck(s) valid`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  validateAll().catch(error => {
    console.error('Validation failed:', error);
    process.exit(1);
  });
}

export { validateAll };
