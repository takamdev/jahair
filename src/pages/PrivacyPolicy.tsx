import { List } from "flowbite-react";
import useStore from "../store";

function PrivacyPolicy() {
   const setting = useStore((state) => state.setting);
   return (
      <div className="mt-14 py-5 container  mx-auto">
         <div className="lg:w-1/2 px-5 mx-auto policyPrivacy  roboto-regular ">
            <h1 className="font-medium text-3xl">Privacy Policy</h1>
            <p className="mt-8">
               {setting.email_site} website is owned by Jahair Style, which is a
               data controller of your personal data.
            </p>
            <p className=" text-justify mt-3">
               We have adopted this Privacy Policy, which determines how we are
               processing the information collected by Jahair-Style.com, which
               also provides the reasons why we must collect certain personal
               data about you. Therefore, you must read this Privacy Policy
               before using Jahair-Style.com website.
            </p>
            <p className="mt-3">
               We take care of your personal data and undertake to guarantee its
               confidentiality and security.
            </p>
            <h2 className="font-normal text-2xl mt-3">
               Personal information we collect:
            </h2>

            <p className=" text-justify mt-3">
               When you visit the jahair-style.com, we automatically collect
               certain information about your device, including information
               about your web browser, IP address, time zone, and some of the
               installed cookies on your device. Additionally, as you browse the
               Site, we collect information about the individual web pages or
               products you view, what websites or search terms referred you to
               the Site, and how you interact with the Site. We refer to this
               automatically-collected information as “Device Information.”
               Moreover, we might collect the personal data you provide to us
               (including but not limited to Name, Surname, Address, payment
               information, etc.) during registration to be able to fulfill the
               agreement.
            </p>

            <h3 className="font-normal text-2xl mt-3">
               Why do we process your data?
            </h3>

            <p className=" text-justify mt-3">
               Our top priority is customer data security, and, as such, we may
               process only minimal user data, only as much as it is absolutely
               necessary to maintain the website. Information collected
               automatically is used only to identify potential cases of abuse
               and establish statistical information regarding website usage.
               This statistical information is not otherwise aggregated in such
               a way that it would identify any particular user of the system.
            </p>

            <p className=" text-justify mt-3">
               You can visit the website without telling us who you are or
               revealing any information, by which someone could identify you as
               a specific, identifiable individual. If, however, you wish to use
               some of the website’s features, or you wish to receive our
               newsletter or provide other details by filling a form, you may
               provide personal data to us, such as your email, first name, last
               name, city of residence, organization, telephone number. You can
               choose not to provide us with your personal data, but then you
               may not be able to take advantage of some of the website’s
               features. For example, you won’t be able to receive our
               Newsletter or contact us directly from the website. Users who are
               uncertain about what information is mandatory are welcome to
               contact us via kengneprisca@gmail.com.
            </p>
            <h4 className="font-normal text-2xl mt-3">Your rights:</h4>
            <p className="text-justify mt-3">
               If you are a European resident, you have the following rights
               related to your personal data:
            </p>
      
            <List className="mt-3 ps-5">
               <List.Item>The right to be informed.</List.Item>

               <List.Item>The right of access.</List.Item>

               <List.Item>The right to rectification.</List.Item>

               <List.Item>The right to erasure.</List.Item>

               <List.Item>The right to restrict processing.</List.Item>

               <List.Item>The right to data portability.</List.Item>

               <List.Item>The right to object.</List.Item>

               <List.Item>
                  Rights in relation to automated decision-making and profiling.
               </List.Item>
            </List>

            <p className="text-justify mt-3">
               If you would like to exercise this right, please contact us
               through the contact information below.
            </p>

            <p className="text-justify mt-3">
               Additionally, if you are a European resident, we note that we are
               processing your information in order to fulfill contracts we
               might have with you (for example, if you make an order through
               the Site), or otherwise to pursue our legitimate business
               interests listed above. Additionally, please note that your
               information might be transferred outside of Europe, including
               Canada and the United States.
            </p>

            <h5 className="font-normal text-2xl mt-3">
               Links to other websites:
            </h5>

            <p className="text-justify mt-3">
               Our website may contain links to other websites that are not
               owned or controlled by us. Please be aware that we are not
               responsible for such other websites or third parties' privacy
               practices. We encourage you to be aware when you leave our
               website and read the privacy statements of each website that may
               collect personal information.
            </p>

            <h5 className="font-normal text-2xl mt-3">Legal disclosure:</h5>

            <p className="text-justify mt-3">
               We will disclose any information we collect, use or receive if
               required or permitted by law, such as to comply with a subpoena
               or similar legal process, and when we believe in good faith that
               disclosure is necessary to protect our rights, protect your
               safety or the safety of others, investigate fraud, or respond to
               a government request.
            </p>

            <h5 className="font-normal text-2xl mt-3">Contact information:</h5>

            <p className="text-justify mt-3 mb-40">
               If you would like to contact us to understand more about this
               Policy or wish to contact us concerning any matter relating to
               individual rights and your Personal Information, you may send an
               email to {setting.email_site}
            </p>
         </div>
      </div>
   );
}

export default PrivacyPolicy;
