export async function GET() {
  try {
    const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users');
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching external API:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
  }
}
