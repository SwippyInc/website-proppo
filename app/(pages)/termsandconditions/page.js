'use client'
import { useEffect } from "react"
import Footer from "../../../components/Footer"
import Link from "next/link"
import { GoBackButton } from "@/components/Button"

export default function TermsOfService() {
  useEffect(() => {
    document.title = 'Terms of Service'
  }, [])

  return (
    <div className="bg-[#6840ff]/5 text-gray-800 relative dark:bg-black/90 dark:text-white">
      <div
        className="w-[90%] md:w-[80%] mx-auto py-10 relative text-xs md:text-sm"
        style={{ zIndex: 2, lineHeight: '180%' }}
      >
        <div className="text-center mb-5 md:mb-10">
          <h1 className="mb-1 text-3xl md:text-5xl font-semibold">
            Terms of Service for <span className="bl_un">Swippy</span> Tech LLP
          </h1>
          <p className="text-sm opacity-80 italic bg-blue-800/5 p-1 px-2 border-r-[#6840ff] border-r-2 w-fit mx-auto mt-4 dark:bg-white/5 dark:border-r-white dark:text-white">
            Last updated: July 14, 2024
          </p>
        </div>

        <div className="p-6 md:p-8 rounded-3xl bg-white/70 shadow-lg shadow-[#6840ff]/5 border border-gray-200/50 dark:bg-black/90 dark:border-gray-800/50">
          <h2 className="text-xl md:text-2xl font-medium mt-8 mb-4">Agreement to our Legal Terms</h2>
          <p className="mb-4">
            We are Swippy Tech LLP (&apos;Company&apos;, &apos;we&apos;, &apos;us&apos;, or &apos;our&apos;), a company registered in India at Dhangvi Kalan, Kotkhai Local Bazaar, Shimla, Shimla, Himachal Pradesh 171202.
          </p>
          <p className="mb-4">
            We operate the website <a href="https://www.proppo.in" rel="external nofollow noopener" target="_blank" className="text-[#6840ff] hover:underline">https://www.proppo.in</a> (the &apos;Site&apos;), as well as any other related products and services that refer or link to these legal terms (the &apos;Legal Terms&apos;) (collectively, the &apos;Services&apos;).
          </p>
          <p className="mb-4">
            You can contact us by email at <a href="mailto:mail@swippy.in" className="text-[#6840ff] hover:underline">mail@swippy.in</a>.
          </p>
          <p className="mb-4">
            These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&apos;you&apos;), and Swippy Tech LLP, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
          </p>
          <p className="mb-4">
            Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms at any time and for any reason. We will alert you about any changes by updating the &apos;Last updated&apos; date of these Legal Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Legal Terms by your continued use of the Services after the date such revised Legal Terms are posted.
          </p>
          <p className="mb-4">
            The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
          </p>
          <p className="mb-4">
            We recommend that you print a copy of these Legal Terms for your records.
          </p>

          <h3 className="text-lg font-medium mb-2">1) Our Services</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">2) Intellectual Property Rights</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Our intellectual property</strong><br />
              We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the &apos;Content&apos;), as well as the trademarks, service marks, and logos contained therein (the &apos;Marks&apos;).
            </li>
            <li>
              Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.
            </li>
            <li>
              The Content and Marks are provided in or through the Services &apos;AS IS&apos; for your internal business purpose only.
            </li>
            <li>
              <strong>Your use of our Services</strong><br />
              Subject to your compliance with these Legal Terms, including the &apos;PROHIBITED ACTIVITIES&apos; section below, we grant you a non-exclusive, non-transferable, revocable licence to: access the Services; and download or print a copy of any portion of the Content to which you have properly gained access, solely for your internal business purpose.
            </li>
            <li>
              Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
            </li>
            <li>
              If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to: <a href="mailto:mail@swippy.in" className="text-[#6840ff] hover:underline">mail@swippy.in</a>. If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content.
            </li>
            <li>
              We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.
            </li>
            <li>
              Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.
            </li>
            <li>
              <strong>Your submissions and contributions</strong><br />
              Please review this section and the &apos;PROHIBITED ACTIVITIES&apos; section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.
            </li>
            <li>
              Submissions: By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services (&apos;Submissions&apos;), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.
            </li>
            <li>
              Contributions: The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality during which you may create, submit, post, display, transmit, publish, distribute, or broadcast content and materials to us or through the Services, including but not limited to text, writings, video, audio, photographs, music, graphics, comments, reviews, rating suggestions, personal information, or other material (&apos;Contributions&apos;). Any Submission that is publicly posted shall also be treated as a Contribution.
            </li>
            <li>
              You understand that Contributions may be viewable by other users of the Services.
            </li>
            <li>
              When you post Contributions, you grant us a licence (including use of your name, trademarks, and logos): By posting any Contributions, you grant us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and licence to: use, copy, reproduce, distribute, sell, resell, publish, broadcast, retitle, store, publicly perform, publicly display, reformat, translate, excerpt (in whole or in part), and exploit your Contributions (including, without limitation, your image, name, and voice) for any purpose, commercial, advertising, or otherwise, to prepare derivative works of, or incorporate into other works, your Contributions, and to sublicence the licences granted in this section. Our use and distribution may occur in any media formats and through any media channels.
            </li>
            <li>
              This licence includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide.
            </li>
            <li>
              You are responsible for what you post or upload: By sending us Submissions and/or posting Contributions through any part of the Services or making Contributions accessible through the Services by linking your account through the Services to any of your social networking accounts, you:<br />
              confirm that you have read and agree with our &apos;PROHIBITED ACTIVITIES&apos; and will not post, send, publish, upload, or transmit through the Services any Submission nor post any Contribution that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading; to the extent permissible by applicable law, waive any and all moral rights to any such Submission and/or Contribution; warrant that any such Submission and/or Contributions are original to you or that you have the necessary rights and licences to submit such Submissions and/or Contributions and that you have full authority to grant us the above-mentioned rights in relation to your Submissions and/or Contributions; and warrant and represent that your Submissions and/or Contributions do not constitute confidential information. <br />
              You are solely responsible for your Submissions and/or Contributions and you expressly agree to reimburse us for any and all losses that we may suffer because of your breach of (a) this section, (b) any third party&apos;s intellectual property rights, or (c) applicable law.
            </li>
            <li>
              We may remove or edit your Content: Although we have no obligation to monitor any Contributions, we shall have the right to remove or edit any Contributions at any time without notice if in our reasonable opinion we consider such Contributions harmful or in breach of these Legal Terms. If we remove or edit any such Contributions, we may also suspend or disable your account and report you to the authorities.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">3) User Representations</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Legal Terms; (4) you are not a minor in the jurisdiction in which you reside; (5) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (6) you will not use the Services for any illegal or unauthorised purpose; and (7) your use of the Services will not violate any applicable law or regulation.
            </li>
            <li>
              If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">4) User Registration</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">5) Purchases & Payments</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              We accept the following forms of payment:<br />
              - UPI<br />
              - Netbanking<br />
              - Debit Card<br />
              - Credit Card
            </li>
            <li>
              You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in Indian National Rupee (INR).
            </li>
            <li>
              You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorise us to charge your chosen payment provider for any such amounts upon placing your order. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment.
            </li>
            <li>
              We reserve the right to refuse any order placed through the Services. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same payment method, and/or orders that use the same billing or shipping address. We reserve the right to limit or prohibit orders that, in our sole judgement, appear to be placed by dealers, resellers, or distributors.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">6) Subscriptions</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Billing and Renewal:</strong><br />
              Your subscription will continue and automatically renew unless cancelled. You consent to our charging your payment method on a recurring basis without requiring your prior approval for each recurring charge, until such time as you cancel the applicable order. The length of your billing cycle will depend on the type of subscription plan you choose when you subscribed to the Services.
            </li>
            <li>
              <strong>Free Trial:</strong><br />
              We offer a 30-day free trial to new users who register with the Services. The account will not be charged and the subscription will be suspended until upgraded to a paid version at the end of the free trial.
            </li>
            <li>
              <strong>Cancellation:</strong><br />
              All purchases are non-refundable. You can cancel your subscription at any time by contacting us using the contact information provided below. Your cancellation will take effect at the end of the current paid term. If you have any questions or are unsatisfied with our Services, please email us at <a href="mailto:mail@swippy.in" className="text-[#6840ff] hover:underline">mail@swippy.in</a>.
            </li>
            <li>
              <strong>Fee Changes:</strong><br />
              We may, from time to time, make changes to the subscription fee and will communicate any price changes to you in accordance with applicable law.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">7) Prohibited Activities</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavours except those that are specifically endorsed or approved by us.
            </li>
            <li>
              <strong>As a user of the Services, you agree not to:</strong><br />
              Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.
            </li>
            <li>
              Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.
            </li>
            <li>
              Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.
            </li>
            <li>
              Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.
            </li>
            <li>
              Use any information obtained from the Services in order to harass, abuse, or harm another person.
            </li>
            <li>
              Make improper use of our support services or submit false reports of abuse or misconduct.
            </li>
            <li>
              Use the Services in a manner inconsistent with any applicable laws or regulations.
            </li>
            <li>
              Engage in unauthorised framing of or linking to the Services.
            </li>
            <li>
              Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services.
            </li>
            <li>
              Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.
            </li>
            <li>
              Delete the copyright or other proprietary rights notice from any Content.
            </li>
            <li>
              Attempt to impersonate another user or person or use the username of another user.
            </li>
            <li>
              Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (&apos;gifs&apos;), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as &apos;spyware&apos; or &apos;passive collection mechanisms&apos; or &apos;pcms&apos;).
            </li>
            <li>
              Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.
            </li>
            <li>
              Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.
            </li>
            <li>
              Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.
            </li>
            <li>
              Copy or adapt the Services&apos; software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.
            </li>
            <li>
              Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.
            </li>
            <li>
              Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorised script or other software.
            </li>
            <li>
              Use a buying agent or purchasing agent to make purchases on the Services.
            </li>
            <li>
              Make any unauthorised use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretences.
            </li>
            <li>
              Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavour or commercial enterprise.
            </li>
            <li>
              Sell or otherwise transfer your profile.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">8) User Generated Contributions</h3>
          <p className="mb-4">
            The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, &apos;Contributions&apos;). Contributions may be viewable by other users of the Services and through third-party websites. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.
            </li>
            <li>
              You are the creator and owner of or have the necessary licences, rights, consents, releases, and permissions to use and to authorise us, the Services, and other users of the Services to use your Contributions in any manner contemplated by the Services and these Legal Terms.
            </li>
            <li>
              You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Services and these Legal Terms.
            </li>
            <li>
              Your Contributions are not false, inaccurate, or misleading.
            </li>
            <li>
              Your Contributions are not unsolicited or unauthorised advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.
            </li>
            <li>
              Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libellous, slanderous, or otherwise objectionable (as determined by us).
            </li>
            <li>
              Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.
            </li>
            <li>
              Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people.
            </li>
            <li>
              Your Contributions do not violate any applicable law, regulation, or rule.
            </li>
            <li>
              Your Contributions do not violate the privacy or publicity rights of any third party.
            </li>
            <li>
              Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.
            </li>
            <li>
              Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.
            </li>
            <li>
              Your Contributions do not otherwise violate, or link to material that violates, any provision of these Legal Terms, or any applicable law or regulation.
            </li>
          </ul>
          <p className="mb-4">
            Any use of the Services in violation of the foregoing violates these Legal Terms and may result in, among other things, termination or suspension of your rights to use the Services.
          </p>

          <h3 className="text-lg font-medium mb-2">9) Contribution License</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              By posting your Contributions to any part of the Services, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and licence to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorise sublicences of the foregoing. The use and distribution may occur in any media formats and through any media channels.
            </li>
            <li>
              This licence will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide. You waive all moral rights in your Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions.
            </li>
            <li>
              We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Services. You are solely responsible for your Contributions to the Services and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.
            </li>
            <li>
              We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions; (2) to re-categorise any Contributions to place them in more appropriate locations on the Services; and (3) to pre-screen or delete any Contributions at any time and for any reason, without notice. We have no obligation to monitor your Contributions.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">10) Service Management</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">11) Privacy Policy</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              We care about data privacy and security. Please review our <a target="_blank" className="text-[#6840ff] hover:underline" href="https://www.proppo.in/privacy-policy">Privacy Policy</a>. <br />
              By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in India. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in India, then through your continued use of the Services, you are transferring your data to India, and you expressly consent to have your data transferred to and processed in India.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">12) Term and Termination</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              These Legal Terms shall remain in full force and effect while you use the Services. Without limiting any other provision of these Legal Terms, we reserve the right to, in our sole discretion and without notice or liability, deny access to and use of the Services (including blocking certain IP addresses), to any person for any reason or for no reason, including without limitation for breach of any representation, warranty, or covenant contained in these Legal Terms or of any applicable law or regulation. We may terminate your use or participation in the Services or delete your account and any content or information that you posted at any time, without warning, in our sole discretion.
            </li>
            <li>
              If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">13) Modifications and Interruptions</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.
            </li>
            <li>
              We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to supply any corrections, updates, or releases in connection therewith.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">14) Governing Law</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              These Legal Terms shall be governed by and defined following the laws of India. Swippy Tech LLP and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">15) Dispute Resolution</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              You agree to irrevocably submit all disputes related to these Legal Terms or the legal relationship established by these Legal Terms to the jurisdiction of the India courts. Swippy Tech LLP shall also maintain the right to bring proceedings as to the substance of the matter in the courts of the country where you reside or, if these Legal Terms are entered into in the course of your trade or profession, the state of your principal place of business.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">16) Corrections</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">17) Disclaimer</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              The services are provided on an as-is and as-available basis. You agree that your use of the services will be at your sole risk. To the fullest extent permitted by law, we disclaim all warranties, express or implied, in connection with the services and your use thereof, including, without limitation, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We make no warranties or representations about the accuracy or completeness of the services&apos; content or the content of any websites or mobile applications linked to the services and we will assume no liability or responsibility for any (1) errors, mistakes, or inaccuracies of content and materials, (2) personal injury or property damage, of any nature whatsoever, resulting from your access to and use of the services, (3) any unauthorized access to or use of our secure servers and/or any and all personal information and/or financial information stored therein, (4) any interruption or cessation of transmission to or from the services, (5) any bugs, viruses, trojan horses, or the like which may be transmitted to or through the services by any third party, and/or (6) any errors or omissions in any content and materials or for any loss or damage of any kind incurred as a result of the use of any content posted, transmitted, or otherwise made available via the services. We do not warrant, endorse, guarantee, or assume responsibility for any product or service advertised or offered by a third party through the services, any hyperlinked website, or any website or mobile application featured in any banner or other advertising, and we will not be a party to or in any way be responsible for monitoring any transaction between you and any third-party providers of products or services. As with the purchase of a product or service through any medium or in any environment, you should use your best judgment and exercise caution where appropriate.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">18) Limitations of Liability</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the services, even if we have been advised of the possibility of such damages. Notwithstanding anything to the contrary contained herein, our liability to you for any cause whatsoever and regardless of the form of the action, will at all times be limited to the amount paid, if any, by you to us during the three (3) month period prior to any cause of action arising. Certain US state laws and international laws do not allow limitations on implied warranties or the exclusion or limitation of certain damages. If these laws apply to you, some or all of the above disclaimers or limitations may not apply to you, and you may have additional rights.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">19) Indemnification</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) use of the Services; (3) breach of these Legal Terms; (4) any breach of your representations and warranties set forth in these Legal Terms; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Services with whom you connected via the Services. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defence and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defence of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">20) User Data</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">21) Electronic Communications, Transactions, and Signatures</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">22) Miscellaneous</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defences you may have based on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms.
            </li>
          </ul>

          <h3 className="text-lg font-medium mb-2">23) Contact Us</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:<br />
              Swippy Tech LLP<br />
              Dhangvi Kalan, Kotkhai Local Bazaar, Shimla<br />
              Shimla, Himachal Pradesh 171202<br />
              India<br />
              <a href="mailto:mail@swippy.in" className="text-[#6840ff] hover:underline">mail@swippy.in</a>
            </li>
          </ul>
        </div>
      </div>
      <GoBackButton/>
      <Footer />
    </div>
  )
}