-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  generated_spec TEXT,
  generated_stack JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy for users to see only their own projects
CREATE POLICY "Users can view their own projects"
  ON projects
  FOR SELECT
  USING (user_id = current_setting('app.user_id', true));

-- Create policy for users to insert their own projects
CREATE POLICY "Users can insert their own projects"
  ON projects
  FOR INSERT
  WITH CHECK (user_id = current_setting('app.user_id', true));

-- Create policy for users to update their own projects
CREATE POLICY "Users can update their own projects"
  ON projects
  FOR UPDATE
  USING (user_id = current_setting('app.user_id', true));

-- Create policy for users to delete their own projects
CREATE POLICY "Users can delete their own projects"
  ON projects
  FOR DELETE
  USING (user_id = current_setting('app.user_id', true));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
