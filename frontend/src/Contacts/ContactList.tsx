import {FaRegTrashAlt} from "react-icons/fa";
import ContactItem from "@/src/Contacts/ContactItem";

export interface ContactListProps {

}

const ContactList = ({posts}: ContactListProps) => {
    return (
        <ul className="w-1/2 mx-auto flex bor flex-col gap-5 mt-10">
            {posts.data?.map(post => (
                <ContactItem post={post}/>
            ))}
        </ul>
    );
};

ContactList.propTypes = {};

export default ContactList;