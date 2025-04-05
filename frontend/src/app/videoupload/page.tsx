'use client';

import axios from 'axios';
import { ChangeEvent, MouseEventHandler, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, UploadCloud } from 'lucide-react';

export default function VideoUpload() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
  }

  const handleFileUpload = async () => {
    // const file = event.target.files?.[0];
    // setFile(event.target.files?.[0] || null);
    if (!file) {
      setError('No file selected');
      return;
    }
    console.log("file:", file);

    try {
      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append('video', file);

      const response = await axios.post(
        'http://localhost:3000/api/v1/videos/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response.data);
      setVideoUrl(response.data.videoUrl); // Adjust this key based on your API response
    } catch (err) {
      setError('Something went wrong during upload');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const clickHnadler = () => {
    handleFileUpload();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <UploadCloud className="w-5 h-5" />
            Upload Your Video
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="video">Select a video file</Label>
            <Input
              id="video"
              type="file"
              accept="video/*"
              onChange={onChange}
              disabled={isUploading}
            />
          </div>

          <Button disabled={isUploading} className="w-full" asChild onClick={clickHnadler}>
            <span className="flex items-center gap-2">
              {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isUploading ? 'Uploading...' : 'Upload'}
            </span>
          </Button>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {videoUrl && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-gray-700">Video uploaded successfully:</p>
              <video
                src={videoUrl}
                controls
                className="w-full rounded-md shadow-sm"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
