

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
    tag: TagsType[]
}

export type TagsType = {
    id: string,
    tagName: string,
    stories: StoryType
}