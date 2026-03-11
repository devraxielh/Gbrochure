import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BrochureForm from './components/BrochureForm';
import BrochureResult from './components/BrochureResult';
import { generateBrochure } from './services/groqApi';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [brochureData, setBrochureData] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (name, description) => {
    setIsLoading(true);
    setError(null);
    setBrochureData(null);
    setCompanyName(name);

    try {
      const data = await generateBrochure(name, description);
      setBrochureData(data);
    } catch (err) {
      console.error('Error generating brochure:', err);
      setError(err.message || 'Error desconocido al generar el brochure.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main content area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden lg:ml-72">
        {/* Header */}
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page content */}
        <main className="mx-auto w-full max-w-5xl p-4 md:p-6 lg:p-8 2xl:p-10">
          {/* Page title */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Generador de Brochure
              <span className="gradient-text"> con IA</span>
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Ingresa los datos de tu empresa y genera contenido profesional para tu brochure corporativo en segundos.
            </p>
          </div>

          <div className="grid gap-8">
            {/* Form */}
            <BrochureForm onGenerate={handleGenerate} isLoading={isLoading} />

            {/* Error */}
            {error && (
              <div className="glass-card rounded-2xl p-6 border-l-4 border-red-500 animate-slide-up">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-700 dark:text-red-400">Error al generar</h3>
                    <p className="text-sm text-red-600 dark:text-red-300 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Result */}
            <BrochureResult data={brochureData} companyName={companyName} />
          </div>
        </main>
      </div>
    </div>
  );
}
