-- Create a dedicated table for cover images
CREATE TABLE IF NOT EXISTS cover_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id UUID REFERENCES coloring_books(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  prompt TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS cover_images_user_id_idx ON cover_images(user_id);
CREATE INDEX IF NOT EXISTS cover_images_book_id_idx ON cover_images(book_id);

-- Update the coloring_books table to reference the cover_images table
ALTER TABLE coloring_books 
  DROP COLUMN IF EXISTS cover_image,
  DROP COLUMN IF EXISTS cover_image_id;

ALTER TABLE coloring_books
  ADD COLUMN cover_id UUID REFERENCES cover_images(id) ON DELETE SET NULL;
