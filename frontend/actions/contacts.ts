"use server"
import {createPost, deletePost} from "@/lib/posts";
import {revalidateTag} from "next/cache";


export async function createPostAction(data: { title: string, body: string }) {
    const res = await createPost(data);
    revalidateTag('posts');
    return res;
}

export async function deletePostAction(id:number) {
   try {
       const res = await deletePost(id);
       revalidateTag('posts')
       return res;
   } catch (e) {
   }
}