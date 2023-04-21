import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import React from 'react'

export default function Terms() {
  const router = useRouter()

  return (
    <>
      <div className="mx-auto mb-12 max-w-[800px] flex-auto px-[20px]">
        <div className="sticky top-0 z-10 bg-[#f5f2f2] py-2 dark:bg-[#0b0b0b]">
          <button
            onClick={() => router.push('/', undefined, { scroll: false })}
            className="relative flex items-center gap-2 rounded-md py-2 px-3 text-sm font-medium hover:rounded-md hover:bg-[#e5e5e5] hover:py-2 hover:px-3 dark:text-[#e5e5e5] dark:hover:bg-[#262626]"
          >
            <ArrowLongLeftIcon className="h-5 w-5" /> Back to posts
          </button>
        </div>
        <div className="rounded border bg-[#fdfdfd] dark:bg-[#212121]">
          <div className="prose max-w-[800px] p-10 text-sm text-[#121212] marker:text-[#121212] prose-h4:text-base prose-h4:text-[#121212] dark:text-[#dcdcdc] marker:dark:text-[#dcdcdc] prose-h4:dark:text-[#dcdcdc] md:p-20">
            <div className="text-xl font-bold">Roast or Toast Terms of Use</div>
            <p>Last updated: March 20, 2023</p>
            <p>
              This Roast or Toast User Agreement (“Terms”) applies to your
              access to and use of the websites, widgets, APIs, emails, and
              other online products and services (collectively, the “Services”)
              provided by “Roast or Toast" ("Roast or Toast” “we,” “us,” or
              “our”).
            </p>
            <p>
              By accessing or using our Services, you agree to be bound by these
              Terms. If you do not agree to these Terms, you may not access or
              use our Services.
            </p>
            <p>
              Please also take a look at our Privacy Policy, which explains how
              and why we collect, use, and share information about you when you
              access or use our Services.
            </p>
            <h4>Our Service</h4>
            <p>
              The goal of Roast or Toast is to let people share their content
              and get feedback. To achieve this goal, we need to be able to
              identify you and your content so that we can show your content to
              others for feedback. Some of the things we show you may be
              promoted by advertisers, and we will try our best to ensure that
              even promoted content is relevant and interesting to you. Promoted
              content will be clearly labelled so you can identify it.
            </p>
            <h4>Who can use Roast or Toast</h4>
            <p>
              You may use Roast or Toast only if you can legally form a binding
              contract with Roast or Toast, and only in compliance with these
              Terms and all applicable laws. When you create your Roast or Toast
              account, you must provide us with accurate and complete
              information.
            </p>
            <p>
              Children under the age of 13 are not allowed to create an account
              or otherwise use the Services. Additionally, you must be over the
              age required by the laws of your country to create an account or
              otherwise use the Services, or we need to have received verifiable
              consent from your parent or legal guardian.
            </p>
            <p>
              If you are accepting these Terms on behalf of another legal
              entity, including a business or government entity, you represent
              that you have full legal authority to bind such entity to these
              Terms.
            </p>
            {/* <p>
              Using Roast or Toast may include downloading software to your
              computer, phone, tablet, or other device. You agree that we may
              automatically update that software, and these Terms will apply to
              any updates.
            </p> */}
            <h4>Use of the Services</h4>
            <p>
              Subject to these Terms and our policies, we grant you a limited,
              non-exclusive, non-transferable, and revocable license to use our
              Service.
            </p>
            <p>
              We reserve the right to modify, suspend, or discontinue the
              Services (in whole or in part) at any time, with or without notice
              to you. Any future release, update, or other addition to
              functionality of the Services will be subject to these Terms,
              which may be updated from time to time. You agree that we will not
              be liable to you or to any third party for any modification,
              suspension, or discontinuation of the Services or any part
              thereof.
            </p>
            <h4>Posting content</h4>
            <p>
              Roast or Toast lets you to post content, comments, ratings,
              images, links, and other materials. Anything that you post or
              otherwise make available on Roast or Toast is referred to as "User
              Content." You retain all rights in, and are solely responsible
              for, the User Content you post to Roast or Toast.
            </p>
            <p>
              Although we have no obligation to screen, edit, or monitor your
              User Content, we may, in our sole discretion, delete or remove
              your User Content at any time and for any reason. These may
              include violating these Terms, violating our Privacy Policy, or
              creating liability for us.
            </p>
            <h4>How Roast or Toast can use your content</h4>
            <p>
              When creating your User Content, you grant us a worldwide,
              royalty-free, perpetual, irrevocable, non- exclusive,
              transferable, and sub-licensable license to use, copy, modify,
              adapt, prepare derivative works of, distribute, store, perform,
              and display your User Content and any name, username, voice, or
              likeness provided in connection with your User Content in all
              media formats and channels now known or later developed anywhere
              in the world. This includes the right for us to make your User
              Content available for syndication, broadcast, distribution, or
              publication by other companies, organizations, or individuals who
              partner with Roast or Toast. That being said, we want to be as
              open and respectful as possible with your User Content and will do
              our best to communicate our intentions to you prior to making it
              available for syndication, broadcast, distribution, or publication
              by other companies.
            </p>
            <p>
              Following termination or deactivation of your account, or if you
              remove any User Content from Roast or Toast, we may keep your User
              Content for a reasonable period of time for backup, archival, or
              audit purposes. Roast or Toast and its users may retain and
              continue to use, store, display, reproduce, modify, create
              derivative works, perform, and distribute any of your User Content
              that other users have stored or shared on Roast or Toast.
            </p>
            <h4>Security</h4>
            <p>
              We care deeply about the security of our users. While we work to
              protect the security of your content and account, Roast or Toast
              can't guarantee that unauthorized third parties won't be able to
              beat our security measures. We ask that you keep your emails
              secure, and notify us immediately of any compromise or
              unauthorized use of your account.
            </p>
            <h4>Third party links, sites, and services</h4>
            <p>
              Roast or Toast may contain links to third party websites,
              advertisers, services, special offers, or other events or
              activities that are not owned or controlled by Roast or Toast. We
              don't endorse or assume any responsibility for any such third
              party sites, information, materials, products, or services. If you
              access any third party website, service, or content from Roast or
              Toast, you do so at your own risk and you agree that Roast or
              Toast has no liability arising from your use of or access to any
              third party website, service, or content.
            </p>
            <h4>Limitation of liability</h4>
            <p>
              {' '}
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, ROAST OR TOAST SHALL NOT
              BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR
              PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER
              INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE,
              GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (A) YOUR
              ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (B)
              ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE,
              INCLUDING WITHOUT LIMITATION, ANY DEFAMATORY, OFFENSIVE OR ILLEGAL
              CONDUCT OF OTHER USERS OR THIRD PARTIES; OR (C) UNAUTHORIZED
              ACCESS, USE OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT. IN NO
              EVENT SHALL ROAST OR TOAST'S AGGREGATE LIABILITY FOR ALL CLAIMS
              RELATING TO THE SERVICE EXCEED ONE HUNDRED U.S. DOLLARS (U.S.
              $100.00).
            </p>
            <h4>Arbitration</h4>
            <p>
              For any dispute you have with Roast or Toast, you agree to first
              contact us and try to resolve the dispute with us informally. If
              we need to contact you, we will do so at the email address on your
              Roast or Toast account. If Roast or Toast hasn't been able to
              resolve the dispute with you informally, we each agree to resolve
              any claim, dispute, or controversy (excluding claims for
              injunctive or other equitable relief) arising out of or in
              connection with or relating to these Terms through binding
              arbitration or (for qualifying claims) in small claims court.
            </p>
            <p>
              Arbitration is a more informal way to resolve our disagreements
              than a lawsuit in court. For instance, arbitration uses a neutral
              arbitrator instead of a judge or jury, involves more limited
              discovery, and is subject to very limited review by courts.
              Although the process is more informal, arbitrators can award the
              same damages and relief that a court can award. You agree that, by
              agreeing to these Terms of Service, the U.S. Federal Arbitration
              Act governs the interpretation and enforcement of this provision,
              and that you and Roast or Toast are each waiving the right to a
              trial by jury or to participate in a class action. The arbitrator
              has exclusive authority to resolve any dispute relating to the
              interpretation, applicability, or enforceability of this binding
              arbitration agreement. This arbitration provision shall survive
              termination of this Agreement and the termination of your Roast or
              Toast account.
            </p>
            <p>
              Any arbitration will be administered by the American Arbitration
              Association ("AAA") under the Consumer Arbitration Rules then in
              effect for the AAA, except as provided herein. You can find their
              forms at www.adr.org. Unless you and Roast or Toast agree
              otherwise, the arbitration will be conducted in the county (or
              parish) where you reside. Each party will be responsible for
              paying any AAA filing, administrative and arbitrator fees in
              accordance with AAA Rules, except that Roast or Toast will pay for
              your reasonable filing, administrative, and arbitrator fees if
              your claim for damages does not exceed $75,000 and is
              non-frivolous (as measured by the standards set forth in Federal
              Rule of Civil Procedure 11(b)). If your claim is for $10,000 or
              less, we agree that you may choose whether the arbitration will be
              conducted solely on the basis of documents submitted to the
              arbitrator, through a telephonic hearing, or by an in-person
              hearing as established by the AAA Rules. If your claim exceeds
              $10,000, the right to a hearing will be determined by the AAA
              Rules. Regardless of the manner in which the arbitration is
              conducted, the arbitrator shall issue a reasoned written decision
              explaining the essential findings and conclusions on which the
              award is based, and any judgment on the award rendered by the
              arbitrator may be entered in any court of competent jurisdiction.
              Nothing in this Section shall prevent either party from seeking
              injunctive or other equitable relief from the courts, including
              for matters related to data security, intellectual property or
              unauthorized access to the Service.{' '}
            </p>
            <p>
              ALL CLAIMS MUST BE BROUGHT IN THE PARTIES' INDIVIDUAL CAPACITY,
              AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR
              REPRESENTATIVE PROCEEDING, AND, UNLESS WE AGREE OTHERWISE, THE
              ARBITRATOR MAY NOT CONSOLIDATE MORE THAN ONE PERSON'S CLAIMS. YOU
              AGREE THAT, BY ENTERING INTO THESE TERMS, YOU AND ROAST OR TOAST
              ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN
              A CLASS ACTION. NOTHING IN THESE TERMS OF SERVICE SHALL AFFECT ANY
              NON-WAIVABLE STATUTORY RIGHTS THAT APPLY TO YOU.{' '}
            </p>
            <p>
              To the extent any claim, dispute or controversy regarding Roast or
              Toast or our Service isn't arbitrable under applicable laws or
              otherwise: you and Roast or Toast both agree that any claim or
              dispute regarding Roast or Toast will be resolved exclusively in
              accordance with Section 12 of these Terms.
            </p>
            <h4>Governing law and jurisdiction</h4>
            <p>
              These Terms shall be governed by the laws of the State of
              California, without respect to its conflict of laws principles.
              The exclusive place of jurisdiction for all disputes arising from
              or in connection with this agreement is San Francisco County,
              California, or the United States District Court for the Northern
              District of California and our dispute will be determined under
              California law.
            </p>
            <h4>General terms</h4>
            <p>
              We reserve the right to determine the form and means of providing
              notifications to you, and you agree to receive legal notices
              electronically if that's what we decide. We may revise these Terms
              from time to time and the most current version will always be
              posted on our website. If a revision, in our discretion, is
              material, we'll notify you. By continuing to access or use Roast
              or Toast after revisions become effective, you agree to be bound
              by the new Terms. If you don't agree to the new terms, please stop
              using Roast or Toast.
            </p>
            <p>
              These Terms, and any rights and licenses granted hereunder, may
              not be transferred or assigned by you, but may be assigned by
              Roast or Toast without restriction. Any attempted transfer or
              assignment in violation hereof shall be null and void.
            </p>
            <p>
              These Terms, together with the Privacy Policy and any amendments
              and any additional agreements you may enter into with Roast or
              Toast shall constitute the entire agreement between you and Roast
              or Toast concerning the Service. If any provision of these Terms
              is deemed invalid, then that provision will be limited or
              eliminated to the minimum extent necessary, and the remaining
              provisions of these Terms will remain in full force and effect.
            </p>
            <p>
              No waiver of any term of these Terms shall be deemed a further or
              continuing waiver of such term or any other term, and Roast or
              Toast's failure to assert any right or provision under these Terms
              shall not constitute a waiver of such right or provision.
            </p>
            <h4>Changes to these Terms</h4>
            <p>
              We may make changes to these Terms from time to time. If we make
              changes, we will post the revised Terms and update the Effective
              Date above. If the changes, in our sole discretion, are material,
              we may also notify you by sending an email to the address
              associated with your Account (if you have chosen to provide an
              email address) or by otherwise providing notice through our
              Services. By continuing to access or use the Services on or after
              the Effective Date of the revised Terms, you agree to be bound by
              the revised Terms. If you do not agree to the revised Terms, you
              must stop accessing and using our Services before the changes
              become effective.
            </p>
            <h4>Miscellaneous</h4>
            <p>
              These Terms constitute the entire agreement between you and us
              regarding your access to and use of the Services. Our failure to
              exercise or enforce any right or provision of these Terms will not
              operate as a waiver of such right or provision. If any provision
              of these Terms is, for any reason, held to be illegal, invalid, or
              unenforceable, the rest of the Terms will remain in effect. You
              may not assign or transfer any of your rights or obligations under
              these Terms without our consent. We may freely assign any of our
              rights and obligations under these Terms.
            </p>
            <h4>Contact</h4>
            <p>
              If you have additional questions or concerns related to this Terms
              or the Services, please contact us at hello@roastortoast.me.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
