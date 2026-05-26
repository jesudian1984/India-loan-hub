
ALTER TABLE public.leads
  ALTER COLUMN company_name DROP NOT NULL,
  ALTER COLUMN monthly_salary DROP NOT NULL,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS loan_type text,
  ADD COLUMN IF NOT EXISTS employment_type text,
  ADD COLUMN IF NOT EXISTS consent_given boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS source text DEFAULT 'website';
