// Self-hosted API on Darkube (see server/). It mirrors the Supabase auth and
// REST endpoints, so the existing services keep working with only this URL.
// The key is sent as the anonymous bearer token and is not a secret.
export const SUPABASE_URL = 'https://imanamini-api.darkube.ir';
export const SUPABASE_KEY = 'anon';
