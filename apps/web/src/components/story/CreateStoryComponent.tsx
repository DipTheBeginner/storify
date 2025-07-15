"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// TipTap imports
import { Editor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import HomeNavBar from "../navbars/HomeNavBar";
import NavBar from "../NavBar";
import CreateStoryNavBar from "../navbars/CreateStoryNavBar";

interface CreateStoryComponentProps {
    token?: string;
    onSuccess?: () => void;
}

const storySchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    tags: z.string().optional(),
});

export type StorySchemaType = z.infer<typeof storySchema>;

export default function CreateStoryComponent({ token }: CreateStoryComponentProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<StorySchemaType>({
        resolver: zodResolver(storySchema),
    });

    const [editor, setEditor] = useState<Editor | null>(null);
    const [contentError, setContentError] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const TiptapEditor = new Editor({
                extensions: [StarterKit, Underline],
                content: "",
                editorProps: {
                    attributes: {
                        class: "min-h-[150px] focus:outline-none p-2 bg-white",
                    },
                },
            });

            setEditor(TiptapEditor);

            // Cleanup
            return () => {
                TiptapEditor.destroy();
            };
        }
    }, []);

    const onSubmit = async (data: StorySchemaType) => {
        const htmlContent = editor?.getHTML();

        if (!htmlContent || htmlContent === "<p></p>") {
            setContentError("Content is required");
            return;
        }

        setContentError(null); // Clear previous error

        try {
            const tagArray = data.tags
                ?.split(",")
                .map((tag) => tag.trim())
                .filter(Boolean);

            const response = await axios.post(
                "http://localhost:8080/api/create-story",
                {
                    title: data.title,
                    content: htmlContent,
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

        <div className="max-w-4xl min-w-4xl">

            <form onSubmit={handleSubmit(onSubmit)} className="bg-neutral-100 min-h-screen flex flex-col gap-4 p-6">
                <span className="font-semibold text-2xl">Create New Story</span>
                <hr className="border-neutral-500/50 border" />

                <label className="font-semibold">Title</label>
                <input
                    {...register("title")}
                    className="border p-2 rounded"
                    placeholder="Enter title"
                />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                <label className="font-semibold">Content</label>

                {/* Formatting toolbar */}
                {editor && (
                    <div className="flex gap-2 my-2">
                        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className="px-2 py-1 border rounded">
                            Bold
                        </button>
                        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className="px-2 py-1 border rounded">
                            Italic
                        </button>
                        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className="px-2 py-1 border rounded">
                            Underline
                        </button>
                    </div>
                )}

                {/* Editor Content */}
                <div className="border rounded bg-white">
                    {editor && <EditorContent editor={editor} />}
                </div>
                {contentError && <p className="text-red-500">{contentError}</p>}

                <label className="font-semibold">Tags (comma separated)</label>
                <input
                    {...register("tags")}
                    className="border p-2 rounded"
                    placeholder="e.g. tech, travel, coding"
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                >
                    {isSubmitting ? "Submitting..." : "Create Story"}
                </button>
            </form>
        </div>
    );
}
