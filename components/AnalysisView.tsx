import React from 'react';
import { AnalysisResult } from '../types';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer 
} from 'recharts';
import { Sparkles, ArrowUpRight, CheckCircle2, Activity, ArrowLeft } from 'lucide-react';

interface AnalysisViewProps {
  data: AnalysisResult;
  onReset: () => void;
  texts: any;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ data, onReset, texts }) => {
  const chartData = data.features.map(f => ({
    subject: f.feature,
    A: f.score,
    fullMark: 10,
  }));

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 md:space-y-8 animate-fade-in pb-12">
      
      {/* Back/Home Button for Deep Navigation */}
      <div className="flex justify-start">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5 text-sm md:text-base"
        >
          <ArrowLeft size={18} />
          <span>{texts.analyzeAnother}</span>
        </button>
      </div>

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[160px]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50"></div>
          <span className="text-xs md:text-sm text-gray-400 uppercase tracking-widest mb-2">{texts.currentScore}</span>
          <div className="text-5xl md:text-6xl font-serif font-bold text-white mb-2">
            {data.overallScore}<span className="text-2xl text-gray-500">/10</span>
          </div>
          <div className="flex items-center gap-2 text-gold-500 text-sm">
            <Activity size={16} />
            <span>{texts.analyzed}</span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[160px]">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
          <span className="text-xs md:text-sm text-gray-400 uppercase tracking-widest mb-2">{texts.potentialScore}</span>
          <div className="text-5xl md:text-6xl font-serif font-bold text-emerald-400 mb-2">
            {data.potentialScore}<span className="text-2xl text-gray-500">/10</span>
          </div>
           <div className="flex items-center gap-2 text-emerald-400 text-sm">
            <ArrowUpRight size={16} />
            <span>{texts.attainable}</span>
          </div>
        </div>

         <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center relative min-h-[160px]">
          <h3 className="text-gray-400 uppercase tracking-widest text-xs mb-4">{texts.keyAttributes}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-gray-400 text-sm">{texts.faceShape}</span>
              <span className="text-white font-medium text-right">{data.faceShape}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-gray-400 text-sm">{texts.skinQuality}</span>
              <span className="text-white font-medium text-right">{data.skinQuality}</span>
            </div>
             <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">{texts.bestFeature}</span>
              <span className="text-gold-400 font-medium text-right">{data.bestFeature}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="glass-panel p-6 md:p-8 rounded-2xl">
        <h2 className="text-xl md:text-2xl font-serif text-white mb-4 flex items-center gap-3">
          <Sparkles className="text-gold-500" />
          {texts.aestheticAnalysis}
        </h2>
        <p className="text-gray-300 leading-relaxed text-base md:text-lg">
          {data.summary}
        </p>
      </div>

      {/* Charts & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        
        {/* Radar Chart */}
        <div className="glass-panel p-4 md:p-6 rounded-2xl min-h-[350px] flex flex-col items-center justify-center">
          <h3 className="text-gray-400 uppercase tracking-widest text-sm mb-4 md:mb-6">{texts.featureHarmony}</h3>
          <div className="w-full h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <Radar
                  name="Score"
                  dataKey="A"
                  stroke="#EAB308"
                  strokeWidth={2}
                  fill="#EAB308"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Breakdown List */}
        <div className="glass-panel p-4 md:p-6 rounded-2xl space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
           <h3 className="text-gray-400 uppercase tracking-widest text-sm mb-4">{texts.breakdown}</h3>
           {data.features.map((item, idx) => (
             <div key={idx} className="bg-black/20 p-4 rounded-lg border border-white/5 hover:bg-white/5 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">{item.feature}</span>
                  <div className="flex items-center gap-2">
                    <div className="hidden sm:block h-2 w-24 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white transition-all duration-1000" 
                        style={{ width: `${(item.score / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-400 font-mono bg-black/40 px-2 py-1 rounded">{item.score}/10</span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-500">{item.comment}</p>
             </div>
           ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="glass-panel p-6 md:p-8 rounded-2xl border-l-4 border-l-gold-500">
        <h3 className="text-lg md:text-xl font-serif text-white mb-6">{texts.improvements}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.improvements.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-lg transition-colors">
              <CheckCircle2 className="text-gold-500 mt-1 flex-shrink-0" size={20} />
              <span className="text-gray-300 text-sm md:text-base">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-8 pb-8">
        <button 
          onClick={onReset}
          className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
        >
          {texts.analyzeAnother}
        </button>
      </div>

    </div>
  );
};

export default AnalysisView;