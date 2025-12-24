export interface FeatureAnalysis {
  feature: string;
  score: number;
  comment: string;
}

export interface AnalysisResult {
  overallScore: number;
  potentialScore: number;
  summary: string;
  faceShape: string;
  skinQuality: string;
  features: FeatureAnalysis[];
  improvements: string[];
  bestFeature: string;
}

export interface UploadedImage {
  base64: string;
  mimeType: string;
  previewUrl: string;
}

export type Language = 'en' | 'ar' | 'fr' | 'es' | 'ja';
