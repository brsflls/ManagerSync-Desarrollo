import React from 'react'
import { ReactSVG } from 'react-svg';
import "../../dev/css/components/_footer.css"

export const Footer = () => { 
return (
    <div className='flex flex-col items-center justify-center bg-white max-w-full mx-auto p-6'>
    <ReactSVG className='max-w-56 mb-4' src="src/assets/logo-reducido.svg"/>
    <p className='text-gray-400'>Copyright DevSync ©2024</p>
</div>

)
}
