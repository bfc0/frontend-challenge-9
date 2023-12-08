
type User = {
    image: {
        png: string,
        webp: string,
    },
    username: string,
}

type PostComment = {
    id: number,
    content: string,
    createdAt: string,
    score: number,
    user: User,
    replyingTo?: string,
    replies: Array<PostComment>,
}

type ReplyData = {
    originalId: number | null,
    content: string,
}
