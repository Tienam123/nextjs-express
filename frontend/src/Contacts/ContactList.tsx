import {FaRegTrashAlt} from "react-icons/fa";
import ContactItem from "@/src/Contacts/ContactItem";
import {PostType} from "@/types/posts";

export interface ContactListProps {
    posts: PostType[]
}

const ContactList = ({posts}: ContactListProps) => {
    return (
        <ul className="w-1/2 mx-auto flex bor flex-col gap-5 mt-10">
            {posts.map(post => (
                <ContactItem post={post} key={post.id}/>
            ))}
        </ul>
    );
};

ContactList.propTypes = {};

export default ContactList;