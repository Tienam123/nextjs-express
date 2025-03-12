"use client"
import {FaRegTrashAlt} from "react-icons/fa";

export interface ContactItemProps {

}

const ContactItem = ({post}: ContactItemProps) => {

    const handleDeleteItem = () => {

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