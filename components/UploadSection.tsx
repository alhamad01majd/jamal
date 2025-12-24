import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { UploadedImage } from '../types';

interface UploadSectionProps {
  onImageSelected: (image: UploadedImage) => void;
  texts: any;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onImageSelected, texts }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      onImageSelected({
        base64,
        mimeType: file.type,
        previewUrl: result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className={`
          relative group cursor-pointer
          border-2 border-dashed rounded-3xl
          p-8 md:p-12
          transition-all duration-300 ease-in-out
          flex flex-col items-center justify-center text-center
          ${isDragging 
            ? 'border-gold-500 bg-gold-500/10 scale-105' 
            : 'border-gray-700 hover:border-gray-500 bg-black/40'
          }
        `}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-gray-800">
          <Upload className="text-gray-400 group-hover:text-white" size={28} />
        </div>
        
        <h3 className="text-lg md:text-xl font-medium text-white mb-2">{texts.uploadTitle}</h3>
        <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto leading-relaxed">
          {texts.uploadDesc}
        </p>

        <div className="flex gap-4 text-xs text-gray-500 uppercase tracking-wider">
          <span>JPG</span>
          <span>PNG</span>
          <span>WEBP</span>
        </div>

        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>
      
      <p className="text-center text-gray-600 text-xs mt-6 px-4">
        <span className="font-bold">{texts.privacy}</span>
      </p>
    </div>
  );
};

export default UploadSection;