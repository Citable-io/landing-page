#!/usr/bin/env node

/**
 * Script to fetch all waitlist entries from Firebase using Admin SDK
 *
 * Setup:
 * 1. Go to Firebase Console → Project Settings → Service Accounts
 * 2. Click "Generate new private key" and download the JSON file
 * 3. Save it as: scripts/service-account.json
 *
 * Usage:
 *   node scripts/fetch-waitlist.mjs           # Table format
 *   node scripts/fetch-waitlist.mjs --json    # JSON output
 *   node scripts/fetch-waitlist.mjs --csv     # CSV output
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SERVICE_ACCOUNT_PATH = join(__dirname, 'service-account.json');

// Check for service account file
if (!existsSync(SERVICE_ACCOUNT_PATH)) {
  console.error('❌ Service account file not found!\n');
  console.error('To set up:');
  console.error('1. Go to Firebase Console → Project Settings → Service Accounts');
  console.error('2. Click "Generate new private key"');
  console.error('3. Save the downloaded JSON file as:');
  console.error(`   ${SERVICE_ACCOUNT_PATH}\n`);
  process.exit(1);
}

// Initialize Firebase Admin
const serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));
initializeApp({
  credential: cert(serviceAccount),
  projectId: 'citable-ae084'
});

const db = getFirestore();
const COLLECTION_NAME = 'waiting-list';

async function fetchWaitlist() {
  try {
    console.error('Fetching waitlist entries...\n');

    const snapshot = await db
      .collection(COLLECTION_NAME)
      .orderBy('createdAt', 'desc')
      .get();

    const entries = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      entries.push({
        id: doc.id,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        affiliation: data.affiliation,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
      });
    });

    return entries;
  } catch (error) {
    console.error('Error fetching waitlist:', error.message);
    process.exit(1);
  }
}

function formatAsTable(entries) {
  if (entries.length === 0) {
    return 'No entries found in the waitlist.';
  }

  console.log(`Found ${entries.length} entries:\n`);
  console.log('─'.repeat(120));
  console.log(
    'Name'.padEnd(30) +
    'Email'.padEnd(40) +
    'Affiliation'.padEnd(30) +
    'Signed Up'
  );
  console.log('─'.repeat(120));

  entries.forEach((entry) => {
    const name = `${entry.firstname} ${entry.lastname}`.substring(0, 28).padEnd(30);
    const email = (entry.email || '').substring(0, 38).padEnd(40);
    const affiliation = (entry.affiliation || '').substring(0, 28).padEnd(30);
    const date = entry.createdAt
      ? new Date(entry.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : 'N/A';

    console.log(`${name}${email}${affiliation}${date}`);
  });

  console.log('─'.repeat(120));
}

function formatAsCSV(entries) {
  const header = 'ID,First Name,Last Name,Email,Affiliation,Created At';
  const rows = entries.map(e =>
    `"${e.id}","${e.firstname}","${e.lastname}","${e.email}","${e.affiliation}","${e.createdAt || ''}"`
  );
  return [header, ...rows].join('\n');
}

async function main() {
  const args = process.argv.slice(2);
  const outputJSON = args.includes('--json');
  const outputCSV = args.includes('--csv');

  const entries = await fetchWaitlist();

  if (outputJSON) {
    console.log(JSON.stringify(entries, null, 2));
  } else if (outputCSV) {
    console.log(formatAsCSV(entries));
  } else {
    formatAsTable(entries);
    console.log(`\nTotal: ${entries.length} people on the waitlist`);
  }

  process.exit(0);
}

main();
