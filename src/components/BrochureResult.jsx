import { useState } from 'react';
import { exportToPptx } from '../services/pptxExport';

export default function BrochureResult({ data, companyName }) {
  const [exporting, setExporting] = useState(false);

  if (!data) return null;

  const handleExportPptx = async () => {
    setExporting(true);
    try {
      await exportToPptx(data, companyName);
    } catch (err) {
      console.error('Error exporting PPTX:', err);
      alert('Error al exportar el archivo PPTX.');
    } finally {
      setExporting(false);
    }
  };

  const sections = [
    {
      number: '01',
      title: 'Titular Principal',
      content: <p className="text-2xl sm:text-3xl font-extrabold gradient-text leading-tight">{data.titularPrincipal}</p>,
    },
    {
      number: '02',
      title: 'Subtítulo',
      content: <p className="text-lg text-gray-600 dark:text-gray-300 font-medium italic">{data.subtitulo}</p>,
    },
    {
      number: '03',
      title: 'Descripción de la Empresa',
      content: <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.descripcionEmpresa}</p>,
    },
    {
      number: '04',
      title: `¿Qué es ${companyName}?`,
      content: <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.queEs}</p>,
    },
    {
      number: '05',
      title: 'Servicios Principales',
      content: (
        <div className="grid sm:grid-cols-2 gap-3">
          {data.serviciosPrincipales?.map((s, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-100/50 dark:border-brand-800/20">
              <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-white">{i + 1}</span>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{s}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      number: '06',
      title: 'El Problema que Resolvemos',
      content: (
        <ul className="space-y-3">
          {data.problemas?.map((p, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
              </span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">{p}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      number: '07',
      title: 'Nuestra Solución',
      content: <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.solucion}</p>,
    },
    {
      number: '08',
      title: 'Diferenciales Competitivos',
      content: (
        <div className="grid sm:grid-cols-2 gap-3">
          {data.diferenciales?.map((d, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100/50 dark:border-emerald-800/20">
              <span className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{d}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      number: '09',
      title: 'Mensaje de Cierre',
      content: (
        <div className="text-center py-4">
          <p className="text-xl font-bold gradient-text">{data.mensajeCierre}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Result header */}
      <div className="glass-card rounded-2xl px-6 py-5 sm:px-8 shadow-card">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Brochure Generado</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Contenido generado con IA para <span className="font-semibold text-brand-500">{companyName}</span></p>
            </div>
          </div>

          <button
            onClick={handleExportPptx}
            disabled={exporting}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                       bg-gradient-to-r from-orange-500 to-red-500
                       hover:from-orange-400 hover:to-red-400
                       text-white font-semibold text-sm
                       shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40
                       transition-all duration-300 active:scale-[0.98]
                       disabled:opacity-60 disabled:cursor-not-allowed"
            id="export-pptx-btn"
          >
            {exporting ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Exportando...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Descargar PPTX
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section, index) => (
        <div
          key={index}
          className="glass-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden animate-slide-up"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          {/* Section header */}
          <div className="border-b border-gray-100 dark:border-gray-700/40 px-6 py-4 sm:px-8 flex items-center gap-3">
            <span className="section-badge">
              <span className="text-brand-500 font-bold">#</span>
              {section.number}
            </span>
            <h3 className="font-bold text-gray-900 dark:text-white">{section.title}</h3>
          </div>

          {/* Section content */}
          <div className="px-6 py-5 sm:px-8">
            {section.content}
          </div>
        </div>
      ))}
    </div>
  );
}
