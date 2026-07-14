
CREATE TABLE public.consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  budget text NOT NULL,
  purposes text[] NOT NULL DEFAULT '{}',
  preferred_datetime timestamptz,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.consultation_requests TO anon, authenticated;
GRANT ALL ON public.consultation_requests TO service_role;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a consultation request"
  ON public.consultation_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 120
    AND length(email) BETWEEN 3 AND 255
    AND length(phone) BETWEEN 3 AND 40
    AND length(budget) BETWEEN 1 AND 80
    AND array_length(purposes, 1) BETWEEN 1 AND 10
    AND (message IS NULL OR length(message) <= 2000)
  );
