import { z } from "zod";

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

export const NewMessageSchema = z.object({
    action: z.literal("newmessage"),
    content: z.string().min(5, { message: "Message should be at least 5 characters long" }).max(1000, { message: "Message too long" }),
    originalId: z.number().nullable(),
})

export const UpdateMessageSchema = z.object({
    action: z.literal("update"),
    id: z.number(),
    content: z.string().min(5, { message: "Message should be at least 5 characters long" }).max(1000, { message: "Message too long" }),
})

export const ActionSchema = z.union([UpvoteSchema, DownvoteSchema, DeleteSchema, NewMessageSchema, UpdateMessageSchema])

export type ActionSchemaType = z.infer<typeof ActionSchema>