import {API_URL} from "@/constants";
import {PostType} from "@/types/posts";

export type ResponseAllPosts = {
    message: string;
    code: number;
    data: PostType[] | []
}
export const getAllPosts = async (): Promise<ResponseAllPosts> => {
    try {
        const res = await fetch(`${API_URL}/contacts`, {
            next: {
                tags: ['posts']
            },
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        return await res.json()
    } catch (e) {
        return {
            message: 'Bad Request',
            code: 500,
            data: []
        };
    }
}

export const createPost = async (post: { title: string, body: string }) => {
    try {
        const res = await fetch(`${API_URL}/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(post)
        })
        return await res.json();

    } catch (e) {
        return {
            id: 1,
            title: '',
            body: ''
        }
    }
}

export const deletePost = async (id: number) => {
    try {
        const res = await fetch(`${API_URL}/contacts/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": 'application/json'
            },
        })
        return await res.json();
    } catch (e) {
    }
}