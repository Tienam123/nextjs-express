import FormAddContact from "@/src/Contacts/FormAddContact";
import {getAllPosts} from "@/lib/posts";
import ContactList from "@/src/Contacts/ContactList";


export default async function Home() {
    const posts = await getAllPosts();
    return (
        <>
            {JSON.stringify(posts)}
           <FormAddContact />
                <ContactList posts={posts.data} />
        </>
    );
}
