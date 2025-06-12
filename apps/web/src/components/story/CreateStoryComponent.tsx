"use client";

import axios from "axios";
import { TagsType } from "src/types/types";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


interface CreateStoryComponentProps {
    token?: string;
    onSuccess?: () => void;
}




const storySchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    content: z.string().min(1, "Content is required"),
    tags: z.string().optional()
})

export type StorySchemaType = z.infer<typeof storySchema>;

export default function CreateStoryComponent({ token }: CreateStoryComponentProps) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,

    } = useForm<StorySchemaType>({
        resolver: zodResolver(storySchema)
    })


    const onSubmit = async (data: StorySchemaType) => {
        try {
            const tagArray = data.tags?.split(",").map(tag => tag.trim()).filter(Boolean);

            const response = await axios.post(
                "http://localhost:8080/api/create-story",
                {
                    title: data.title,
                    content: data.content,
                    tags: tagArray,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Story created:", response.data);
            alert("Story created successfully!");
        } catch (error) {
            console.error("Error creating story:", error);
            alert("Failed to create story.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-xl mx-auto">
            <div>
                <input type="text" placeholder="Title" {...register("title")} className="w-full border px-3 py-2 rounded" />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
                <textarea
                    placeholder="Content"
                    {...register("content")}
                    className="w-full border px-3 py-2 rounded"
                />
                {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    {...register("tags")}
                    className="w-full border px-3 py-2 rounded"
                />
                {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-60"
            >
                {isSubmitting ? "Posting..." : "Post Story"}
            </button>


        </form>
    );
}


