import React from 'react'

function Avatar({url}) {
  return (
    <img
    src={url}
    className="w-10 h-10 object-cover rounded-full"
    alt="Avatar" />
  )
}

export default Avatar