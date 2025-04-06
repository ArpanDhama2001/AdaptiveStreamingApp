import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createMovie = async (movieId: string, title: string) => {
    const response = await prisma.movie.create({
        data: {
            movieId,
            title,
            processingStatus: "PENDING"
        }
    });

    return response;
}

export const updateMovieStatus = async (movieId: string, status: string) => {
    const response = await prisma.movie.update({
        where: {
            movieId
        },
        data: {
            processingStatus: status
        }
    });

    return response;
}

interface Resolution {
    height: number;
    width: number;
    playlistPath: string;
    bitRate: number;
}

export const updateMovieMetadata = async (
    movieId: string,
    thumbnailPath: string,
    masterPlaylistPath: string,
    resolutions: Resolution[]
) => {
    const response = await prisma.movie.update({
        where: {
            movieId
        },
        data: {
            thumbnailPath,
            masterPlaylistPath,
            resolutions: resolutions
        }
    });

    return response;
}

export const getAllMovies = async () => {
    const movies = await prisma.movie.findMany({
        where: {
            processingStatus: "PROCESSED"
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return movies;
}

export const deleteMovie = async (movieId: string) => {
    const response = await prisma.movie.delete({
        where: {
            movieId
        }
    });

    return response;
}