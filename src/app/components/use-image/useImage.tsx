import { useState, useEffect } from "react";
const fallbackImage = '/placeholder-image.jpg';
import { Exercise } from "@/lib/interfaces";

export function UseImageUrl(exercise: Exercise | undefined): string {
    const [imgSrc, setImgSrc] = useState<string>(fallbackImage);

    useEffect(() => {
        if (!exercise?.gifUrl) return;

        const filename = exercise.gifUrl.trim().split("/").pop();
        const localPath = `/${filename}`;

        fetch(localPath, { method: "HEAD" })
            .then((res) => {
                setImgSrc(res.ok ? localPath : fallbackImage);
            })
            .catch(() => {
                setImgSrc(fallbackImage);
            });

    }, [exercise]); // Körs om exercise ändras

    return imgSrc;
}