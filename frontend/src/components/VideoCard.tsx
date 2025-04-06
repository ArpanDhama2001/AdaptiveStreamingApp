import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video } from "@/types/video";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{video.title}</CardTitle>
        <CardDescription>{video.movieId.split('/')[1]}</CardDescription>
      </CardHeader>
      <CardContent>
        <video
          className="w-full rounded-lg"
          controls
          src={video.masterPlaylistPath}
        />
      </CardContent>
    </Card>
  );
} 