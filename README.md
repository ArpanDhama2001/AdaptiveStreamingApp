# 📺 Adaptive Video Streaming App

A full-stack application that allows users to upload videos and stream them using **adaptive bitrate streaming (HLS)** for seamless playback across various network conditions.

---

## 📖 Overview

This project is a real-world implementation of an **adaptive video streaming platform**, where users can:

- Upload MP4 video files
- Automatically transcode videos to multiple resolutions
- Stream videos using the HLS protocol with a native HTML5 video player

It showcases backend capabilities such as media processing, file handling, and RESTful API design.

---

## 🚀 Key Features

- 🎞️ **Video Upload Interface** for users to submit MP4 files
- ⚙️ **FFmpeg-based Transcoding** into 1080p, 720p, and 480p streams
- 📡 **HTTP Live Streaming (HLS)** for adaptive playback
- 🧩 **Backend API** using Express for handling uploads and video metadata
- 🎥 **Frontend with Next.js** for smooth UI and video player integration
- 💾 **MongoDB** for storing video information and metadata

---

## 🛠 Tech Stack

| Layer       | Technology               |
|-------------|---------------------------|
| Frontend    | Next.js, HTML5, CSS       |
| Backend     | Node.js, Express.js       |
| Database    | MongoDB (Mongoose)        |
| Video Tools | FFmpeg, HLS (.m3u8, .ts)  |
| File Upload | Multer                    |
| Others      | Nodemon, dotenv           |

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ArpanDhama2001/AdaptiveStreamingApp.git
cd AdaptiveStreamingApp
```

---

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Make sure **FFmpeg** is installed on your system:

```bash
# macOS (Homebrew)
brew install ffmpeg

# Ubuntu/Debian
sudo apt install ffmpeg

# Windows: Download from https://ffmpeg.org/download.html and add to PATH
```

Run the backend server:

```bash
npm run dev
```

---

### 3. Setup the Frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

---

### 4. Access the App

* **Frontend**: [http://localhost:3000](http://localhost:3000)
* **Backend API**: [http://localhost:5000](http://localhost:5000)

