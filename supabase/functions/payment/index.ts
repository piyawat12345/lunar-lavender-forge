import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const API_URL = "http://tmwallet.thaighost.net/api_mn.php";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const TMWEASY_USER = Deno.env.get('TMWEASY_USER');
    const TMWEASY_PASSWORD = Deno.env.get('TMWEASY_PASSWORD');
    const TMWEASY_CON_ID = Deno.env.get('TMWEASY_CON_ID');

    if (!TMWEASY_USER || !TMWEASY_PASSWORD || !TMWEASY_CON_ID) {
      throw new Error('Payment credentials not configured');
    }

    const { action, amount, ref1, id_pay } = await req.json();

    let apiUrl = '';
    const baseParams = `username=${TMWEASY_USER}&password=${TMWEASY_PASSWORD}&con_id=${TMWEASY_CON_ID}`;

    switch (action) {
      case 'create_pay':
        if (!amount || !ref1) {
          return new Response(JSON.stringify({ error: 'amount and ref1 required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        apiUrl = `${API_URL}?${baseParams}&amount=${amount}&ref1=${encodeURIComponent(ref1)}&method=create_pay`;
        break;

      case 'detail_pay':
        if (!id_pay) {
          return new Response(JSON.stringify({ error: 'id_pay required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        apiUrl = `${API_URL}?${baseParams}&id_pay=${id_pay}&method=detail_pay&qr=1`;
        break;

      case 'confirm':
        if (!id_pay) {
          return new Response(JSON.stringify({ error: 'id_pay required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        apiUrl = `${API_URL}?${baseParams}&method=confirm&id_pay=${id_pay}`;
        break;

      case 'cancel':
        if (!id_pay) {
          return new Response(JSON.stringify({ error: 'id_pay required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        apiUrl = `${API_URL}?${baseParams}&method=cancel&id_pay=${id_pay}`;
        break;

      default:
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    console.log(`Payment API call: action=${action}`);

    const response = await fetch(apiUrl);
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    // If confirm is successful and has amount, update credits in Supabase
    if (action === 'confirm' && data.status === "1" && data.amount) {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

      const creditAmount = Number(data.amount);
      const username = data.ref1;

      // Update profile credit
      const updateRes = await fetch(
        `${supabaseUrl}/rest/v1/rpc/add_credit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': serviceRoleKey,
            'Authorization': `Bearer ${serviceRoleKey}`,
          },
          body: JSON.stringify({ p_username: username, p_amount: creditAmount }),
        }
      );

      if (!updateRes.ok) {
        const errText = await updateRes.text();
        console.error('Credit update failed:', errText);
      } else {
        await updateRes.text();
        console.log(`Credit updated: ${username} +${creditAmount}`);
      }

      data.credit_added = creditAmount;
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Payment error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
