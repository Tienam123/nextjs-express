import FormAddContact from "@/src/Contacts/FormAddContact";
import {getAllPosts} from "@/lib/posts";
import {FaRegTrashAlt} from "react-icons/fa";
import ContactList from "@/src/Contacts/ContactList";



export default async function Home() {
    const posts = await getAllPosts();
    console.log(posts)
    return (
        <>

            <FormAddContact/>
            <ContactList posts={posts}/>
        </>
    );
}
