import { StoryType } from "src/types/types";
import { create } from "zustand";

interface AllStoriesType {
    allStories: StoryType[];
    setAllStories: (stories: StoryType[]) => void;
    updateStoryLikes: (storyId: string, increment: boolean) => void;
}

export const useAllStoryStore = create<AllStoriesType>((set) => ({
    allStories: [],
    setAllStories: (stories) => set({ allStories: stories }),
    updateStoryLikes: (storyId, increment) => set((state) => ({
        allStories: state.allStories.map(story => 
            story.id === storyId 
                ? {
                    ...story,
                    _count: {
                        ...story._count,
                        likes: Math.max((story._count?.likes ?? 0) + (increment ? 1 : -1), 0)
                    }
                }
                : story
        )
    }))
}));