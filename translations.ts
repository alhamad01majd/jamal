import { Language } from "./types";

interface Translation {
  appName: string;
  tagline: string;
  heroTitle: string;
  heroHighlight: string;
  heroDesc: string;
  uploadTitle: string;
  uploadDesc: string;
  privacy: string;
  ready: string;
  analyzeBtn: string;
  cancelBtn: string;
  analyzingTitle: string;
  analyzingDesc: string;
  failedTitle: string;
  tryAgain: string;
  currentScore: string;
  potentialScore: string;
  analyzed: string;
  attainable: string;
  keyAttributes: string;
  faceShape: string;
  skinQuality: string;
  bestFeature: string;
  aestheticAnalysis: string;
  featureHarmony: string;
  breakdown: string;
  improvements: string;
  analyzeAnother: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    appName: "Aesthetica.ai",
    tagline: "Professional Aesthetic Engine",
    heroTitle: "Unlock your",
    heroHighlight: "true potential.",
    heroDesc: "Advanced AI analysis of your facial harmony, skin health, and grooming. Get a realistic score and actionable, dermatologically-backed advice.",
    uploadTitle: "Upload your photo",
    uploadDesc: "Drag & drop or click to select. Ensure good lighting and a clear view of your face.",
    privacy: "Privacy Note: Images are processed in real-time and are not stored on our servers.",
    ready: "Ready for analysis",
    analyzeBtn: "Analyze Aesthetics",
    cancelBtn: "Cancel",
    analyzingTitle: "Analyzing Geometry",
    analyzingDesc: "Measuring symmetry • Evaluating skin texture • Calculating score",
    failedTitle: "Analysis Failed",
    tryAgain: "Try Again",
    currentScore: "Current Score",
    potentialScore: "Potential",
    analyzed: "Analyzed",
    attainable: "Attainable",
    keyAttributes: "Key Attributes",
    faceShape: "Face Shape",
    skinQuality: "Skin Quality",
    bestFeature: "Best Feature",
    aestheticAnalysis: "Aesthetic Analysis",
    featureHarmony: "Feature Harmony",
    breakdown: "Detailed Breakdown",
    improvements: "Actionable Improvements",
    analyzeAnother: "Analyze Another Photo"
  },
  ar: {
    appName: "أستيتيكا.ai",
    tagline: "محرك جمالي احترافي",
    heroTitle: "اكتشف",
    heroHighlight: "إمكانياتك الحقيقية.",
    heroDesc: "تحليل ذكاء اصطناعي متقدم لتناسق الوجه، صحة البشرة، والمظهر العام. احصل على تقييم واقعي ونصائح قابلة للتطبيق.",
    uploadTitle: "حمل صورتك",
    uploadDesc: "اسحب وأفلت أو انقر للاختيار. تأكد من وجود إضاءة جيدة ورؤية واضحة للوجه.",
    privacy: "ملاحظة الخصوصية: تتم معالجة الصور في الوقت الفعلي ولا يتم تخزينها على خوادمنا.",
    ready: "جاهز للتحليل",
    analyzeBtn: "تحليل الجماليات",
    cancelBtn: "إلغاء",
    analyzingTitle: "جاري تحليل الهندسة",
    analyzingDesc: "قياس التناظر • تقييم ملمس البشرة • حساب النتيجة",
    failedTitle: "فشل التحليل",
    tryAgain: "حاول مرة أخرى",
    currentScore: "النتيجة الحالية",
    potentialScore: "الإمكانية",
    analyzed: "تم التحليل",
    attainable: "يمكن تحقيقه",
    keyAttributes: "السمات الرئيسية",
    faceShape: "شكل الوجه",
    skinQuality: "جودة البشرة",
    bestFeature: "أفضل ميزة",
    aestheticAnalysis: "التحليل الجمالي",
    featureHarmony: "تناغم الميزات",
    breakdown: "تفصيل دقيق",
    improvements: "تحسينات قابلة للتنفيذ",
    analyzeAnother: "تحليل صورة أخرى"
  },
  fr: {
    appName: "Aesthetica.ai",
    tagline: "Moteur Esthétique Professionnel",
    heroTitle: "Révélez votre",
    heroHighlight: "vrai potentiel.",
    heroDesc: "Analyse avancée par IA de l'harmonie faciale, de la peau et du style. Obtenez un score réaliste et des conseils dermatologiques concrets.",
    uploadTitle: "Téléchargez votre photo",
    uploadDesc: "Glissez-déposez ou cliquez pour sélectionner. Assurez-vous d'un bon éclairage et d'une vue claire du visage.",
    privacy: "Confidentialité : Les images sont traitées en temps réel et ne sont pas stockées.",
    ready: "Prêt pour l'analyse",
    analyzeBtn: "Analyser l'esthétique",
    cancelBtn: "Annuler",
    analyzingTitle: "Analyse de la géométrie",
    analyzingDesc: "Mesure de la symétrie • Évaluation de la texture • Calcul du score",
    failedTitle: "Échec de l'analyse",
    tryAgain: "Réessayer",
    currentScore: "Score Actuel",
    potentialScore: "Potentiel",
    analyzed: "Analysé",
    attainable: "Atteignable",
    keyAttributes: "Attributs Clés",
    faceShape: "Forme du visage",
    skinQuality: "Qualité de peau",
    bestFeature: "Meilleur atout",
    aestheticAnalysis: "Analyse Esthétique",
    featureHarmony: "Harmonie des traits",
    breakdown: "Détail complet",
    improvements: "Améliorations concrètes",
    analyzeAnother: "Analyser une autre photo"
  },
  es: {
    appName: "Aesthetica.ai",
    tagline: "Motor Estético Profesional",
    heroTitle: "Desbloquea tu",
    heroHighlight: "verdadero potencial.",
    heroDesc: "Análisis avanzado de IA sobre armonía facial, salud de la piel y estilo. Obtén una puntuación realista y consejos prácticos.",
    uploadTitle: "Sube tu foto",
    uploadDesc: "Arrastra y suelta o haz clic para seleccionar. Asegura buena iluminación y vista clara.",
    privacy: "Privacidad: Las imágenes se procesan en tiempo real y no se guardan.",
    ready: "Listo para análisis",
    analyzeBtn: "Analizar Estética",
    cancelBtn: "Cancelar",
    analyzingTitle: "Analizando Geometría",
    analyzingDesc: "Midiendo simetría • Evaluando textura • Calculando puntuación",
    failedTitle: "Análisis fallido",
    tryAgain: "Intentar de nuevo",
    currentScore: "Puntuación Actual",
    potentialScore: "Potencial",
    analyzed: "Analizado",
    attainable: "Alcanzable",
    keyAttributes: "Atributos Clave",
    faceShape: "Forma facial",
    skinQuality: "Calidad de piel",
    bestFeature: "Mejor rasgo",
    aestheticAnalysis: "Análisis Estético",
    featureHarmony: "Armonía de rasgos",
    breakdown: "Desglose detallado",
    improvements: "Mejoras procesables",
    analyzeAnother: "Analizar otra foto"
  },
  ja: {
    appName: "Aesthetica.ai",
    tagline: "プロフェッショナル美学エンジン",
    heroTitle: "あなたの",
    heroHighlight: "真の可能性を。",
    heroDesc: "顔の調和、肌の健康、身だしなみを高度なAIで分析。現実的なスコアと具体的なアドバイスを提供します。",
    uploadTitle: "写真をアップロード",
    uploadDesc: "ドラッグ＆ドロップまたはクリックして選択。明るい場所で顔がはっきり見えるようにしてください。",
    privacy: "プライバシー：画像はリアルタイムで処理され、保存されることはありません。",
    ready: "分析準備完了",
    analyzeBtn: "美学を分析する",
    cancelBtn: "キャンセル",
    analyzingTitle: "形状を分析中",
    analyzingDesc: "対称性の測定 • 肌質の評価 • スコア計算中",
    failedTitle: "分析に失敗しました",
    tryAgain: "再試行",
    currentScore: "現在のスコア",
    potentialScore: "ポテンシャル",
    analyzed: "分析済み",
    attainable: "到達可能",
    keyAttributes: "主な属性",
    faceShape: "顔の形",
    skinQuality: "肌質",
    bestFeature: "最高の特徴",
    aestheticAnalysis: "美的分析",
    featureHarmony: "特徴の調和",
    breakdown: "詳細内訳",
    improvements: "具体的な改善策",
    analyzeAnother: "別の写真を分析"
  }
};
