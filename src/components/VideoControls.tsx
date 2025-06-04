
import { useState, useRef } from 'react';
import { Video, Download, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface VideoControlsProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
  carColor: string;
}

export const VideoControls = ({
  canvasRef,
  isRecording,
  setIsRecording,
  carColor,
}: VideoControlsProps) => {
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    if (!canvasRef.current) return;

    try {
      const stream = canvasRef.current.captureStream(30);
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm',
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setVideoBlob(blob);
        toast({
          title: "Recording Complete",
          description: "Your car video is ready for download!",
        });
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Stop recording after 5 seconds
      setTimeout(() => {
        stopRecording();
      }, 5000);

      toast({
        title: "Recording Started",
        description: "Recording your custom car for 5 seconds...",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording Error",
        description: "Failed to start recording. Please try again.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const downloadVideo = () => {
    if (!videoBlob) return;

    const url = URL.createObjectURL(videoBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `custom-car-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: "Your custom car video is downloading!",
    });
  };

  return (
    <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-3">
      <h3 className="text-white font-medium flex items-center gap-2">
        <Video className="w-4 h-4" />
        Video Export
      </h3>

      <div className="space-y-2">
        {!isRecording ? (
          <Button
            onClick={startRecording}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            disabled={isRecording}
          >
            <Video className="w-4 h-4 mr-2" />
            Record Video
          </Button>
        ) : (
          <Button
            onClick={stopRecording}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white"
            disabled={!isRecording}
          >
            <Square className="w-4 h-4 mr-2" />
            Stop Recording
          </Button>
        )}

        {videoBlob && (
          <Button
            onClick={downloadVideo}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Video
          </Button>
        )}
      </div>

      {isRecording && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-red-400 text-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Recording...
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 text-center">
        5-second video with custom overlay
      </p>
    </div>
  );
};
