import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const WALLET_API_URL = "http://tmwallet.thaighost.net/apiwallet.php";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const TMWEASY_USER = Deno.env.get('TMWEASY_USER');
    const TMWEASY_PASSWORD = Deno.env.get('TMWEASY_PASSWORD');

    if (!TMWEASY_USER || !TMWEASY_PASSWORD) {
      throw new Error('TrueWallet credentials not configured');
    }

    const { angpao_link, username } = await req.json();

    if (!angpao_link || !username) {
      return new Response(JSON.stringify({ error: 'angpao_link and username required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Call TMWEasy API to redeem angpao
    const apiUrl = `${WALLET_API_URL}?username=${TMWEASY_USER}&password=${TMWEASY_PASSWORD}&angpao=${encodeURIComponent(angpao_link)}&json=1`;
    
    console.log(`TrueWallet angpao check for user: ${username}`);

    const response = await fetch(apiUrl);
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text, Status: 'error' };
    }

    console.log('TrueWallet API response:', JSON.stringify(data));

    // If successful, update credits
    if (data.Status === 'ready' || data.status === '1' || data.Amount) {
      const amount = Number(data.Amount || data.amount || 0);
      
      if (amount > 0) {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

        const updateRes = await fetch(
          `${supabaseUrl}/rest/v1/rpc/add_credit`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': serviceRoleKey,
              'Authorization': `Bearer ${serviceRoleKey}`,
            },
            body: JSON.stringify({ p_username: username, p_amount: amount }),
          }
        );

        if (!updateRes.ok) {
          const errText = await updateRes.text();
          console.error('Credit update failed:', errText);
        } else {
          await updateRes.text();
          console.log(`Credit updated via TrueWallet: ${username} +${amount}`);
        }

        data.credit_added = amount;
      }
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('TrueWallet error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
