DROP POLICY "Users can record their own AI feature access state" ON public.ai_feature_access_state;
REVOKE INSERT ON public.ai_feature_access_state FROM authenticated;

CREATE OR REPLACE FUNCTION public.block_ai_feature(_feature text, _safe_reason text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF _feature <> 'recommend-loan-category' THEN
    RAISE EXCEPTION 'Unsupported AI feature';
  END IF;
  INSERT INTO public.ai_feature_access_state (user_id, feature, safe_reason)
  VALUES (auth.uid(), _feature, _safe_reason)
  ON CONFLICT (user_id, feature) DO NOTHING;
END;
$$;

REVOKE ALL ON FUNCTION public.block_ai_feature(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.block_ai_feature(text, text) TO authenticated;