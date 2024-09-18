import React from 'react'

function PostLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-purple-100 text-purple-900 p-10 rounded-md border border-purple-200 max-w-md mx-auto">
          <h1 className="text-xl text-center font-semibold">Loading posts...</h1>
        </div>
      </div>
  )
}

export default PostLoading