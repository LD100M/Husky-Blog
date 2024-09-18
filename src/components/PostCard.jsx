import React from 'react'
import {Link} from "react-router-dom"
import appwriteService from "../appwrite/config.js"

// The postCard that holds each post,
// Each post shall have the post title 
// and the featured image(id of the image file). 
// The post to be rendered is the one identified with
// $id. 
function PostCard({
    $id, title, featuredimage
}) {
  return (
    <Link to={`/post/${$id}`}>
        <div
        className='w-full bg-gray-100 rounded-xl p-4'
        >
            <div
            className='w-full justify-center mb-4'
            >
                <img src={appwriteService.getFilePreview(featuredimage)} alt={title}
                className='rounded-xl'
                />
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard