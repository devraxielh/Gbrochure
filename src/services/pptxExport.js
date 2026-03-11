import pptxgenjs from 'pptxgenjs';

const BRAND = '#4f46e5';
const BRAND_LIGHT = '#eef2ff';
const DARK = '#1e1b4b';
const GRAY = '#64748b';
const WHITE = '#ffffff';
const EMERALD = '#10b981';
const RED = '#ef4444';

function addTitleSlide(pptx, data, companyName) {
  const slide = pptx.addSlide();
  slide.background = { fill: DARK };

  // Accent bar
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.15, h: '100%', fill: { color: BRAND },
  });

  // Company name
  slide.addText(companyName.toUpperCase(), {
    x: 0.8, y: 1.2, w: 8.4, h: 0.6,
    fontSize: 16, fontFace: 'Arial', color: BRAND, bold: true, letterSpacing: 6,
  });

  // Slogan
  slide.addText(data.titularPrincipal, {
    x: 0.8, y: 2.0, w: 8.4, h: 1.2,
    fontSize: 36, fontFace: 'Arial', color: WHITE, bold: true, lineSpacing: 42,
  });

  // Subtitle
  slide.addText(data.subtitulo, {
    x: 0.8, y: 3.4, w: 8.4, h: 0.8,
    fontSize: 18, fontFace: 'Arial', color: GRAY, italic: true,
  });

  // Bottom line
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.8, y: 4.8, w: 2, h: 0.04, fill: { color: BRAND },
  });

  slide.addText('BROCHURE CORPORATIVO', {
    x: 0.8, y: 4.95, w: 8.4, h: 0.4,
    fontSize: 10, fontFace: 'Arial', color: GRAY, letterSpacing: 4,
  });
}

function addDescriptionSlide(pptx, data, companyName) {
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };

  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: '100%', h: 0.06, fill: { color: BRAND },
  });

  slide.addText('DESCRIPCIÓN DE LA EMPRESA', {
    x: 0.8, y: 0.5, w: 8.4, h: 0.5,
    fontSize: 11, fontFace: 'Arial', color: BRAND, bold: true, letterSpacing: 3,
  });

  slide.addText(data.descripcionEmpresa, {
    x: 0.8, y: 1.2, w: 8.4, h: 1.5,
    fontSize: 14, fontFace: 'Arial', color: DARK, lineSpacing: 22,
  });

  slide.addText(`¿QUÉ ES ${companyName.toUpperCase()}?`, {
    x: 0.8, y: 3.0, w: 8.4, h: 0.5,
    fontSize: 11, fontFace: 'Arial', color: BRAND, bold: true, letterSpacing: 3,
  });

  slide.addText(data.queEs, {
    x: 0.8, y: 3.6, w: 8.4, h: 1.5,
    fontSize: 14, fontFace: 'Arial', color: DARK, lineSpacing: 22,
  });
}

function addServicesSlide(pptx, data) {
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };

  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: '100%', h: 0.06, fill: { color: BRAND },
  });

  slide.addText('SERVICIOS PRINCIPALES', {
    x: 0.8, y: 0.5, w: 8.4, h: 0.5,
    fontSize: 11, fontFace: 'Arial', color: BRAND, bold: true, letterSpacing: 3,
  });

  const services = data.serviciosPrincipales || [];
  const cols = 2;
  const cardW = 4.0;
  const cardH = 0.7;
  const gap = 0.3;

  services.forEach((service, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = 0.8 + col * (cardW + gap);
    const y = 1.3 + row * (cardH + gap);

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y, w: cardW, h: cardH,
      fill: { color: BRAND_LIGHT }, rectRadius: 0.1,
    });

    slide.addText(`${i + 1}.  ${service}`, {
      x: x + 0.15, y, w: cardW - 0.3, h: cardH,
      fontSize: 12, fontFace: 'Arial', color: DARK, valign: 'middle', bold: true,
    });
  });
}

function addProblemsSlide(pptx, data) {
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };

  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: '100%', h: 0.06, fill: { color: RED },
  });

  slide.addText('EL PROBLEMA QUE RESOLVEMOS', {
    x: 0.8, y: 0.5, w: 8.4, h: 0.5,
    fontSize: 11, fontFace: 'Arial', color: RED, bold: true, letterSpacing: 3,
  });

  const problems = data.problemas || [];
  problems.forEach((problem, i) => {
    const y = 1.3 + i * 0.85;

    slide.addShape(pptx.shapes.OVAL, {
      x: 0.8, y: y + 0.1, w: 0.3, h: 0.3, fill: { color: RED },
    });

    slide.addText('!', {
      x: 0.8, y: y + 0.1, w: 0.3, h: 0.3,
      fontSize: 10, fontFace: 'Arial', color: WHITE, align: 'center', valign: 'middle', bold: true,
    });

    slide.addText(problem, {
      x: 1.3, y, w: 7.9, h: 0.6,
      fontSize: 13, fontFace: 'Arial', color: DARK, valign: 'middle', lineSpacing: 20,
    });
  });
}

function addSolutionSlide(pptx, data) {
  const slide = pptx.addSlide();
  slide.background = { fill: DARK };

  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: '100%', h: 0.06, fill: { color: EMERALD },
  });

  slide.addText('NUESTRA SOLUCIÓN', {
    x: 0.8, y: 0.5, w: 8.4, h: 0.5,
    fontSize: 11, fontFace: 'Arial', color: EMERALD, bold: true, letterSpacing: 3,
  });

  slide.addText(data.solucion, {
    x: 0.8, y: 1.4, w: 8.4, h: 2.0,
    fontSize: 15, fontFace: 'Arial', color: WHITE, lineSpacing: 24,
  });
}

function addDifferentiatorsSlide(pptx, data) {
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };

  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: '100%', h: 0.06, fill: { color: EMERALD },
  });

  slide.addText('DIFERENCIALES COMPETITIVOS', {
    x: 0.8, y: 0.5, w: 8.4, h: 0.5,
    fontSize: 11, fontFace: 'Arial', color: EMERALD, bold: true, letterSpacing: 3,
  });

  const diffs = data.diferenciales || [];
  const cols = 2;
  const cardW = 4.0;
  const cardH = 0.7;
  const gap = 0.3;

  diffs.forEach((diff, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = 0.8 + col * (cardW + gap);
    const y = 1.3 + row * (cardH + gap);

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y, w: cardW, h: cardH,
      fill: { color: 'e6fff5' }, rectRadius: 0.1,
    });

    slide.addText(`✓  ${diff}`, {
      x: x + 0.15, y, w: cardW - 0.3, h: cardH,
      fontSize: 12, fontFace: 'Arial', color: DARK, valign: 'middle', bold: true,
    });
  });
}

function addClosingSlide(pptx, data, companyName) {
  const slide = pptx.addSlide();
  slide.background = { fill: DARK };

  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.15, h: '100%', fill: { color: BRAND },
  });

  slide.addText(data.mensajeCierre, {
    x: 1.0, y: 1.5, w: 8.0, h: 2.0,
    fontSize: 28, fontFace: 'Arial', color: WHITE, bold: true, align: 'center', lineSpacing: 38,
  });

  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 4.0, y: 3.8, w: 2, h: 0.04, fill: { color: BRAND },
  });

  slide.addText(companyName.toUpperCase(), {
    x: 1.0, y: 4.2, w: 8.0, h: 0.5,
    fontSize: 14, fontFace: 'Arial', color: BRAND, align: 'center', letterSpacing: 6,
  });
}

export async function exportToPptx(data, companyName) {
  const pptx = new pptxgenjs();
  pptx.author = 'GBrochure';
  pptx.title = `Brochure - ${companyName}`;
  pptx.subject = 'Brochure Corporativo';
  pptx.layout = 'LAYOUT_WIDE';

  addTitleSlide(pptx, data, companyName);
  addDescriptionSlide(pptx, data, companyName);
  addServicesSlide(pptx, data);
  addProblemsSlide(pptx, data);
  addSolutionSlide(pptx, data);
  addDifferentiatorsSlide(pptx, data);
  addClosingSlide(pptx, data, companyName);

  await pptx.writeFile({ fileName: `Brochure_${companyName.replace(/\s+/g, '_')}.pptx` });
}
