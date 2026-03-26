
CREATE POLICY "Users can update own topup status"
ON public.topup_history
FOR UPDATE
USING (auth.uid() = user_id);
