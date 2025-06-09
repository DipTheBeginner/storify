

export type UserType = {
    id: Number
    email: string
    name: string
    bio?: string
    image?: string
    createdAt: Date
    updatedAt: Date
    provider?: string
    oauth_id?: string
    story: StoryType[]
    likes: LikeType[]
}



export type StoryType = {
    id: string,
    title: string,
    content: string,
    imageUrl?: string,
    authorId: Number,
    author: UserType,
    createdAt: Date,
    isUpdated: Boolean,
    updatedAt: Date,
    tag: TagsType[],
    likes: LikeType[],
    _count?: {
        likes: number;
    };
}

export type TagsType = {
    id: string,
    tagName: string,
    stories: StoryType[]
}

export type LikeType = {
    id: string,
    userId: Number,
    storyId: String,
    user: UserType,
    story: StoryType,
    createdAt: Date,
}