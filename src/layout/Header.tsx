import { FaShopify } from "react-icons/fa"; 
import  { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import { Link } from "react-router-dom";
import useStore from "../store";
import navigation from './../data/navigation.json'
import { OffCanvasCart } from "./OffCanvas";
import SelectLanguage from "../components/SelectLanguage";
import { useTranslation } from "react-i18next";
function Header() {
  const {t} = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [shadow,setshadow]=useState('')
  const [isOpen,setIsOpen]=useState(false)
 const setting = useStore(state=>state.setting)
  const cartLink = "#"
  const Cart = useStore((state)=>state.Cart)
  window.addEventListener('scroll',()=>{
    if(window.scrollY>10) setshadow("shadow-lg")
      else setshadow('')
  })
  return (
    <>
    <OffCanvasCart isOpen={isOpen} setIsOpen={setIsOpen}/>
    <header className={`inset-x-0 top-0 z-50 fixed bg-white ${shadow}`}>
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only"></span>
              <img
                alt=""
                src={setting.logo}
                className="h-14 w-28"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only"></span>
              <Bars3Icon aria-hidden="true" className="h-9 w-9" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <NavLink key={item.name} to={item.href} className="text-sm transition hover:text-rose-300  font-semibold leading-6 text-gray-900">
                {t(item.name)}
              </NavLink>
            ))}
           
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end me-7">
            <Link to={cartLink} onClick={()=>{setIsOpen(!isOpen)}} className="text-sm relative container-icon  font-semibold leading-6 text-gray-900 scale-150">
              <span className="icon absolute -top-3 -right-5 text-gray-500">({Cart.length})</span>
              <FaShopify className="scale-150" />
            </Link>
          </div>
           <SelectLanguage className="hidden lg:block ms-4 "/>
            <Link to={cartLink} onClick={()=>{setIsOpen(!isOpen)}} className="text-sm lg:hidden absolute right-24 container-icon  font-semibold leading-6 text-gray-900 scale-125">
              <span className="icon absolute -top-3 -right-5 text-gray-500">({Cart.length})</span>
              <FaShopify className="scale-150" />
            </Link>
        </nav>
        
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src={setting.logo}
                  className="h-14 w-28"
                />
              </a>
             
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5  rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-9 w-9" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base transition  hover:text-rose-300 font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                     {t(item.name)}
                    </a>
                  ))}
                   <SelectLanguage/>
                </div>
                <div className="py-6">
                  <Link
                    to={cartLink}
                    onClick={()=>{setIsOpen(!isOpen)}}
                    className="-mx-3 inline lg:block relative container-icon  rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-black hover:bg-gray-50"
                  >
                  <span className="icon absolute top-5 -right-6  text-gray-500">({Cart.length})</span>
                  <FaShopify className="scale-150 " />
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
   
  )
}

export default Header