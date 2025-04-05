'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import HLS from 'hls.js';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { UploadCloud } from 'lucide-react';

export default function Page() {
  const params = useParams<{ videoId: string }>();
  const videoId = params.videoId;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    if (videoId && HLS.isSupported()) {
      const hls = new HLS();
      hls.loadSource(`http://localhost:3000/output/${videoId}/master.m3u8`);
      hls.attachMedia(videoRef.current!);
    }
  }, [videoId]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/videoupload/`);
  }

  const handleRedirect2 = () => {
    router.push(`/`);
  }

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-3xl shadow-xl">
        <CardContent className="p-4 space-y-6">
          <div className="flex justify-between space-y-1">
            <div>
              <Label className="text-xl font-semibold">Video Preview</Label>
              <p className="text-muted-foreground text-sm">Video ID: {videoId}</p>
            </div>
            <Button variant="outline" onClick={handleRedirect2}>Home</Button>
            <Button onClick={handleRedirect}>
                <UploadCloud className="w-5 h-5" />
                Upload New Video
            </Button>
          </div>

          <div className="relative w-full">
            <video
              controls
              ref={videoRef}
              className="w-full rounded-lg border border-border shadow-sm"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
