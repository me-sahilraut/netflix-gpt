import React from 'react'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className='w-screen aspect-video pt-36 px-12  space-y-5 absolute text-white bg-gradient-to-r from-black'>
            <h1 className='text-6xl font-bold w-1/2'>{title}</h1>
            <p className='text-xl font-semibold w-1/2' >{overview}</p>
            <div className='space-x-2'>
                <button className='p-4 px-12 text-xl bg-opacity-50 rounded-lg bg-gray-500  '>Play</button>
                <button className='mx-2 p-4 px-12 text-xl bg-opacity-50 rounded-lg bg-gray-500  '>More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle