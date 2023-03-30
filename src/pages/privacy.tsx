import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import React from 'react'

export default function Privacy() {
  const router = useRouter()

  return (
    <>
      <div className="mx-auto mb-12 max-w-[800px] flex-auto px-[20px]">
        <div className="sticky top-0 z-10 bg-[#f5f2f2] py-2 dark:bg-[#1c1b1b]">
          <button
            onClick={() => router.push('/', undefined, { scroll: false })}
            className="relative flex items-center gap-2 rounded-md py-2 px-3 text-sm font-medium hover:rounded-md hover:bg-gray-200 hover:py-2 hover:px-3 dark:text-white dark:hover:bg-gray-800"
          >
            <ArrowLongLeftIcon className="h-5 w-5" /> Back to posts
          </button>
        </div>
        <div className="rounded border bg-[#fdfbfb] dark:bg-[#161515]">
          <div className="prose max-w-[800px] p-10 text-sm text-gray-900 marker:text-gray-900 prose-h4:text-base prose-h4:text-gray-900 dark:text-gray-100 marker:dark:text-gray-100 prose-h4:dark:text-gray-100 md:p-20">
            <div className="text-xl font-semibold">
              Roast or Toast Privacy Policy
            </div>
            <p>Last updated: March 20, 2023</p>
            <p>
              This policy applies to the websites, widgets, APIs, emails, and
              other online products and services (collectively, the “Services”)
              provided by "Roast or Toast” (“Roast or Toast,” “we,” “us,” or
              “our”).
            </p>
            <p>
              The goal of Roast or Toast is to let people share their content
              and get feedback. We understand that you care about information
              that is collected, used, and shared. We want to be as transparent
              as possible about your data and our processes around it. We hope
              this policy acts to clarify potential questions.
            </p>
            <p>
              The Service allows you to post User Content, as defined in our
              Terms of Use. Any User Content you post becomes available to the
              public via the Service. User Content includes, but is not limited
              to, posts, comments, and visual content. If you remove User
              Content, copies may remain viewable in cached and archived pages
              or if other users have copied or stored your User Content.
            </p>

            <p>
              Roast or Toast may allow you to mark some data on the Service as
              private. This information will not be visible to other users
              unless it is shared with them directly by you.
            </p>
            <ul className="list-decimal list-inside"></ul>
            <h4>Email</h4>
            <p>
              By providing Roast or Toast with your email address you consent to
              us sending you Service-related notices, including any notices
              required by law, in lieu of communication by postal mail. We may
              also use your email address to send you other messages, such as
              newsletters, feature updates, or special offers. If you do not
              want to receive emails relating to updates, improvements, or
              special offers from us, you may opt out by changing your email
              preference settings. You may not opt out of Service-related
              emails.
            </p>
            <h4>Privacy Settings</h4>
            <p>
              Your email is used when you sign up or log in to use Roast or
              Toast. You can request to delete your personal information any
              time by sending us an email at hello@roastortoast.me.
            </p>
            <h4>Cookies and Other Identifiers</h4>
            <p>
              To enable our systems to recognize your browser or device and to
              provide and improve the Service, we use cookies and other
              identifiers.
            </p>
            <h4>Advertising</h4>
            <p>
              We may use your personal information to display ads for features,
              products, and services that we think might be of interest to you.
              We do not use information that personally identifies you to
              display these ads.
            </p>
            <h4>California Consumer Privacy Act</h4>
            <p>
              This California Consumer Privacy Act disclosure page
              (“Disclosure”) supplements the Roast or Toast Privacy Policy and
              is effective as of July 1, 2020. The Roast or Toast Privacy Policy
              describes the personal information that we collect, the sources
              from which we collect it, the purposes for which we use it, the
              limited circumstances under which we share personal information,
              and with whom we share it. These additional disclosures are
              required by the California Consumer Privacy Act:
            </p>
            <ul>
              <span className="font-semibold">
                a. Categories of personal information collected.
              </span>

              <p>
                The personal information that Roast or Toast collects, or has
                collected from users in the twelve months prior to the effective
                date of this Disclosure, fall into the following categories
                established by the California Consumer Privacy Act, depending on
                which part of the Service is used:
              </p>
              <ul className="ml-2 list-roman">
                <li>
                  Identifiers such as your name, alias, address, phone numbers,
                  or IP address;
                </li>
                <li>Age, gender, or other protected classifications;</li>
                <li>
                  Commercial information, such as movies you have watched or
                  want to watch;
                </li>
                <li>
                  Internet or other electronic network activity information,
                  including content interaction information;
                </li>
                <li>
                  Geolocation data, such as the location of your device if you
                  agreed to provide this information so we can show you nearby
                  reading events;
                </li>
                <li>
                  Audio or visual information, such as images and videos you may
                  provide in connection with the Service;
                </li>
                <li>
                  Professional information, for example data you may provide
                  about your education, business, or occupation; and
                </li>

                <li>
                  Inference data, such as information about your reading
                  preferences.
                </li>
              </ul>

              <span className="font-semibold">
                b. Categories of personal information disclosed for a business
                purpose.
              </span>

              <p>
                The personal information that Roast or Toast disclosed about
                users for a business purpose in the twelve months prior to the
                effective date of this Disclosure fall into the following
                categories established by the California Consumer Privacy Act,
                depending on which part of the Service is used:
              </p>
              <ul className="ml-2 list-roman">
                <li>
                  Identifiers such as your name, address, phone numbers, or IP
                  address, for example if you agree to participate in a user
                  study distributed by a service provider;
                </li>
                <li>
                  Your age, gender, or other protected classifications, for
                  example if you choose to participate in a survey distributed
                  by a survey provider; and
                </li>
                <li>
                  Internet or other electronic network activity information,
                  such as if we use a service provider to help us gather crash
                  reports for analyzing the health of our devices and services.
                </li>
              </ul>
              <span className="font-semibold">
                c. Requesting Access to or Deletion of Personal Information
              </span>

              <p>
                You may have the right under the California Consumer Privacy Act
                to request information about the collection of your personal
                information by Roast or Toast, or access to or deletion of your
                personal information. If you wish to do any of these things,
                please contact us at hello@roastortoast.me. Depending on your
                data choices, certain services may be limited or unavailable.
              </p>

              <span className="font-semibold">
                d. No sale of personal information
              </span>

              <p>
                In the twelve months prior to the effective date of this
                Disclosure, Roast or Toast has not sold any personal information
                of consumers, as those terms are defined under the California
                Consumer Privacy Act.
              </p>

              <span className="font-semibold">e. No Discrimination</span>

              <p>
                Roast or Toast will not discriminate against any consumer for
                exercising their rights under the California Consumer Privacy
                Act.
              </p>
            </ul>
            <h4>Changes to Our Privacy Policy</h4>
            <p>
              If we change this Privacy Policy, we will post those changes on
              our website to keep you aware of what information we collect, how
              we use it and under what circumstances we may disclose it. Changes
              to this Privacy Policy are effective when they are posted on this
              page. Please also take a look at Roast or Toast's Terms of Use.
            </p>
            <h4>Contact</h4>
            <p>
              If you have additional questions or concerns related to this
              Privacy Policy, or your activity on the Roast or Toast website or
              app, please contact us at hello@roastortoast.me.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
