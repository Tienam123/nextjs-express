"use client"
import {FaRegTrashAlt} from "react-icons/fa";
import {PostType} from "@/types/posts";
import {deletePostAction} from "@/actions/contacts";

export interface ContactItemProps {
    post: PostType
}

const ContactItem = ({post}: ContactItemProps) => {

    const handleDeleteItem = async () => {
        try {
         await deletePostAction(post.id);
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message)
            }
        }
    }

    return (
        <li className="border border-solid border-gray-300 p-2 rounded-xl flex justify-between" key={post.id}>
            <div className="">
                <div className="flex gap-3 "><p>Заголовок:</p> <p>{post.title}</p></div>
                <div className="flex gap-3 mt-5"><h3>Тіло посту:</h3><p>{post.body}</p></div>
            </div>
            <button onClick={handleDeleteItem}><FaRegTrashAlt size={22} color={'red'}/>
            </button>
        </li>
    );
};


export default ContactItem;