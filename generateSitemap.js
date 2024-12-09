import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import path from "path";
import { dirname } from "path";
import { collection,getDocs} from "firebase/firestore/lite";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { getFirestore } from "firebase/firestore/lite";
import { initializeApp } from "firebase/app";

//config
export const firebaseConfig = {
   apiKey: process.env.apiKey,
   authDomain: "jahair-style.firebaseapp.com",
   projectId: "jahair-style",
   storageBucket: "jahair-style.appspot.com",
   messagingSenderId: "437994101250",
   appId: process.env.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getAllCollection = async (collection_name) => {
   const collection_ref = collection(db, collection_name);
   try {
      return getDocs(collection_ref);
   } catch (error) {
      return error;
   }
};

async function generateSitemap() {
   const links = [
      { url: "/", changefreq: "daily", priority: 1.0 },
      { url: "/about", changefreq: "weekly", priority: 0.8 },
      { url: "/product", changefreq: "daily", priority: 1.0 },
      { url: "/services", changefreq: "weekly", priority: 0.8 },
      { url: "/about-us", changefreq: "daily", priority: 1.0 },
      { url: "/contact", changefreq: "weekly", priority: 0.8 },
      { url: "/faq", changefreq: "daily", priority: 1.0 },
      { url: "/terms-and-conditions", changefreq: "weekly", priority: 0.8 },
      { url: "/privacy-policy", changefreq: "daily", priority: 1.0 },   
   ];

   const promesses = [getAllCollection("product"), getAllCollection("service")];

try {
   const res = await Promise.all(promesses)

      if (res[0].size === 0) return;
         if (res[1].size === 0) return;
         res[0].docs.map((item) => {
            links.push({
               url: `/product/${item.id}`,
               changefreq: "weekly",
               priority: 0.7,
            });
         });
         res[1].docs.map((item) => {
            links.push({
               url: `/service/${item.id}`,
               changefreq: "weekly",
               priority: 0.7,
            });
         });
} catch (error) {
   console.log(error);
   
}
   
   
   const stream = new SitemapStream({ hostname: "https://jahairstyle.com" });
   const writeStream = createWriteStream(
      path.join(__dirname, "dist", "sitemap.xml")
   );
   stream.pipe(writeStream);
   links.forEach((link) => {
      stream.write(link);
   });
   stream.end();
   await streamToPromise(stream);
   console.log("Sitemap generated successfully.");
}
generateSitemap();
