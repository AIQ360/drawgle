-- Add cover_image_id column to coloring_books table
ALTER TABLE coloring_books 
ADD COLUMN cover_image_id UUID;

-- Add metadata column to images table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'images' AND column_name = 'metadata'
  ) THEN
    ALTER TABLE images ADD COLUMN metadata JSONB;
  END IF;
END $$;
