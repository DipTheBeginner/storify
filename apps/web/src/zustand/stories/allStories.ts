import { StoryType } from "src/types/types";
import { create } from "zustand";

interface AllStoriesType {
    allStories: StoryType[],
    userStories:StoryType[],
    setAllStories: (stories: StoryType[]) => void,
    setUserStories:(stories:StoryType[])=>void

}

export const useAllStoryStore = create<AllStoriesType>((set) => ({
    allStories: [],
    setAllStories: (stories) => set({ allStories: stories }), 
    userStories:[],
    setUserStories:(stories)=>set({userStories:stories})
}));


