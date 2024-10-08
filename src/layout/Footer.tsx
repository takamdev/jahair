import { ImTwitter } from "react-icons/im"; 
import { FaTiktok } from "react-icons/fa"; 
import { AiOutlineInstagram } from "react-icons/ai"; 
import { BsFacebook } from "react-icons/bs"; 
import { Link } from "react-router-dom";

import useStore from "../store";
function Footer() {
  const setting = useStore(state=>state.setting)
  
  return (
    <footer className="relative h-3/4 text-neutral-700 pb-5 bottom-0 bg-neutral-200">
       <section className="flex flex-col-reverse lg:flex-row lg:justify-center  mx-5 py-16 h-5/6">

          <article className="flex flex-col mt-3 ">
            <img src={setting.logo} className="h-14 lg:mx-5 w-28" alt="logo" /> 
            <p className=" w-80 lg:mx-5 my-5">
                {
                  setting.desc_site
                }
            </p>
            <div className='text-neutral-500 flex gap-10 mx-5'>
              <a className="scale-150 " href={setting.social_links.facebook}><BsFacebook /></a>
              <a className="scale-150"  href={setting.social_links.instagram}><AiOutlineInstagram /></a>
              <a className="scale-150"  href={setting.social_links.tiktok}><FaTiktok /></a>
              <a className="scale-150"  href={setting.social_links.twitter}><ImTwitter /></a>
            </div>
          </article>
          
          <article className="flex flex-col lg:flex-row gap-5">
            <div className="flex flex-col lg:mx-10">
              <h2 className="text-gray-900 font-bold">Methode de paiment</h2>
              <p className="w-80">
                <img src="/payment_methode.webp" className="mt-5 lg:mt-12" alt="payment methode" />
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-gray-900 font-bold">Services clientèle</h2>
              <Link className="underline" to="/faq">FAQ</Link>
              <Link className="underline" to="/contact">CONTACT</Link>
              <Link className="underline" to="/entretien">ENTRETIEN PERRUQUE</Link>
              <Link className="underline" to="/privacy-policy">POLITIQUE DE CONFIDENTIALITÉ</Link>
              <Link className="underline" to="/terms-and-conditions">CONDITIONS GÉNÉRALES D'UTILISATION</Link>
            </div>
            <div className="flex gap-3 flex-col">
            <h2 className="text-gray-900 font-bold">À propos</h2>
            <Link className="underline" to="/about-us">À propos</Link>
            </div>
          </article>
       </section>
       
        <div className='py-3 lg:p-6 text-sm relative flex items-center flex-col lg:flex-row lg:justify-center lg:gap-1 bordureFooter'>
          <span> Copyright © 2024 <b className="font-semibold">JAHAIR STYLE</b></span>. <p>Tout droit réservé Designed by <a target="blank" className="underline text-red-700 font-bold" href="https://takam-loic-junior.vercel.app">Loic Takam</a></p> 
        </div>
    </footer>
  )
}

export default Footer