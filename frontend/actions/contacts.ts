"use server"
import {createPost} from "@/lib/posts";
import {revalidateTag} from "next/cache";


export async function createPostAction(data) {
   const res = await createPost(data);
    revalidateTag('posts');
    return res;
}

export async function deletePostAction() {

}