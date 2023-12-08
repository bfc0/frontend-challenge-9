import { z } from "zod";
import { findById } from "./utils";

export const UpvoteSchema = z.object({
    action: z.literal("upvote"),
    id: z.number()
})

export const DownvoteSchema = z.object({
    action: z.literal("downvote"),
    id: z.number()
})

export const DeleteSchema = z.object({
    action: z.literal("delete"),
    id: z.number()
})

export const ActionSchema = z.union([UpvoteSchema, DownvoteSchema, DeleteSchema])

export type ActionSchemaType = z.infer<typeof ActionSchema>