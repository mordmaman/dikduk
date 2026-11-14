// Tracks questions answered wrongly, for the review mode (phase 2).
// A question joins the pool when answered wrongly and leaves it once it has
// been answered correctly twice.

export const REVIEW_CLEAR_AFTER = 2;

export const reviewKey = (lessonId, questionId) => `${lessonId}/${questionId}`;

export function noteAnswer(save, lessonId, questionId, correct) {
  const key = reviewKey(lessonId, questionId);
  if (!correct) {
    save.missed[key] = { right: 0 };
  } else if (save.missed[key]) {
    save.missed[key].right += 1;
    if (save.missed[key].right >= REVIEW_CLEAR_AFTER) delete save.missed[key];
  }
  return save;
}

// Keys still in the pool whose question exists in the current lessons.
export function reviewPool(save, lessons) {
  const live = new Set();
  for (const lesson of lessons) {
    for (const screen of lesson.teach) for (const q of screen.check || []) live.add(reviewKey(lesson.id, q.id));
    for (const q of lesson.test) live.add(reviewKey(lesson.id, q.id));
    for (const q of lesson.challenge || []) live.add(reviewKey(lesson.id, q.id));
  }
  return Object.keys(save.missed).filter((k) => live.has(k));
}
