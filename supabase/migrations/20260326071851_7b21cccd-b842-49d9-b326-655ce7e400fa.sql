
CREATE OR REPLACE FUNCTION public.add_credit(p_username TEXT, p_amount NUMERIC)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET credit = credit + p_amount,
      updated_at = now()
  WHERE username = p_username;
END;
$$;
