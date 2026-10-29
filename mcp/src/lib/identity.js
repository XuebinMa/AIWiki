/** Resolve canonical IDs without silently selecting a different subject. */
export function canonicalId(entry) {
  return entry.id.startsWith(`${entry.subject}:`) ? entry.id : `${entry.subject}:${entry.id}`;
}

export function resolveEntry(entries, id, subject) {
  const matches = entries.filter((entry) =>
    (!subject || entry.subject === subject) &&
    (entry.id === id || entry.legacy_id === id || canonicalId(entry) === id),
  );
  if (matches.length > 1) {
    throw new Error(`Ambiguous entry id "${id}". Use a canonical id: ${matches.map(canonicalId).join(', ')}`);
  }
  return matches[0];
}
