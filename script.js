export default {
  async fetch(request, env) {
    // Ye headers CORS error ko khatam kar denge
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const number = url.searchParams.get("number");

    if (!number) {
      return new Response(JSON.stringify({ error: "No number provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Yahan hum aapki asli API ko call kar rahe hain (Backend se)
    // Is tarah InfinityFree ka security block bypass ho jata hai
    const targetUrl = `http://ali-database.fwh.is/api.php?number=${number}`;

    try {
      const response = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0",
        },
      });
      const data = await response.text();

      return new Response(data, {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: "Worker Connection Failed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};