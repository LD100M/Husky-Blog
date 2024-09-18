import React from 'react'

function noPostWarning() {
  return (
    <div className="flex items-top justify-center h- pt-16 bg-gray-100">
  <div className="bg-purple-100 text-purple-900 p-10 rounded-md border border-purple-200 max-w-md mx-auto">
    <h1 className="text-xl text-center font-semibold">You have no post yet! Add your own post now!</h1>
  </div>
</div>
  )
}

export default noPostWarning