# Adaptive Video Streaming Backend

This project is the backend service for an adaptive video streaming application that processes uploaded videos into multiple resolutions and streams them using the HLS (HTTP Live Streaming) protocol.

## Features

- Video Upload via API
- Transcoding to multiple resolutions (1080p, 720p, 480p, 360p)
- HLS Packaging with `m3u8` playlists and `.ts` segments
- Thumbnail Generation
- Adaptive Streaming with Master Playlist
- Video Metadata Storage

## Tech Stack

- **Node.js** + **TypeScript**
- **Express.js**
- **Multer** for file uploads
- **FFmpeg** via `fluent-ffmpeg`
- **HLS (HTTP Live Streaming)**
- **File System (fs)** for storage
- **MongoDB** for metadata

## Project Structure

```

backend/
├── src/
│   ├── config/              # Environment and config variables
│   ├── controller/          # Express controllers for routes
│   ├── middlewares/         # Multer config
│   ├── repository/          # Database
│   ├── routes/
│   │   └── v1/              # Versioned API routes
│   ├── service/             # FFmpeg video processing
│   └── index.ts             # App entry point
├── uploads/                 # Temporary file uploads
├── output/                  # Processed HLS outputs (playlists, segments)

````

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [FFmpeg](https://ffmpeg.org/) installed and available in your system PATH

### Steps

```bash
git clone https://github.com/ArpanDhama2001/AdaptiveStreamingApp.git
cd AdaptiveStreamingApp/backend
npm install
````

## Usage

### Start the server

```bash
npm run dev
```

Server will start on `http://localhost:3000`

## API Endpoints

### Upload a Video

```
POST /api/v1/video/upload
```

* **Form Field**: `video` (File)
* **Response**:

```json
{
  "success": true,
  "message": "Video uploaded successfully",
  "videoId": "1685738294371"
}
```

### List All Videos

```
GET /api/v1/video/list
```

Returns metadata for all processed videos.

### Delete a Video

```
DELETE /api/v1/video/:videoId
```

Deletes HLS metadata.

## How it Works

* Uploaded video is stored temporarily via Multer.
* `processVideoForHLS()`:

  * Generates a thumbnail at 1s.
  * Encodes the video into 360p, 480p, 720p, 1080p.
  * Segments each into `.ts` files with HLS playlists.
  * Generates a `master.m3u8` file listing all variants.
  * Metadata is saved to the repository.
* Video can then be streamed adaptively using a player like [hls.js](https://github.com/video-dev/hls.js).

## Sample Output Directory Structure

```
output/
└── 1785738294371/
    ├── 360p/
    │   ├── playlist.m3u8
    │   ├── segment000.ts
    │   └── ...
    ├── 720p/
    ├── 1080p/
    ├── thumbnail.jpg
    └── master.m3u8
```
## Notes

* This project is backend-only; a separate frontend or HLS-compatible video player is required to consume the stream.
* Persistence is currently simulated via an in-memory repository. You can plug in MongoDB/PostgreSQL as needed.

## Future Improvements

* Integration of something like S3 to store the output on the cloud

