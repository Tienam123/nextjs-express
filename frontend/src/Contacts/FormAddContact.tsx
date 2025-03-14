"use client"
import {useFormik} from "formik";
import {createPostAction} from "@/actions/contacts";
import {useEffect} from "react";

const FormAddContact = ({}) => {
    const initialState = {
        title: '',
        body: ''
    }
    const formik = useFormik({
        initialValues: initialState,
        onSubmit: async ({title, body}: { title: string, body: string }, {resetForm}) => {
            const post: {
                title: string,
                body: string
            } = {
                title,
                body
            }
            await createPostAction(post)
            resetForm();
        }
    });
    useEffect(() => {
        fetch('http://localhost/api/contacts').then(res => res.json()).then(res => console.log(res))
    }, []);
    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex mt-10 flex-col w-1/3 mx-auto items-center"
        >
            <input
                className="border border-solid p-3 mb-2 w-full rounded"
                value={formik.values.title}
                onChange={formik.handleChange}
                type="text"
                name="title"
            />
            <textarea
                name="body"
                className="border border-solid p-3 w-full rounded"
                id=""
                value={formik.values.body}
                onChange={formik.handleChange}
            ></textarea>
            <button
                className="bg-slate-800 w-full text-white p-2 mt-5 rounded"
                type="submit"
            >Add
            </button>
        </form>
    );
};


export default FormAddContact;