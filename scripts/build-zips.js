#!/usr/bin/env node

/**
 * Build ZIP files for all decks in the decks/ directory
 * Creates releases/*.zip files ready for GitHub releases
 */

import { readdir, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';
import { createWriteStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');
const DECKS_DIR = join(ROOT_DIR, 'decks');
const RELEASES_DIR = join(ROOT_DIR, 'releases');

/**
 * Create a ZIP file for a single deck
 */
async function zipDeck(deckName) {
  const deckPath = join(DECKS_DIR, deckName);
  const zipPath = join(RELEASES_DIR, `${deckName}.zip`);
  
  return new Promise((resolve, reject) => {
    const output = createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    output.on('close', () => {
      const sizeMB = (archive.pointer() / 1024 / 1024).toFixed(2);
      console.log(`✓ ${deckName}.zip (${sizeMB} MB)`);
      resolve();
    });
    
    archive.on('error', reject);
    archive.pipe(output);
    
    // Add deck.json (required)
    archive.file(join(deckPath, 'deck.json'), { name: 'deck.json' });
    
    // Add README.md if it exists
    try {
      archive.file(join(deckPath, 'README.md'), { name: 'README.md' });
    } catch (err) {
      // README is optional
    }
    
    // Add images directory if it exists (for future use)
    archive.directory(join(deckPath, 'cards'), 'cards', { 
      filter: (file) => !file.includes('.DS_Store')
    });
    
    archive.finalize();
  });
}

/**
 * Main build function
 */
async function buildZips() {
  console.log('Building deck ZIPs...\n');
  
  // Ensure releases directory exists
  await mkdir(RELEASES_DIR, { recursive: true });
  
  // Get all deck directories
  const entries = await readdir(DECKS_DIR, { withFileTypes: true });
  const deckDirs = entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
  
  console.log(`Found ${deckDirs.length} deck(s):\n`);
  
  // Build each deck
  for (const deckName of deckDirs) {
    try {
      await zipDeck(deckName);
    } catch (error) {
      console.error(`✗ ${deckName}: ${error.message}`);
      process.exit(1);
    }
  }
  
  console.log(`\n✓ Built ${deckDirs.length} deck ZIP(s) in releases/`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildZips().catch(error => {
    console.error('Build failed:', error);
    process.exit(1);
  });
}

export { buildZips };
