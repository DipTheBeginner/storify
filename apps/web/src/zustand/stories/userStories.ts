import { StoryType } from "src/types/types";
import { create } from "zustand";

interface UserStoriesType {
  userStories: StoryType[];
  setUserStories: (stories: StoryType[]) => void;
}

export const useUserStoryStore = create<UserStoriesType>((set) => ({
  userStories: [],
  setUserStories: (stories) => set({ userStories: stories }),
}));
