let faqData = [];

async function loadFAQ() {
  const res = await fetch('./faq.json');
  faqData = await res.json();
}

function findAnswer(query) {
  if (!faqData.length) return null;

  const stopWords = new Set(['what', 'how', 'why', 'when', 'where', 'who', 'is', 'are', 'the', 'a', 'an', 'do', 'does', 'can', 'i']);
  const words = query
    .toLowerCase()
    .replace(/[?!.,]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w));

  let best = null;
  let bestScore = 0;

  for (const item of faqData) {
    const target = (item.question + ' ' + item.answer).toLowerCase();
    const score = words.reduce((acc, w) => acc + (target.includes(w) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  return bestScore > 0 ? best.answer : null;
}
