import useStore from "../store"
import { useTranslation } from "react-i18next"
import { List } from "flowbite-react"
import { Accordion } from "flowbite-react";

function Faq() {
  const {i18n} = useTranslation()
  if(i18n.language==="fr") return <Faq_fr/>
     else return <Faq_en/>

}

export default Faq


function Faq_en(){
  const setting = useStore(state=>state.setting)
 const contact = setting.email_site
  return (

    <div className="mt-14 py-5 container  mx-auto">
    <div className="lg:w-1/2 px-5 mx-auto policyPrivacy  roboto-regular ">
       <h1 className="font-medium text-3xl">FAQ</h1>
      <Accordion className="mt-8">
      <Accordion.Panel>
        <Accordion.Title className="font-bold">1. What types of products do you offer?</Accordion.Title>
        <Accordion.Content>
          <p className="mt-3">
            We offer a wide range of hair products, hair accessories, slimming girdles, eyelash extensions and
            more.
          </p>
        </Accordion.Content>
      </Accordion.Panel>

      <Accordion.Panel>
        <Accordion.Title className="font-bold">2. How can I place an order?</Accordion.Title>
        <Accordion.Content>
        <p className="mt-3">
          You can place an order directly on our site by adding the desired products to your cart and
          following the payment instructions.
          </p>
        </Accordion.Content>
      </Accordion.Panel>
         

      <Accordion.Panel>
        <Accordion.Title className="font-bold">3. What payment methods do you accept?</Accordion.Title>
        <Accordion.Content>
          <p className="mt-3">
            We accept several payment methods, including credit cards, PayPal, and other secure methods.
          </p>
        </Accordion.Content>
      </Accordion.Panel>

      <Accordion.Panel>
        <Accordion.Title className="font-bold">4. How can I track my order?</Accordion.Title>
        <Accordion.Content>
        <p className="mt-3">
          After placing your order, you will receive a confirmation email with a link to track your shipment.
          </p>
        </Accordion.Content>
      </Accordion.Panel>
          
        
      <Accordion.Panel>
        <Accordion.Title className="font-bold">5. What is your return policy?</Accordion.Title>
        <Accordion.Content>
        <p className="mt-3">
          We accept returns within 7 days from the date of receipt, as long as the items are unused and in
            their original packaging. Returns are at your own expense. Please see our [Return Policy] for
            more details.
          </p>
        </Accordion.Content>
      </Accordion.Panel>

      <Accordion.Panel>
        <Accordion.Title className="font-bold">6. Do you offer samples or promotions?</Accordion.Title>
        <Accordion.Content>
        <p className="mt-3">
          Yes, we occasionally offer free samples and promotions. Subscribe to our newsletter and our
            social networks instagram, tiktok, facebook to be informed of the latest offers!
            Do wigs have built-in elastics?
            Yes, our wigs are equipped with a built-in elastic, allowing for an optimal fit for increased comfort.
          </p>
        </Accordion.Content>
      </Accordion.Panel>


      <Accordion.Panel>
        <Accordion.Title className="font-bold">7. Can I change or cancel my order?</Accordion.Title>
        <Accordion.Content>
        <p className="mt-3">
          You can change or cancel your order as long as it has not yet been shipped. Contact our customer
          service as soon as possible for any inquiries
          </p>
        </Accordion.Content>
      </Accordion.Panel>


      <Accordion.Panel>
        <Accordion.Title className="font-bold">8. How can I contact customer service?</Accordion.Title>
        <Accordion.Content>
          <p className="mt-3">
            You can contact us via our contact form on the website, via the Whatsapp link accessible on the
            website, or by email at <a className="underline" href={`mailto:${contact}`}>contact@jahairstyle.com</a>. We will
            endeavour to respond as soon as possible.
          </p>
        </Accordion.Content>
      </Accordion.Panel>


      <Accordion.Panel>
        <Accordion.Title className="font-bold">9. Can you cut tulle?</Accordion.Title>
        <Accordion.Content>
          <p className="mt-3">
            Yes, we can cut the tulle on your wigs, but please note that the return of these will no longer be
            possible after this operation. Join us on TikTok (jahairstyle) for a tutorial on how to cut lace.
            What is the difference between full lace and front lace?
            The full lace covers the entire head with hair tied one by one, while the front lace has hair tied
            only at the front, the rest being machine-sewn weave bands.
            What types of tulle are available?
            We offer several types of tulle, from the most invisible to the least invisible. Ultra HD Plus is the
            most discreet, but also the most expensive. The 13×6 offers a wider tulle for a deeper parting,
            available in classic and Ultra HD we also have the tulles in 13×4 then 13×2.
            </p>
        </Accordion.Content>
      </Accordion.Panel>

         


      <Accordion.Panel>
        <Accordion.Title className="font-bold">10. What if the product I want is not available?</Accordion.Title>
        <Accordion.Content>
           <p className="mt-3">
              Call us at 00393289705026 or via WhatsApp so that we can inform you or redirect you to other
              similar options.
            </p>
        </Accordion.Content>
      </Accordion.Panel>
         

      <Accordion.Panel>
        <Accordion.Title className="font-bold">11. What if I didn't receive the right size or color?</Accordion.Title>
        <Accordion.Content>
        <p className="mt-3">
            Contact us at <a className="underline" href={`mailto:${contact}`}>contact@jahairstyle.com</a> with your order
            number, and we'll solve the problem as soon as possible!
            </p>
        </Accordion.Content>
      </Accordion.Panel>


        <Accordion.Panel>
        <Accordion.Title className="font-bold">12. What is a lace wig?</Accordion.Title>
        <Accordion.Content>
        <p className="mt-3">
            A lace wig is an undetectable wig, where the hair is tied one by one on a light and breathable
            tulle. It is designed for a natural effect, allowing you to achieve all hairstyles as with real hair.
            </p>
        </Accordion.Content>
      </Accordion.Panel>   


      <Accordion.Panel>
        <Accordion.Title className="font-bold">13. Can I wear a lace wig if I have alopecia?</Accordion.Title>
        <Accordion.Content>
        <p className="mt-3">
            Yes, the lace wig is especially suitable for those who have no hair left due to alopecia. The lace
            wig is an ideal solution for people suffering from hair loss, as the tulle it is made of is specially
            designed to be undetectable on the skin, providing a natural and realistic look.
            It allows you to customize your look with different styles, lengths, and colors. The lace wig is
            versatile and secure for everyday use, providing comfort, naturalness, and style.
            </p>
        </Accordion.Content>
      </Accordion.Panel>  


      <Accordion.Panel>
        <Accordion.Title className="font-bold">14. I have an abundance of hair, is it possible to wear a lace wig?</Accordion.Title>
        <Accordion.Content>
        <p className="mt-3">
            It is possible to wear a lace wig with a lot of hair, flattening or braiding it for an authentic result.
            Opt for a slightly larger wig if necessary.
            <List className="mt-3 ps-5 text-black">
                  <List.Item>Choose a lace wig taking into account the color and texture of your hair.</List.Item>

                  <List.Item>Maintain it carefully to avoid knots and damage.</List.Item>
                </List>
            </p>
        </Accordion.Content>
      </Accordion.Panel>  


        </Accordion>
        <p className="my-10 font-bold underline">NB: Consult us via our social networks for personalized advice on its choice and maintenance.</p>
    </div>
    </div>
  )
    
    
} 

function Faq_fr(){
  const setting = useStore(state=>state.setting)
  const contact = setting.email_site
  return (
    <div className="mt-14 py-5 container  mx-auto">
    <div className="lg:w-1/2 px-5 mx-auto policyPrivacy  roboto-regular ">
       <h1 className="font-medium text-3xl">FAQ</h1>
       <Accordion className="mt-8">

       <Accordion.Panel>
        <Accordion.Title className="font-bold">1. Quels types de produits proposez-vous ?</Accordion.Title>
        <Accordion.Content>
            <p className="mt-3">
          Nous proposons une large gamme de produits capillaire, accessoires pour cheveux, gaines
          amincissantes, extensions de cils et autres.
          </p>
        </Accordion.Content>
      </Accordion.Panel>

      <Accordion.Panel>
        <Accordion.Title className="font-bold">2. Comment puis-je passer une commande ?</Accordion.Title>
        <Accordion.Content>
            <p className="mt-3">
            Vous pouvez passer une commande directement sur notre site en ajoutant les produits souhaités
            à votre panier et en suivant les instructions de paiement.
          </p>
        </Accordion.Content>
      </Accordion.Panel>

      <Accordion.Panel>
        <Accordion.Title className="font-bold">3. Quels modes de paiement acceptez-vous ?</Accordion.Title>
        <Accordion.Content>
          <p className="mt-3">
        Nous acceptons plusieurs modes de paiement, y compris les cartes de crédit, PayPal et d'autres
        méthodes sécurisées.
        </p>
        </Accordion.Content>
      </Accordion.Panel>


      <Accordion.Panel>
        <Accordion.Title className="font-bold">4. Comment puis-je suivre ma commande ?</Accordion.Title>
        <Accordion.Content>
          <p className="mt-3">
            Après avoir passé votre commande, vous recevrez un e-mail de confirmation contenant un lien
            pour suivre votre envoi.
          </p>
        </Accordion.Content>
      </Accordion.Panel>


      <Accordion.Panel>
        <Accordion.Title className="font-bold">5. Quelle est votre politique de retour ?</Accordion.Title>
        <Accordion.Content>
            <p className="mt-3">
            Nous acceptons les retours dans un délai de 7 jours à compter de la date de réception, à
            condition que les articles soient non utilisés et dans leur emballage d'origine. Les retours sont a
            vos frais. Veuillez consulter notre [Politique de Retour] pour plus de détails.
          </p>
        </Accordion.Content>
      </Accordion.Panel>

      <Accordion.Panel>
        <Accordion.Title className="font-bold">6. Offrez-vous des échantillons ou des promotions ?</Accordion.Title>
        <Accordion.Content>
            <p className="mt-3">
          Oui, nous proposons occasionnellement des échantillons gratuits et des promotions. Abonnez-
          vous à notre newsletter et a nos reseaux sociaux instagram, tiktok, facebook pour être informé
          des dernières offres !
          </p>
        </Accordion.Content>
      </Accordion.Panel>

      <Accordion.Panel>
        <Accordion.Title className="font-bold">7. Les perruques ont-elles des élastiques intégrés ?</Accordion.Title>
        <Accordion.Content>
        <p className="mt-3">
        Oui, nos perruques sont équipées d'un élastique intégré, permettant un ajustement optimal pour
        un confort accru.
       </p>
        </Accordion.Content>
      </Accordion.Panel>


      <Accordion.Panel>
        <Accordion.Title className="font-bold">8.Puis-je modifier ou annuler ma commande ?</Accordion.Title>
        <Accordion.Content>
            <p className="mt-3">
          Vous pouvez nous contacter via notre formulaire de contact sur le site via le lien Whatsapp
          accessible sur le site ou par e-mail à <a className="underline" href={`mailto:${contact}`}>contact@jahairstyle.com</a>
          Nous nous efforcerons de répondre dans les plus brefs délais.

          
          </p>
        </Accordion.Content>
      </Accordion.Panel>



      <Accordion.Panel>
        <Accordion.Title className="font-bold">9. Comment puis-je contacter le service client ?</Accordion.Title>
        <Accordion.Content>
        <p className="mt-3">
       Vous pouvez nous contacter via notre formulaire de contact sur le site via le lien Whatsapp
        accessible sur le site ou par e-mail à <a className="underline" href={`mailto:${contact}`}>contact@jahairstyle.com</a>.
        Nous nous efforcerons de répondre dans les plus brefs délais.
        </p>
        </Accordion.Content>
      </Accordion.Panel>

       


      

      <Accordion.Panel>
        <Accordion.Title className="font-bold">10. Pouvez-vous couper la tulle ?</Accordion.Title>
        <Accordion.Content>
        <p className="mt-3">
        Oui, nous pouvons couper la tulle sur vos perruques, mais veuillez noter que le retour de celles-ci
        ne sera plus possible après cette opération. Rejoignez-nous sur TikTok (jahairstyle) pour un
        tutoriel sur comment couper la lace.
        </p>
        </Accordion.Content>
      </Accordion.Panel>


      <Accordion.Panel>
        <Accordion.Title className="font-bold">11.Quelle est la différence entre full lace et lace frontal ?</Accordion.Title>
        <Accordion.Content>
        <p className="mt-3">
          La full lace couvre entièrement la tête avec des cheveux noués un à un, tandis que la lace frontal
          n’a des cheveux attachés qu’à l’avant, le reste étant constitué de bandes de tissage cousues à la
          machine.
        </p>
        </Accordion.Content>
      </Accordion.Panel>

       

      

      <Accordion.Panel>
        <Accordion.Title className="font-bold">12. Quelles sont les types de tulle disponibles ?</Accordion.Title>
        <Accordion.Content>
        <p className="mt-3">
        Nous proposons plusieurs types de tulle, de la plus invisible à la moins invisible. L'Ultra HD Plus
        est le plus discret, mais également le plus cher. Le 13×6 offre une tulle plus large pour une raie
        plus profonde, disponible en classique et Ultra HD nous avons egalement les tulles en 13×4 puis
        13×2 .
        </p>
        </Accordion.Content>
      </Accordion.Panel>

      
       
      <Accordion.Panel>
        <Accordion.Title className="font-bold">13. Que faire si le produit que je veux n'est pas disponible ?</Accordion.Title>
        <Accordion.Content>
        <p className="mt-3">
        Appelez-nous au 00393289705026 ou via whatsapp pour que nous puissions vous renseigner ou
vous    rediriger vers d'autres options similaires.
        </p>
        </Accordion.Content>
      </Accordion.Panel>

      
      <Accordion.Panel>
        <Accordion.Title className="font-bold">14. Que faire si je n'ai pas reçu la bonne taille ou couleur ?</Accordion.Title>
        <Accordion.Content>
        <p className="mt-3">
        Contactez-nous à <a className="underline" href={`mailto:${contact}`}>contact@jahairstyle.com</a> avec votre numéro
        de commande, et nous résoudrons le problème au plus vite !
        </p>
        </Accordion.Content>
      </Accordion.Panel>
        


      <Accordion.Panel>
        <Accordion.Title className="font-bold">15. Qu'est-ce qu'une perruque lace wig ?</Accordion.Title>
        <Accordion.Content>
        <p className="mt-3">
        Une perruque lace wig est une perruque indétectable, où les cheveux sont attachés un à un sur
        un tulle léger et résistant. Elle est conçue pour un effet naturel, permettant de réaliser toutes les
        coiffures comme avec des cheveux réels.
        </p>
        </Accordion.Content>
      </Accordion.Panel>

      <Accordion.Panel>
        <Accordion.Title className="font-bold">16. Puis-je porter une lace wig si je souffre d'alopécie ?</Accordion.Title>
        <Accordion.Content>
        <p className="mt-3">
        Oui, la perruque lace wig est particulièrement adaptée pour ceux qui n'ont plus de cheveux en
        raison de l'alopécie. La lace wig est une solution idéale pour les personnes souffrant de perte de
        cheveux, car le tulle dont elle est faite est spécialement conçu pour être indétectable sur la peau,
        offrant ainsi un look naturel et réaliste.
        Elle permet de personnaliser votre look avec différents styles, longueurs et couleurs. La lace wig
        est polyvalente et sécurisée pour une utilisation quotidienne, offrant confort, naturel et style.
        </p>
        </Accordion.Content>
      </Accordion.Panel>


      <Accordion.Panel>
        <Accordion.Title className="font-bold">17. J'ai une abondance de cheveux, est-il envisageable de porter une
        lace wig ?</Accordion.Title>
        <Accordion.Content>
        <List className="mt-3  ps-5 text-black">
               <List.Item>
               Il est possible de porter une lace wig avec beaucoup de cheveux, en les plaquant ou les
                tressant pour un résultat authentique. Optez pour une perruque légèrement plus grande si
                nécessaire.
               </List.Item>

               <List.Item>
               Choisissez une lace wig en tenant compte de la couleur et texture de vos cheveux.
                  Entretenez-la avec soin pour éviter les nœuds et les dommages. Consultez nous via nos
                  réseaux sociaux pour des conseils personnalisés sur son choix et son entretien.
                </List.Item>
         </List>
        </Accordion.Content>
      </Accordion.Panel>
       </Accordion>
      

    </div>
    </div>
    
  )
}