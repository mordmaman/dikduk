-- Dikduk Migration 002
-- Add advanced exercise tracking columns to lesson_progress

-- ============================================
-- ADD ADVANCED EXERCISE COLUMNS
-- Tracks advanced exercise completion separately
-- ============================================

ALTER TABLE lesson_progress
ADD COLUMN IF NOT EXISTS advanced_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS advanced_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS advanced_best_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS advanced_attempts INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS advanced_last_attempt_at TIMESTAMPTZ;

-- Add comment for documentation
COMMENT ON COLUMN lesson_progress.advanced_completed IS 'Whether advanced exercises have been completed for this lesson';
COMMENT ON COLUMN lesson_progress.advanced_score IS 'Most recent score on advanced exercises';
COMMENT ON COLUMN lesson_progress.advanced_best_score IS 'Best score achieved on advanced exercises';
COMMENT ON COLUMN lesson_progress.advanced_attempts IS 'Number of attempts on advanced exercises';
COMMENT ON COLUMN lesson_progress.advanced_last_attempt_at IS 'Timestamp of last advanced exercise attempt';
