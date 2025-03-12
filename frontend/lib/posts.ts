export const getAllPosts = async () => {
    try {
        const res = await  fetch('http://localhost/api/contacts',{
            next:{
                tags:['posts']
            },
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        return await res.json();
    } catch (e) {
    }
}

export const createPost = async (post) => {
    try {
        const res = await fetch('http://localhost/api/contacts',{
            method:"POST",
            headers:{
              "Content-Type":'application/json'
            },
            body:JSON.stringify(post)
        })
        return  await res.json();

    } catch (e) {
    }
}

export const deletePost = async (id) => {
    try {
        const res = await fetch('http://localhost/api/delete',{
            method:"DELETE",
            headers:{
                "Content-Type":'application/json'
            },
        })
        return  await res.json();

    } catch (e) {
    }
}