const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_MODEL = import.meta.env.VITE_GROQ_MODEL || 'llama-3.3-70b-versatile';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function generateBrochure(companyName, companyDescription) {
  const systemPrompt = `Actúa como experto en marketing empresarial, branding y redacción comercial.
Genera el contenido de un brochure empresarial estructurado en formato JSON con las siguientes claves exactas:

{
  "titularPrincipal": "Una frase corta y potente tipo slogan",
  "subtitulo": "Una línea que explique brevemente la propuesta de valor",
  "descripcionEmpresa": "Un párrafo claro explicando qué hace la empresa",
  "queEs": "Un texto corto explicando el concepto del negocio",
  "serviciosPrincipales": ["servicio1", "servicio2", ...],
  "problemas": ["problema1", "problema2", ...],
  "solucion": "Texto explicando cómo la empresa resuelve los problemas",
  "diferenciales": ["diferencial1", "diferencial2", ...],
  "mensajeCierre": "Un texto persuasivo para cerrar el brochure"
}

Reglas:
- serviciosPrincipales: 6 a 8 elementos máximo
- problemas: 4 a 5 elementos
- diferenciales: 4 a 6 elementos
- Usa lenguaje profesional, claro y orientado a negocios
- El resultado debe parecer el contenido de un brochure corporativo moderno
- Responde ÚNICAMENTE con el JSON, sin texto adicional, sin backticks, sin markdown`;

  const userPrompt = `Nombre de la empresa: ${companyName}
Descripción de la empresa: ${companyDescription}`;

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Error ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('La API no devolvió contenido.');
  }

  // Parse JSON response — strip potential markdown fences
  const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
}
