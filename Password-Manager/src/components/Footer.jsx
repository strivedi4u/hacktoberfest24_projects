import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-center flex-col items-center'>
        <div className="logo font-bold text-2xl flex gap-[2.5em]">
            <div className="banner scale-[2]">
            <lord-icon
    src="https://cdn.lordicon.com/xynjytfp.json"
    trigger="loop"
    delay="1000"
    stroke="bold"
    state="morph-code"
    colors="primary:#ffffff,secondary:#a36eff">
</lord-icon>
        </div>
        <div className="logo-text scale-[1.5] text-white">
            <span className='text-[#a36eff] '>&lt;</span>Pass
            <span className='text-[#a36eff]'>Man/&gt;</span>
            </div>
        </div>
        <div className='flex gap-2 justify-center items-center text-white font-mono'>
        Created with <img className='w-6 mx-auto my-2'  src="icons/heart.png" alt="love" /> by Ayush.
    </div>
    </div>
  )
}

export default Footer
