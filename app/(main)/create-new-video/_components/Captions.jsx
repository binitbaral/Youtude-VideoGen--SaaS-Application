import React, { useState } from 'react'

const options = [
    {
        name: 'CAPTION',
        style:'text-yellow-400 text-3xl font-extrabold uppercase tracking-wide drop-shadow-md px- py-1 rounded-lg'
    },
]

function Captions({onHandleInputChange}) {
  const [selectedCaptionStyle,setSelectedCaptionStyle]=useState();  
  return (
    <div className='mt-5'>
        <h2>Caption</h2>
        <p className='text-sm text-gray-400'>Your Cpation Will Look Like</p>

        <div className='flex flex-wrap gap-4 mt-6'>
            {options.map((option,index)=>(
                <div key={index}
                onClick={()=>{
                    setSelectedCaptionStyle(option.name)
                    onHandleInputChange('caption',option)
                }}
                 className={`p-2 hover:border bg-slate-900 border-gray-300 cursor-pointer rounded-lg
                 ${selectedCaptionStyle == option.name && 'border'}`}>
                    <h2 className={option.style}>{option.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Captions