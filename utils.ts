export const findById = (id: number | string, comments: PostComment[]): PostComment | null => {

    for (const o of comments) {
        if (o.id === id) {
            return o
        }
        if (!Array.isArray(o.replies) || !o.replies.length) {
            continue
        }
        const temp = findById(id, o.replies)
        if (temp) { return temp }
    }
    return null
}

export const findFirstLevelPostByCommentId = (id: number, comments: PostComment[]) => {
    for (const o of comments) {
        if (o.id === id) return o
        for (const r of o.replies) {
            if (r.id === id) return o
        }
    }
    return null
}


export const findHighestId = (comments: PostComment[]): number => {
    let highest = 0
    for (const o of comments) {
        highest = Math.max(highest, o.id)
        for (const r of o.replies) {
            highest = Math.max(highest, r.id)
        }
    }

    return highest
}
