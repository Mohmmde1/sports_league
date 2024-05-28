/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pkiliyxaR77
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"

export default function Home() {
  return (

      
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Effortless Sports League Management
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Streamline your sports league with our all-in-one platform. Easily upload game results, manage team
                  rankings, and handle user profiles securely.
                </p>
                <div className="space-x-4 mt-6">
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Get Started
                  </Link>
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Sports League Manager
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Streamline Your Sports League
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our platform makes it easy to manage all aspects of your sports league, from game results to team
                  rankings and user profiles.
                </p>
              </div>
            </div>
            <img
              alt="Hero"
              className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover"
              height="300"
              src="/sport.jpeg"
              width="1270"
            />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="features">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Streamline Your Sports League</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our platform offers a range of features to help you manage your sports league with ease.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Effortless Game Result Uploads</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Easily upload game results with our intuitive interface, and watch as the team rankings are
                  automatically updated.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Comprehensive User Profiles</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage user profiles with ease, including contact information, player stats, and more.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Secure Login with JWT</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ensure the security of your league with our JWT-based authentication system, allowing only authorized
                  users to access the platform.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Automatic Team Ranking Updates</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Our platform automatically updates team rankings based on the game results you upload, keeping
                  everything up-to-date.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Customizable Reporting</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Generate custom reports on team performance, player stats, and more to gain valuable insights into
                  your league.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Seamless Communication</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Keep your league participants informed with built-in communication tools, such as email and push
                  notifications.
                </p>
              </div>
            </div>
            <div className="flex justify-center flex-col sm:flex-row items-start gap-4">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Get Started
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32" id="about">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">About Us</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Streamline Your Sports League</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Sports League Manager is a comprehensive platform designed to simplify the management of your sports
                  league. Our mission is to provide league organizers and participants with a secure, efficient, and
                  user-friendly solution to handle all aspects of their league.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                alt="Image"
                src="/3d-casual-life-sun.png"

              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Secure and Reliable</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Our platform is built with security in mind, ensuring the safety of your league data with our
                        JWT-based authentication system.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Intuitive User Experience</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        We've designed our platform to be easy to use, with a clean and modern interface that makes
                        managing your league a breeze.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Scalable and Flexible</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Whether you have a small recreational league or a large, competitive one, Sports League Manager
                        can accommodate your needs.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

  )
}

