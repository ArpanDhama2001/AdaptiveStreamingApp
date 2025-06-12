# 📺 Adaptive Video Streaming App

A full-stack application that allows users to upload videos and stream them using **adaptive bitrate streaming (HLS)** for seamless playback across various network conditions.

---

## 📖 Overview

This project is a real-world implementation of an **adaptive video streaming platform**, where users can:

- Upload MP4 video files
- Automatically transcode videos to multiple resolutions
- Stream videos using the HLS protocol with a native HTML5 video player

It showcases backend capabilities such as media processing, secure file handling, RESTful API design, and scalable content delivery.

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
