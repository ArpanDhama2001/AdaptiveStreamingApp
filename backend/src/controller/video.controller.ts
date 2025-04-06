import { Request, Response } from "express";
import { processVideoForHLS } from "../service/video.service";
import fs from "fs";
import { deleteMovie, getAllMovies } from '../repository/movie.repository';

export const uploadVideoController = async (req: Request, res: Response) => {
    if(!req.file) {
        res.status(400).json({
            success: false,
            message: 'No file uploaded'
        });
        return;
    }
    console.log(req.file);

    const videoPath = req.file.path;
    const videoId = Date.now();
    const outputPath = `output/${videoId}`;
    const title = req.file.originalname.split('.')[0];

    await processVideoForHLS(videoPath, outputPath, title, (err, _) => {
        if(err) {
            res.status(500).json({
                success: false,
                message: 'An error occurred while processing the video'
            });
            return;
        }

        // Delete the video file after processing
        fs.unlink(videoPath, (err) => {
            if(err) {
                console.log('An error occurred while deleting the video file:', err);
            }
        });

        console.log('Video processed successfully', videoId);
        res.status(200).json({
            success: true,
            message: 'Video uploaded successfully',
            videoId: videoId
        });
    })
};

export const listVideosController = async (_req: Request, res: Response) => {
    try {
        const movies = await getAllMovies();
        res.status(200).json({
            success: true,
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch videos'
        });
    }
};

export const deleteVideoController = async (req: Request, res: Response) => {
    const { videoId } = req.params;
    console.log(videoId);
    await deleteMovie(videoId);
    res.status(200).json({
        success: true,
        message: 'Video deleted successfully'
    });
}