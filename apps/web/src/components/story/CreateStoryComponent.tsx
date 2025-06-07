"use client";

import { useState } from "react";
import axios from "axios";
import { TagsType } from "src/types/types";
import StorySubmitNavbar from "../navbars/CreateStoryNavBar";

interface CreateStoryComponentProps {
    token?: string;
}

export default function CreateStoryComponent({ token }: CreateStoryComponentProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");

    const handleSubmit = async () => {
        try {
            const tagArray = tags.split(",").map(tag => tag.trim()).filter(Boolean);

            const response = await axios.post(
                "http://localhost:8080/api/create-story",
                {
                    title,
                    content,
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
        <div className="flex flex-col gap-3 max-w-xl mx-auto">
            <StorySubmitNavbar />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className=""
            />

            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className=""
            />

            <input
                type="text"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className=""
            />

        </div>
    );
}