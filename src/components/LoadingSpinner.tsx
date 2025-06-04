
export const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
        <p className="text-white text-lg font-medium">Loading 3D Model...</p>
        <p className="text-gray-400 text-sm mt-2">Preparing your car configurator</p>
      </div>
    </div>
  );
};
