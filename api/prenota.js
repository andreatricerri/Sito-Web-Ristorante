// Funzione serverless Vercel: invia la richiesta di prenotazione via email con Resend.
// Variabili d'ambiente: RESEND_API_KEY, BOOKING_TO (email del ristorante), BOOKING_FROM (mittente verificato su Resend).
const esc = s => String(s || "").replace(/[<>&]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  const b = req.body || {};
  if (b.sito) return res.status(200).json({ ok: true }); // honeypot anti-spam
  for (const k of ["nome", "telefono", "data", "orario", "persone"]) {
    if (!String(b[k] || "").trim()) return res.status(400).json({ ok: false, error: "Campo mancante: " + k });
  }
  const html = `<h2>Nuova richiesta di prenotazione</h2>
    <p><b>Nome:</b> ${esc(b.nome)}<br><b>Telefono:</b> ${esc(b.telefono)}<br><b>Data:</b> ${esc(b.data)}<br>
    <b>Orario:</b> ${esc(b.orario)}<br><b>Persone:</b> ${esc(b.persone)}<br><b>Note:</b> ${esc(b.note) || "-"}</p>`;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: "Bearer " + process.env.RESEND_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.BOOKING_FROM,
      to: process.env.BOOKING_TO,
      subject: `Prenotazione: ${b.data} ${b.orario}, ${b.persone} pers. (${b.nome})`,
      html
    })
  });
  return res.status(r.ok ? 200 : 502).json({ ok: r.ok });
}
