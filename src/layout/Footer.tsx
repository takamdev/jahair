import { ImTwitter } from "react-icons/im"; 
import { FaTiktok } from "react-icons/fa"; 
import { AiOutlineInstagram } from "react-icons/ai"; 
import { BsFacebook } from "react-icons/bs"; 
import navigation from './../data/navigation.json'

import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer className="relative flex flex-col bottom-0">
        <nav className="p-6 flex flex-col items-center gap-3 lg:flex-row lg:gap-10 justify-center">
          {navigation.map((item) => (
                    <NavLink key={item.name} to={item.href} className="text-sm transition hover:text-rose-300  font-semibold leading-6 text-gray-600">
                      {item.name} 
                    </NavLink>
                  ))}     
        </nav>
        <div className='p-6 flex gap-10 justify-center'>
          <a className="scale-150" href=""><BsFacebook /></a>
          <a className="scale-150" href=""><AiOutlineInstagram /></a>
          <a className="scale-150" href=""><FaTiktok /></a>
          <a className="scale-150" href=""><ImTwitter /></a>
        </div>
    </footer>
  )
}

export default Footer