import React, { useState } from 'react';
import { UploadedImage, AnalysisResult, Language } from './types';
import { translations } from './translations';
import { analyzeImage } from './services/geminiService';
import UploadSection from './components/UploadSection';
import AnalysisView from './components/AnalysisView';
import { Scan, Sparkles, Loader2, AlertCircle, Globe, Home, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [image, setImage] = useState<UploadedImage | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [isLangOpen, setIsLangOpen] = useState(false);

  const t = translations[language];
  const isRTL = language === 'ar';

  const uploadToStorage = async (img: UploadedImage) => {
    try {
      // Send image to local PHP backend
      await fetch('upload.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: img.base64,
          mimeType: img.mimeType
        }),
      });
    } catch (e) {
      console.warn("Failed to store image on server:", e);
      // We intentionally do not show an error to the user if storage fails, 
      // as the analysis can still proceed.
    }
  };

  const handleAnalysis = async () => {
    if (!image) return;
    
    setLoading(true);
    setError(null);
    
    // Fire and forget upload to server - don't await to keep UI snappy
    uploadToStorage(image);

    try {
      const data = await analyzeImage(image.base64, image.mimeType, language);
      setResult(data);
    } catch (err) {
      setError("Failed to analyze image. Please ensure the API key is valid and the image is clear.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  const goHome = () => {
    reset();
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLangOpen(false);
  };

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className={`flex flex-col min-h-screen bg-[#09090b] text-gray-100 selection:bg-gold-500/30 ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}
    >
      
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50 shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <button onClick={goHome} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Sparkles className="text-gold-500" size={24} />
            <span className="font-serif text-xl font-bold tracking-tight text-white">{t.appName}</span>
          </button>
          
          <div className="flex items-center gap-3 md:gap-4">
            <div className="text-xs text-gray-500 uppercase tracking-widest hidden md:block">
              {t.tagline}
            </div>
            
            <div className="h-6 w-px bg-white/10 hidden md:block"></div>

            {/* Language Selector */}
            <div className="relative z-50">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              >
                <Globe size={18} />
                <span className="uppercase text-sm font-medium">{language}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Backdrop to close menu when clicking outside */}
              {isLangOpen && (
                <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)}></div>
              )}

              {/* Dropdown Menu */}
              {isLangOpen && (
                <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-full mt-2 w-36 bg-[#121214] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 flex flex-col py-1`}>
                  <button onClick={() => handleLanguageChange('en')} className="text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">English</button>
                  <button onClick={() => handleLanguageChange('ar')} className="text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-arabic">العربية</button>
                  <button onClick={() => handleLanguageChange('fr')} className="text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Français</button>
                  <button onClick={() => handleLanguageChange('es')} className="text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Español</button>
                  <button onClick={() => handleLanguageChange('ja')} className="text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">日本語</button>
                </div>
              )}
            </div>

             {/* Mobile Home Button */}
             {(result || image) && (
              <button onClick={goHome} className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5">
                <Home size={20} />
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col relative w-full max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Background Gradients */}
        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

        {!result && !loading && (
          <div className="flex-1 flex flex-col items-center justify-center py-8 md:py-12 animate-fade-in-up w-full">
            <div className="text-center space-y-4 md:space-y-6 max-w-3xl px-2">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1]">
                {t.heroTitle} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                  {t.heroHighlight}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
                {t.heroDesc}
              </p>
            </div>

            <div className="w-full mt-8 md:mt-12">
              {!image ? (
                <UploadSection onImageSelected={setImage} texts={t} />
              ) : (
                <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/20">
                    <img src={image.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setImage(null)}
                      className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-colors z-10`}
                    >
                      <AlertCircle size={20} />
                    </button>
                    <div className={`absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent ${isRTL ? 'text-right' : 'text-left'}`}>
                      <p className="text-white text-sm font-medium">{t.ready}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                     <button
                      onClick={handleAnalysis}
                      className="w-full py-3.5 md:py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98]"
                    >
                      <Scan className="group-hover:scale-110 transition-transform" />
                      <span>{t.analyzeBtn}</span>
                    </button>
                    <button
                      onClick={() => setImage(null)}
                      className="w-full py-3.5 md:py-4 bg-transparent border border-white/10 text-gray-400 font-medium rounded-xl hover:bg-white/5 transition-colors active:scale-[0.98]"
                    >
                      {t.cancelBtn}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] space-y-8">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-white/10 flex items-center justify-center">
               <div className="absolute inset-0 bg-gold-500/10 animate-pulse"></div>
               <div className="absolute w-full h-2 bg-gold-500/50 blur-md animate-scan"></div>
               {image && (
                 <img 
                  src={image.previewUrl} 
                  alt="Scanning" 
                  className="w-full h-full object-cover opacity-50 grayscale" 
                 />
               )}
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-xl md:text-2xl font-serif text-white flex items-center justify-center gap-3">
                <Loader2 className="animate-spin text-gold-500" />
                {t.analyzingTitle}
              </h2>
              <p className="text-gray-500 text-xs md:text-sm tracking-widest uppercase">
                {t.analyzingDesc}
              </p>
            </div>
          </div>
        )}

        {error && (
           <div className="flex-1 flex flex-col items-center justify-center">
             <div className="w-full max-w-md p-6 border border-red-500/30 bg-red-500/10 rounded-xl flex flex-col items-center text-center space-y-4">
                <AlertCircle className="text-red-500" size={40} />
                <h3 className="text-xl text-white font-medium">{t.failedTitle}</h3>
                <p className="text-gray-400">{error}</p>
                <button 
                  onClick={() => setError(null)}
                  className="px-6 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  {t.tryAgain}
                </button>
             </div>
           </div>
        )}

        {result && (
          <div className="py-8">
            <AnalysisView data={result} onReset={reset} texts={t} />
          </div>
        )}

      </main>
    </div>
  );
};

export default App;