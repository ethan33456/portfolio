import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'


const NavItem = ({ NavIcon, NavText }) => {
    return (
        <div className='flex items-center gap-x-2 py-2 text-LightGray hover:text-Green transition-all cursor-pointer'>
            <span className='text-xl'>{NavIcon}</span>
            <span>{NavText}</span>
        </div>
    )
}

export default NavItem