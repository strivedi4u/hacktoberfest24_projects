import React from 'react'

const Navbar = ()=>  {
    return (
    <nav className='bg-opacity-[0.5] text-white'>
        <div className="md:mycontainer flex justify-between items-center px-4 py-6 h-14 mt-5">

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
        <div className="logo-text scale-[1.5]">
            <span className='text-[#a36eff]'>&lt;</span>Pass
            <span className='text-[#a36eff]'>Man/&gt;</span>
            </div>
        </div>
        <button className='text-white mt-8 gap-1 p-1 rounded-md flex flex-col  justify-center items-center hover:bg-[#eeeeee1b] hover:transition-all duration-75'>
            <img className='invert w-7 ' src="/icons/github.svg" alt="github" />
            <span className='font-mono text-[15px] '>GitHub</span>
        </button>
        </div>
    </nav>
    )
}

export default Navbar


