export default {
  async fetch(request) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const number = url.searchParams.get("number");

    if (!number) {
      return new Response(JSON.stringify({ error: "No number" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Aapka AwardSpace API Link
    const targetUrl = `http://alidb.atwebpages.com/api.php?number=${number}`;

    try {
      const response = await fetch(targetUrl);
      const data = await response.text();
      
      return new Response(data, {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: "Proxy Failed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  }
};
