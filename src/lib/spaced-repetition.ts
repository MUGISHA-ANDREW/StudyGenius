/**
 * Simple implementation of SM-2 Algorithm
 * - q: quality of response (0-5)
 * - n: repetition number
 * - ef: openness factor (easiness)
 * - i: interval (days)
 */
export function calculateNextReview(
  quality: number,
  prevInterval: number,
  prevRepetition: number,
  prevEaseFactor: number
) {
  let interval = 0
  let repetition = 0
  let easeFactor = prevEaseFactor

  if (quality >= 3) {
    if (prevRepetition === 0) {
      interval = 1
    } else if (prevRepetition === 1) {
      interval = 6
    } else {
      interval = Math.round(prevInterval * prevEaseFactor)
    }
    repetition = prevRepetition + 1
  } else {
    repetition = 0
    interval = 1
  }

  easeFactor = prevEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))

  if (easeFactor < 1.3) {
    easeFactor = 1.3
  }

  const nextReviewDate = new Date()
  nextReviewDate.setDate(nextReviewDate.getDate() + interval)

  return {
    nextReviewDate,
    interval,
    repetition,
    easeFactor
  }
}
