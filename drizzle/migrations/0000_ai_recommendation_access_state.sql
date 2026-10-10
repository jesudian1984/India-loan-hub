CREATE TABLE public.ai_feature_access_state (
  user_id uuid NOT NULL,
  feature text NOT NULL,
  blocked_at timestamptz NOT NULL DEFAULT now(),
  safe_reason text NOT NULL,
  PRIMARY KEY (user_id, feature)
);

GRANT SELECT, INSERT ON public.ai_feature_access_state TO authenticated;
GRANT ALL ON public.ai_feature_access_state TO service_role;

ALTER TABLE public.ai_feature_access_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own AI feature access state"
  ON public.ai_feature_access_state FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can record their own AI feature access state"
  ON public.ai_feature_access_state FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);