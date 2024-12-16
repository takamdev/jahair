import parse from "html-react-parser"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"

const about = {
  fr:`
   <div className="mt-14 py-5 container  mb-14 mx-auto">
    <div className="lg:w-1/2 px-5 mx-auto policyPrivacy  roboto-regular ">
    <h1 className="font-bold text-center text-2xl">À Propos de JAHAIRSTYLE</h1>

    <p className="mt-3 text-justify">
      Bienvenue chez <span className="font-bold">JAHAIRSTYLE</span>, votre destination incontournable pour les soins capillaires et les
      perruques ! Dans un monde où l'apparence a un impact significatif sur nos vies, j'ai decidé de
      faire une différence. Après avoir souvent rencontré des problèmes de qualité avec les perruques
      que je commandais, j'ai réalisé que beaucoup partageaient ces frustrations. Cela m'a motivée à
      proposer des produits de différentes qualités à des prix abordables.
    </p>

    <h3 className="font-semibold mt-5 text-start text-2lg">Mon Histoire</h3>
    <p className="mt-3 text-justify">
    <b>JAHAIRSTYLE</b> a été fondée par une étudiante étrangère vivant dans un pays de l’UE, passionnée
    par le développement personnel, les Relations internationales l’esthétique, la coiffure, la mode et
    le sport. Confrontée à un besoin de ressources financières, j’ai souhaitée offrir des solutions
    capillaires adaptées à chaque femme, indépendamment de sa couleur de peau. Mon objectif est
    de créer depuis 2016 une synergie entre la beauté des cheveux naturel et les styles audacieux
    permettant à chaque femme d’exprimer son identité avec fierté, tout en s’éloignant des
    stéréotypes.   <b>JAHAIRSTYLE</b> célèbre la diversité et vise à valoriser tous les types de cheveux et
    styles, en proposant des produits qui encouragent l’authenticité. C’est cette passion pour la
    beauté sous toutes ses formes qui a donné naissance à   <b>JAHAIRSTYLE</b>.
    </p>



    <h3 className="font-semibold mt-5 text-start text-2lg">Nos Produits</h3>
    <p className="mt-3 text-justify">
    Nous proposons une sélection de perruques et d’extensions capillaire de qualité variée conçus
    pour un look naturel et confortable. Nos look visent à simplifier la vie des femmes, qu'elles
    souhaitent changer de style ou couvrir des cheveux clairsemés avec des prix allant des plus
    abordables a plus premium. Nous avons également introduit des accessoires pour garantir une
    pose parfaite et un entretien adéquat.
    </p>


    <h3 className="font-semibold mt-5 text-start text-2lg">Notre Engagement</h3>
    <p className="mt-3 text-justify">
    Nous nous engageons à offrir des produits satisfaisant aux attentes de nos clientes, testées et
    approuvées par de nombreuses utilisatrices . La transparence et l’intégrité sont essentielles pour
    nous, c'est pourquoi nous fournissons des informations claires et des conseils d'utilisation
    </p>

    <h3 className="font-semibold mt-5 text-start text-2lg">Pourquoi Choisir <b>JAHAIRSTYLE</b>?</h3>
     <ul className="mt-3">
      <li>-<b>Qualité Supérieure</b>: Matériaux de haute qualité pour durabilité et performance.</li>
      <li>-<b>Service Client Exceptionnel</b>: Assistance à chaque étape pour des conseils et solutions.</li>
      <li>-<b>Communauté</b>: Rejoignez-nous sur les réseaux sociaux pour des conseils et inspirations</li>
      <li>-<b>Produits adaptés à toutes</b>: Matériaux semi-naturels et fibres de qualité.</li>
     </ul>

     <p className="mt-3 text-justify">
        Je reconnais la beauté des cheveux afro et mes produits visent à célébrer aussi nos racines. En
        tant que femme noire, et surtout en tant qu'Africaine, je crois en la liberté d'explorer différentes
        coiffures sans dévaloriser notre identité. L'une de mes plus grandes aspirations est de voir les
        femmes confiantes, qu'elles portent une perruque ou non.
    </p>


    <h3 className="font-semibold mt-5 text-start text-2lg">Rejoignez-Nous</h3>
    <p className="mt-3 text-justify">
    Merci de faire partie de cette belle aventure. Ensemble, célébrons la beauté et l'authenticité sous
    toutes leurs formes ! N'hésitez pas à explorer notre site et à nous contacter pour toute question.
    </p>
    <p className="font-bold underline">Chez JAHAIRSTYLE, nous sommes là pour vous accompagner dans votre parcours beauté !</p>
    </div>
  
  </div>
  `,
  en:`
  <div className="mt-14 py-5 container mb-14  mx-auto">
    <div className="lg:w-1/2 px-5 mx-auto policyPrivacy  roboto-regular ">
    <h1 className="font-bold text-center text-2xl">About JAHAIRSTYLE</h1>

    <p className="mt-3 text-justify">
    Welcome to <b>JAHAIRSTYLE</b> , your go-to destination for hair care and wigs! In a world where
    appearance has a significant impact on our lives, I decided to make a difference. After often
    experiencing quality issues with the wigs I ordered, I realized that many shared these frustrations.
    This motivated me to offer products of different qualities at affordable prices.
    </p>

    <h3 className="font-semibold mt-5 text-start text-2lg">My Story</h3>
    <p className="mt-3 text-justify">
     <b>JAHAIRSTYLE</b> was founded by a foreign student living in an EU country, who is passionate about
    personal development, International Relations, aesthetics, hairdressing, fashion and sports.
    Faced with a need for financial resources, I wanted to offer hair solutions adapted to each
    woman, regardless of her skin color. Since 2016, my goal has been to create a synergy between
    the beauty of natural hair and bold styles allowing each woman to express her identity with pride,
    while moving away from stereotypes. <b>JAHAIRSTYLE</b> celebrates diversity and aims to enhance all
    hair types and styles, offering products that encourage authenticity. It is this passion for beauty in
    all its forms that gave birth to <b>JAHAIRSTYLE</b>.
    </p>



    <h3 className="font-semibold mt-5 text-start text-2lg">Our Products</h3>
    <p className="mt-3 text-justify">
    We offer a selection of wigs and hair extensions of varying quality designed for a natural and
    comfortable look. Our looks aim to simplify women's lives, whether they want to change their
    style or cover thinning hair with prices ranging from the most affordable to the most premium.
    We have also introduced accessories to ensure perfect installation and proper maintenance.
    </p>


    <h3 className="font-semibold mt-5 text-start text-2lg">Our Commitment</h3>
    <p className="mt-3 text-justify">
    We are committed to offering products that meet the expectations of our customers, tested and
    approved by many users. Transparency and integrity are essential to us, which is why we provide
    clear information and guidance on how to use it.
    </p>

    <h3 className="font-semibold mt-5 text-start text-2lg">Why choose<b>JAHAIRSTYLE</b>?</h3>
     <ul className="mt-3">
      <li>-<b>Premium Quality</b>: High quality materials for durability and performance.</li>
      <li>-<b>Exceptional Customer Service</b>: Support every step of the way for advice and solutions.</li>
      <li>-<b>Community:</b>:Join us on social media for tips and inspiration.</li>
      <li>-<b>Products suitable for all</b>: emi-natural materials and quality fibres.</li>
     </ul>

     <p className="mt-3 text-justify">
      I recognize the beauty of afro hair and my products aim to celebrate our roots as well. As a
      black woman, and especially as an African, I believe in the freedom to explore different hairstyles
      without devaluing our identity. One of my biggest aspirations is to see confident women, whether
      they wear a wig or not.
    </p>


    <h3 className="font-semibold mt-5 text-start text-2lg">Join</h3>
    <p className="mt-3 text-justify">
    Thank you for being part of this great adventure. Together, let's celebrate beauty and authenticity
    in all their forms! Feel free to explore our site and contact us with any questions.
    </p>
    <p className="font-bold underline">At JAHAIRSTYLE, we are here to support you on your beauty journey!</p>
    </div>
  
  </div>
  `,it:`
  <div className="mt-14 py-5 container mb-14  mx-auto">
    <div className="lg:w-1/2 px-5 mx-auto policyPrivacy  roboto-regular ">
    <h1 className="font-bold text-center text-2xl">Informazioni su JAHAIRSTYLE</h1>

    <p className="mt-3 text-justify">
    Benvenuto su <b>JAHAIRSTYLE</b>, la tua destinazione di riferimento per la cura dei capelli e le
    parrucche! In un mondo in cui l'apparenza ha un impatto significativo sulle nostre vite, ho deciso
    di fare la differenza. Dopo aver spesso riscontrato problemi di qualità con le parrucche che ho
    ordinato, mi sono resa conto che molti condividevano queste frustrazioni. Questo mi ha motivato
    a offrire prodotti di diverse qualità a prezzi accessibili.
    </p>

    <h3 className="font-semibold mt-5 text-start text-2lg">La mia storia</h3>
    <p className="mt-3 text-justify">
     <b>JAHAIRSTYLE</b> è stata fondata da uno studente straniero che vive in un paese dell'UE,
    appassionato di sviluppo personale, relazioni internazionali, estetica, parrucchiere, moda e sport.
    Di fronte alla necessità di risorse finanziarie, volevo offrire soluzioni per capelli adatte a ogni
    donna, indipendentemente dal colore della sua pelle. Dal 2016, il mio obiettivo è stato quello di
    creare una sinergia tra la bellezza dei capelli naturali e stili audaci che permettesse a ogni donna
    di esprimere la propria identità con orgoglio, allontanandosi dagli stereotipi. <b>JAHAIRSTYLE</b>
    celebra la diversità e mira a valorizzare tutti i tipi di capelli e gli stili, offrendo prodotti che
    incoraggiano l'autenticità. È questa passione per la bellezza in tutte le sue forme che ha dato vita
    a <b>JAHAIRSTYLE</b>.
    </p>



    <h3 className="font-semibold mt-5 text-start text-2lg">I nostri prodotti</h3>
    <p className="mt-3 text-justify">
    Offriamo una selezione di parrucche ed extension per capelli di varia qualità progettate per un
    look naturale e confortevole. I nostri look mirano a semplificare la vita delle donne, sia che
    vogliano cambiare il loro stile o coprire il diradamento dei capelli con prezzi che vanno dal più
    conveniente al più premium. Abbiamo introdotto anche degli accessori per garantire una
    perfetta installazione e una corretta manutenzione.
    </p>


    <h3 className="font-semibold mt-5 text-start text-2lg">Il nostro impegno</h3>
    <p className="mt-3 text-justify">
    Ci impegniamo a offrire prodotti che soddisfino le aspettative dei nostri clienti, testati e approvati
    da molti utenti. La trasparenza e l'integrità sono essenziali per noi, motivo per cui forniamo
    informazioni e indicazioni chiare su come utilizzarle.
    </p>

    <h3 className="font-semibold mt-5 text-start text-2lg">Perché scegliere<b>JAHAIRSTYLE</b>?</h3>
     <ul className="mt-3">
      <li>-<b>Qualità premium</b>: materiali di alta qualità per durata e prestazioni.</li>
      <li>-<b>EServizio clienti eccezionale</b>:supporto in ogni fase del processo per consigli e soluzioni.</li>
      <li>-<b>Comunità</b>:unisciti a noi sui social media per suggerimenti e ispirazione.</li>
      <li>-<b>Prodotti adatti a tutti</b>:materiali semi-naturali e fibre di qualità.</li>
     </ul>

     <p className="mt-3 text-justify">
      <b>Riconosco</b> la bellezza dei capelli afro e i miei prodotti mirano a celebrare anche le nostre radici.
      Come donna nera, e soprattutto come africana, credo nella libertà di esplorare diverse
      acconciature senza svalutare la nostra identità. Una delle mie più grandi aspirazioni è vedere
      donne sicure di sé, che indossino una parrucca o meno.
    </p>


    <h3 className="font-semibold mt-5 text-start text-2lg">Unire</h3>
    <p className="mt-3 text-justify">
    Grazie per aver fatto parte di questa grande avventura. Insieme, celebriamo la bellezza e
    l'autenticità in tutte le loro forme! Non esitate a esplorare il nostro sito e a contattarci per
    qualsiasi domanda.
    </p>
    <p className="font-bold underline">ANoi di JAHAIRSTYLE siamo qui per supportarti nel tuo percorso di bellezza!</p>
    </div>
  
  </div>
  `

}



function AboutUs() {
  const {i18n} = useTranslation()
  return (
    <div>
      <Helmet> <title>Accueil</title> <meta name="description" content="Bienvenue sur la page apropos de jahairstyle." /> </Helmet>
      {parse(about[i18n.language as keyof typeof about])}
    </div>
    
  )
}

export default AboutUs