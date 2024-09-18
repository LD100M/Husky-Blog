import React, {useCallback, useState} from "react";
import {useForm} from "react-hook-form"
import Button from "../Button"
import Input from "../Input"
import RTE from "../RTE"
import Select from "../Select"
import appwriteService from "../../appwrite/config"
import {useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"

export default function PostForm({post}){
    // The states to be keep track 
    // of. The value of "title" will
    // track the input field with the 
    // name registered as title. Same 
    // for the rest. 
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const [loading, setLoading] = useState(false)

    // handle the submission logic
    const submit = async(data) => {
        setLoading(loading, true) 
        // If the post is already there, meaning that 
        try {
            // we are editing the post
        if (post) {
            // upload the new image file that we get
            // in the form to the backend
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
            
            // if file exists, we delete the old  
            // image file of the previous post in
            // th backend
            if (file) {
                appwriteService.deleteFile(post.featuredimage)
            }
            
            // then, we update the post with the new data that we
            // received, including the image file that we just get
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredimage: file ? file.$id : undefined 
            })
            // then we navigate to that post
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0])
            if (file) {
                const dbPost = await appwriteService.createPost({...data, featuredimage: file.$id, userid: userData.$id})

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(true)
        }
    }

    // transform the slug passed in to a
    // valid format. 
    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string") return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, "-")
    }, [])

    // constantly moniter the input field that
    // registers with the name "title". If the 
    // value in the "title" field changes, the 
    // value stored in "slug" field will be 
    // updated autmatically to the transformed
    // state of the title field
    React.useEffect(() => {
        watch((value, {name}) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {shouldValidate: true})
            }
        }) 
    }, [watch, slugTransform, setValue])


    return (
        <>
        <form onSubmit={handleSubmit(submit)}
        className="flex flex-wrap"
        >
            <div className="w-2/3 px-2">
                <Input
                label="Title"
                placeholder="Title"
                className="mb-4"
                {...register("title", {required: true})}
                />
                <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", {required: true})}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
                }}
                />
                <RTE
                label="Content: "
                name="content"
                control={control}
                defaultValue={getValues("content")}
                />
            </div>
            <div className="1/3 px-2">
                <Input
                label="Featured Image"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg"
                {...register("image", {required: !post})}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img src={appwriteService.getFilePreview(post.featuredimage)} alt={post.title}
                        className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", {required: true})}
                />
                <Button
                type="submit"
                bgColor={post ? "bg-green-500": undefined}
                className="w-full"
                >{post ? "Update": "Submit"}</Button>
            </div>
        </form>
        {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                <div className="text-white text-xl">Generating Post...</div>
            </div>
        )}
        </>
    )
}