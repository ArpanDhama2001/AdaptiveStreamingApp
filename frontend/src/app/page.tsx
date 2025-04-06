'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { Video } from "@/types/video";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import UploadCard from "@/components/UploadCard";
import { Trash2 } from "lucide-react";
export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const router = useRouter();
  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/videos/list");
      setVideos(response.data.data);  
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/videos/${id}`);
      fetchVideos();
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const onClickHandler = (videoId: string, title: string) => {
    window.sessionStorage.setItem("videoTitle", title);
    router.push(`/stream/${videoId}`);
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary max-w-fit p-4 border-y-2 border-x-8 rounded-lg border-stone-600">HLS Uploader</h1>
      <div className="flex justify-center h-[500px] items-center">
        <UploadCard />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-primary text-center">Videos Library</h1>
      <div className="flex flex-wrap gap-4">
        {videos.map((video) => (
          <div 
            key={video.id} 
            className="w-full cursor-pointer rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg flex items-center p-4"
          >
            <div className="w-full cursor-pointer rounded-lg overflow-hidden transition-all flex items-center p-4" onClick={() => onClickHandler(video.movieId, video.title)}>
            <div className="relative w-64 aspect-video">
              {video.thumbnailPath ? (
                <Image 
                  src={`http://localhost:3000/output/${video.movieId}/thumbnail.jpg`} 
                  alt={video.movieId} 
                  fill 
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No thumbnail</span>
                </div>
              )}
            </div>
            <div className="p-4 flex w-full">
              <div className="flex flex-col flex-1">
                <p className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                  {video.title}
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Added {formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
              </p>
            </div>
            </div>
            <div>
              <button className="text-red-500" onClick={() => handleDelete(video.movieId)}>
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
