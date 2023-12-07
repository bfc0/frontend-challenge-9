export const findById = (id: number | string, commentArray: PostComment[]): PostComment | null => {

    // console.log("looking for id in comments:", commentArray)
    for (const c of commentArray) {
        if (c.id === id) return c
        for (const r of c.replies)
            if (r.id === id) return r
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

export const findAndDeleteById = (id: number, comments: PostComment[]) => {
    comments.forEach((o, idx) => {
        if (o.id === id) {
            comments.splice(idx, 1)
            // console.log("found and spliced")
        }
        o.replies.forEach((r, idx) => {
            if (r.id === id)
                o.replies.splice(idx, 1)
        })
    })
}
