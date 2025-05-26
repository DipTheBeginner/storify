import { StoryType } from "src/types/types";
import { create } from "zustand";

interface AllStoriesType {
    allStories: StoryType[],
    setAllStories: (stories: StoryType[]) => void,

}

export const useAllStoryStore = create<AllStoriesType>((set) => ({
    allStories: [],
    setAllStories: (stories) => set({ allStories: stories }),     
}));


