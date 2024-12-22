import { AiOutlineArrowRight } from "react-icons/ai";
import useStore from "../store";
import { default as Card_product } from "../components/Product_Card";
import { default as Cart_Service } from "../components/Service_Card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { getAllCollection } from "../firebase/getCollections";
import { type_testimonials } from "../types/type_testimonials";
import Rating from "../components/Rating";

export default function Home() {
   const setting = useStore((state) => state.setting);
   const product = useStore((state) => state.product);
   const service = useStore((state) => state.service);
   const [testi,setTesti]= useState<type_testimonials[]|[undefined]>([])
   const { t ,i18n } = useTranslation();
   const [income,setIncome]=useState<{fr:string,en:string,it:string}|undefined>(undefined) 
// chagement des testimonials
useEffect(()=>{
   const promesses = [
      getAllCollection("testimonials"),
      getAllCollection("income")
    ];

    Promise.all(promesses).then(res =>{
      // recuperation des témoignages
      const testimonials = res[0]
      const t = testimonials.docs.map(item=>{
        const testimonials:type_testimonials = {
            name: item.data().name,
            message:  item.data().message,
            email:  item.data().email,
            note:  item.data().note,
            img:  item.data().img,
            show:  item.data().show,
            id: item.id,
         }
         return testimonials
      })
      setTesti(t)

       // récuperation de l'annonce

     const income = res[1].docs[0].data().income as string

     const t_income = {
      fr:income.split("&")[0],
      en:income.split("&")[1],
      it:income.split("&")[2]


     }
     setIncome(t_income)
     console.log(t_income);
     
     }).catch(err =>console.log(err))
},[])

   return (
      <div>
         <Helmet>
           <meta name="description" content="Reveal your inner beauty with our elegant, comfortable wigs. We offer a range of hair solutions tailored to your needs, without compromising on quality or the environment."/>
         </Helmet>
       
         <div
            style={{ backgroundImage: `url(${setting.img_welcome})` }}
            className="mt-14 img-welcome w-full  flex flex-col items-center justify-center h-72 lg:h-[700px] md:h-96 roboto-regular origin-top relative"
         >
               <p className=" absolute top-0 py-3 w-full text-center bg-neutral-200 roboto-light-italic text-lg"> 
              {

               income!==undefined && income![i18n.language as keyof typeof income] 
              }
            </p>


            {parse(t("welcome"))}
            <p className="lg:text-2xl italic text-black text-center w-full ">
               <Link
                  to={"product"}
                  className="mt-5 mx-auto justify-center btn px-10 py-3 rounded-full flex items-center w-40 h-8 lg:w-56 lg:h-10 arrow-link"
               >
                  {t("products").toLocaleLowerCase().replace("s", "")}{" "}
                  <AiOutlineArrowRight className="arrow hidden lg:block origin-top-left ms-2" />{" "}
               </Link>
            </p>
         </div>
         <p className="my-10">
            <h2 className="text-center roboto-black text-4xl capitalize">
               {t("our_products")}
            </h2>
            <h5 className="text-center roboto-light text-lg md:text-base lg:text-xl">
               {t("discover_our_products")}
            </h5>
         </p>

         {
            // debut de section produits
         }

         <section className="flex justify-center">
            <article className="grid grid-cols-1 px-3 md:gap-14 lg:gap-14 place-content-center lg:grid-cols-4 md:grid-cols-2  ">
               {product.slice(0, 4).map((item, index) => {
                  return (
                     <div key={index} className="mb-3">
                        <Card_product reveal={{ reset: true }} product={item} />
                     </div>
                  );
               })}
            </article>
         </section>
         {
            // fin de section services
         }

         {
            // debut de section banier service
         }

         <section
            style={{ backgroundImage: `url(/img/baner-product.png)` }}
            className="mt-14 img-baner-product  h-60 lg:h-[300px] md:h-96 roboto-regular origin-top relative "
         >
            <div className="h-full w-full text-white backdrop-brightness-75 flex flex-col items-center justify-center ">
               <p className="text-center roboto-bold  text-3xl lg:text-5xl">
                  {t("discover_services")}
               </p>
               <Link
                  to={"services"}
                  className="mt-5 btn px-10 py-3 rounded-full flex items-center arrow-link"
               >
                  {t("services")}{" "}
                  <AiOutlineArrowRight className="arrow hidden lg:block origin-top-left ms-2" />{" "}
               </Link>
            </div>
         </section>

         {
            // fin de section banier service
         }

         <p className="my-5">
            <h2 className="text-center roboto-black text-4xl capitalize">
               {t("our_services")}
            </h2>
            <h5 className="text-center roboto-light text-lg md:text-base lg:text-xl">
               {t("discover_our_services")}
            </h5>
         </p>

         {
            // debut de section services
         }

         <section className="flex mb-5 justify-center">
            <article className="grid grid-cols-1 md:gap-14 lg:gap-14 place-content-center lg:grid-cols-4 md:grid-cols-2  ">
               {service.slice(0, 4).map((item, index) => {
                  return (
                     <div key={index}>
                        <Cart_Service reveal={{ reset: true }} service={item} />
                     </div>
                  );
               })}
            </article>
         </section>

         {
            // fin de section services
         }

         <section
            style={{ backgroundImage: `url(/img/baner2.png)` }}
            className="mt-14 img-baner-product  h-60 lg:h-[300px] md:h-96 roboto-regular origin-top relative "
         >
            <div className="h-full w-full text-white backdrop-brightness-75 flex flex-col items-center justify-center ">
               <p className="text-center roboto-medium  text-2xl p-2 lg:w-1/2">
                  <span className="roboto-medium-italic">"</span>{" "}
                  {t("motivation")}{" "}
                  <span className="roboto-medium-italic">"</span> <br />{" "}
                  <span className="roboto-light pt-2">- Walt Disney</span>
               </p>
            </div>
         </section>

         <div className="mx-auto mt-3 text-center md:max-w-xl lg:max-w-3xl">
            <h3 className="mb-6 text-3xl font-bold">Testimonials</h3>
            <p className="mb-6 p-2 text-neutral-600 dark:text-neutral-300 md:mb-12 md:pb-0">
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
               error amet numquam iure provident voluptate esse quasi, veritatis
               totam voluptas nostrum quisquam eum porro a pariatur veniam.
            </p>
         </div>

         <div className="grid mx-5 mb-5 gap-6 text-center md:grid-cols-3 lg:gap-12">

            {
               testi.filter(item=>item?.show===true).length >=4 ?
               
               testi.slice(0,3).map(item=>{

                 if(item?.show) return <div className="mb-12 md:mb-0">

                  <div className="mb-6 flex justify-center">
                     <img
                        src={item?.img}
                        className="w-32 rounded-full shadow-lg dark:shadow-black/30"
                     />
                  </div>
                  <h5 className="mb-4 text-xl font-semibold">{item?.name}</h5>
                  <p className="mb-4 text-neutral-600 dark:text-neutral-300">
                     <span className="inline-block pe-2 [&>svg]:w-5">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="currentColor"
                           viewBox="0 0 448 512"
                        >
                           <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                        </svg>
                     </span>
                     {item?.message}
                  </p>
                  <div className="mb-0 flex items-center justify-center">
                  <Rating showAvis={false} iconSize="w-6" rating={parseInt(item?.note as string)}/>
                  </div>
                </div>
               })
               :
               <>
                     <div className="mb-12 md:mb-0">
                     <div className="mb-6 flex justify-center">
                        <img
                           src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).jpg"
                           className="w-32 rounded-full shadow-lg dark:shadow-black/30"
                        />
                     </div>
                     <h5 className="mb-4 text-xl font-semibold">Maria Smantha</h5>
                     <h6 className="mb-4 font-semibold text-primary dark:text-primary-400">
                        Web Developer
                     </h6>
                     <p className="mb-4 text-neutral-600 dark:text-neutral-300">
                        <span className="inline-block pe-2 [&>svg]:w-5">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 448 512"
                           >
                              <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                           </svg>
                        </span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                        eos id officiis hic tenetur quae quaerat ad velit ab hic
                        tenetur.
                     </p>
                     <ul className="mb-0 flex items-center justify-center">
                        <li>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-5 w-5 text-yellow-500"
                           >
                              <path
                                 fill-rule="evenodd"
                                 d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                 clip-rule="evenodd"
                              />
                           </svg>
                        </li>
                        <li>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-5 w-5 text-yellow-500"
                           >
                              <path
                                 fill-rule="evenodd"
                                 d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                 clip-rule="evenodd"
                              />
                           </svg>
                        </li>
                        <li>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-5 w-5 text-yellow-500"
                           >
                              <path
                                 fill-rule="evenodd"
                                 d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                 clip-rule="evenodd"
                              />
                           </svg>
                        </li>
                        <li>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-5 w-5 text-yellow-500"
                           >
                              <path
                                 fill-rule="evenodd"
                                 d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                 clip-rule="evenodd"
                              />
                           </svg>
                        </li>
                        <li>
                           <svg
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                              fill="currentColor"
                              className="h-5 w-5 text-yellow-500"
                              stroke-linejoin="round"
                              stroke-miterlimit="2"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44zm.678 2.033v11.904l4.707 2.505-.951-5.236 3.851-3.662-5.314-.756z"
                                 fill-rule="nonzero"
                              />
                           </svg>
                        </li>
                     </ul>
                     </div>
                     <div className="mb-12 md:mb-0">
                        <div className="mb-6 flex justify-center">
                           <img
                              src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(2).jpg"
                              className="w-32 rounded-full shadow-lg dark:shadow-black/30"
                           />
                        </div>
                        <h5 className="mb-4 text-xl font-semibold">Lisa Cudrow</h5>
                        <h6 className="mb-4 font-semibold text-primary dark:text-primary-400">
                           Graphic Designer
                        </h6>
                        <p className="mb-4 text-neutral-600 dark:text-neutral-300">
                           <span className="inline-block pe-2 [&>svg]:w-5">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor"
                                 viewBox="0 0 448 512"
                              >
                                 <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                              </svg>
                           </span>
                           Ut enim ad minima veniam, quis nostrum exercitationem ullam
                           corporis suscipit laboriosam, nisi ut aliquid commodi.
                        </p>
                        <ul className="mb-0 flex items-center justify-center">
                           <li>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 fill="currentColor"
                                 className="h-5 w-5 text-yellow-500"
                              >
                                 <path
                                    fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clip-rule="evenodd"
                                 />
                              </svg>
                           </li>
                           <li>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 fill="currentColor"
                                 className="h-5 w-5 text-yellow-500"
                              >
                                 <path
                                    fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clip-rule="evenodd"
                                 />
                              </svg>
                           </li>
                           <li>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 fill="currentColor"
                                 className="h-5 w-5 text-yellow-500"
                              >
                                 <path
                                    fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clip-rule="evenodd"
                                 />
                              </svg>
                           </li>
                           <li>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 fill="currentColor"
                                 className="h-5 w-5 text-yellow-500"
                              >
                                 <path
                                    fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clip-rule="evenodd"
                                 />
                              </svg>
                           </li>
                           <li>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 fill="currentColor"
                                 className="h-5 w-5 text-yellow-500"
                              >
                                 <path
                                    fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clip-rule="evenodd"
                                 />
                              </svg>
                           </li>
                        </ul>
                     </div>
                     <div className="mb-0">
                        <div className="mb-6 flex justify-center">
                           <img
                              src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(9).jpg"
                              className="w-32 rounded-full shadow-lg dark:shadow-black/30"
                           />
                        </div>
                        <h5 className="mb-4 text-xl font-semibold">John Smith</h5>
                        <h6 className="mb-4 font-semibold text-primary dark:text-primary-400">
                           Marketing Specialist
                        </h6>
                        <p className="mb-4 text-neutral-600 dark:text-neutral-300">
                           <span className="inline-block pe-2 [&>svg]:w-5">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor"
                                 viewBox="0 0 448 512"
                              >
                                 <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                              </svg>
                           </span>
                           At vero eos et accusamus et iusto odio dignissimos ducimus qui
                           blanditiis praesentium voluptatum deleniti atque corrupti.
                        </p>
                        <ul className="mb-0 flex items-center justify-center">
                           <li>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 fill="currentColor"
                                 className="h-5 w-5 text-yellow-500"
                              >
                                 <path
                                    fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clip-rule="evenodd"
                                 />
                              </svg>
                           </li>
                           <li>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 fill="currentColor"
                                 className="h-5 w-5 text-yellow-500"
                              >
                                 <path
                                    fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clip-rule="evenodd"
                                 />
                              </svg>
                           </li>
                           <li>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 fill="currentColor"
                                 className="h-5 w-5 text-yellow-500"
                              >
                                 <path
                                    fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clip-rule="evenodd"
                                 />
                              </svg>
                           </li>
                           <li>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 fill="currentColor"
                                 className="h-5 w-5 text-yellow-500"
                              >
                                 <path
                                    fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clip-rule="evenodd"
                                 />
                              </svg>
                           </li>
                           <li>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 className="h-5 w-5 text-yellow-500"
                                 viewBox="0 0 24 24"
                                 stroke-width="1.5"
                                 stroke="currentColor"
                              >
                                 <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                 />
                              </svg>
                           </li>
                        </ul>
                     </div>
                     
               </>
            }

           
         </div>
      </div>
   );
}
