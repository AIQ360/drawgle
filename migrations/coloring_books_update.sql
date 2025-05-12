-- Add credits_paid column to coloring_books table
ALTER TABLE coloring_books 
ADD COLUMN credits_paid BOOLEAN DEFAULT FALSE,
ADD COLUMN subtitle TEXT,
ADD COLUMN cover_image TEXT;

-- Make sure options column exists and is JSONB
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'coloring_books' AND column_name = 'options'
  ) THEN
    ALTER TABLE coloring_books ADD COLUMN options JSONB;
  END IF;
END $$;
