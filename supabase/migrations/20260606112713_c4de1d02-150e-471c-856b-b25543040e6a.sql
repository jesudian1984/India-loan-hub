
CREATE TABLE public.consolidation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  city TEXT,
  existing_loans JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_outstanding NUMERIC,
  total_emi NUMERIC,
  consent_given BOOLEAN NOT NULL DEFAULT false,
  status TEXT DEFAULT 'new',
  source TEXT DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.consolidation_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.consolidation_requests TO authenticated;
GRANT ALL ON public.consolidation_requests TO service_role;

ALTER TABLE public.consolidation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit consolidation requests"
  ON public.consolidation_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view consolidation requests"
  ON public.consolidation_requests FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update consolidation requests"
  ON public.consolidation_requests FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete consolidation requests"
  ON public.consolidation_requests FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_consolidation_requests_updated_at
  BEFORE UPDATE ON public.consolidation_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
