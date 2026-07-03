export interface WebState {
  abstracts: 'upcoming' | 'open' | 'closed';
  pricing: 'early' | 'regular' | 'onsite';
}

export const DEADLINES = {
  abstractsOpen: new Date('2026-05-08T00:00:00'),
  abstractsClose: new Date('2026-07-14T23:59:59'),
  earlyBirdClose: new Date('2026-06-20T23:59:59'),
  regularClose: new Date('2026-07-15T23:59:59'),
  congressStart: new Date('2026-07-30T09:00:00')
};

/**
 * Returns the state of the web based on the reference date.
 */
export function getWebState(now: Date = new Date()): WebState {
  let abstracts: 'upcoming' | 'open' | 'closed' = 'upcoming';
  if (now >= DEADLINES.abstractsClose) {
    abstracts = 'closed';
  } else if (now >= DEADLINES.abstractsOpen) {
    abstracts = 'open';
  }

  let pricing: 'early' | 'regular' | 'onsite' = 'early';
  if (now > DEADLINES.regularClose) {
    pricing = 'onsite';
  } else if (now > DEADLINES.earlyBirdClose) {
    pricing = 'regular';
  }

  return { abstracts, pricing };
}

/**
 * Classifies a specific date against a reference date.
 */
export function getDateStatus(dateStr: string, referenceDate: Date = new Date()): 'completed' | 'active' | 'upcoming' {
  // Parse date assuming YYYY-MM-DD
  const [year, month, day] = dateStr.split('-').map(Number);
  
  // Create Date object in local timezone
  const targetEnd = new Date(year, month - 1, day, 23, 59, 59, 999);
  const targetStart = new Date(year, month - 1, day, 0, 0, 0, 0);

  if (referenceDate > targetEnd) {
    return 'completed';
  } else if (referenceDate >= targetStart && referenceDate <= targetEnd) {
    return 'active';
  } else {
    return 'upcoming';
  }
}
