
import { useState } from 'react';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

const predefinedColors = [
  { name: 'Ferrari Red', value: '#ff0000' },
  { name: 'Ocean Blue', value: '#0066cc' },
  { name: 'Forest Green', value: '#228b22' },
  { name: 'Sunset Orange', value: '#ff8c00' },
  { name: 'Royal Purple', value: '#6a0dad' },
  { name: 'Pearl White', value: '#f8f8ff' },
  { name: 'Midnight Black', value: '#000000' },
  { name: 'Silver', value: '#c0c0c0' },
  { name: 'Gold', value: '#ffd700' },
  { name: 'Hot Pink', value: '#ff69b4' },
];

export const ColorPicker = ({ currentColor, onColorChange }: ColorPickerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <Palette className="w-5 h-5 text-white" />
        <span className="text-white font-medium">Colors</span>
      </div>

      <div className="space-y-3">
        {/* Current Color Display */}
        <div
          className="w-12 h-12 rounded-xl border-2 border-white/20 cursor-pointer transition-transform hover:scale-105"
          style={{ backgroundColor: currentColor }}
          onClick={() => setIsExpanded(!isExpanded)}
        />

        {/* Color Grid */}
        {isExpanded && (
          <div className="grid grid-cols-2 gap-2 animate-fade-in">
            {predefinedColors.map((color) => (
              <button
                key={color.value}
                className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 ${
                  currentColor === color.value
                    ? 'border-white ring-2 ring-white/50'
                    : 'border-white/20 hover:border-white/40'
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => onColorChange(color.value)}
                title={color.name}
              />
            ))}
          </div>
        )}

        {/* Custom Color Input */}
        <div className="mt-4">
          <input
            type="color"
            value={currentColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-full h-8 rounded-lg border border-white/20 bg-transparent cursor-pointer"
          />
          <span className="text-xs text-gray-400 mt-1 block">Custom Color</span>
        </div>
      </div>
    </div>
  );
};
