"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import Welcome from "../../static/images/home.jpeg";

export default function Landing() {
  const [studyPlans, setStudyPlans] = useState([]);

  useEffect(() => {
    // Simulate fetching stored plans from localStorage or API
    const storedPlans = JSON.parse(localStorage.getItem("studyPlans")) || [];
    setStudyPlans(storedPlans);
  }, []);

  return (
    <div 
      className={`flex flex-col items-center justify-center min-h-screen w-full p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] ${
        studyPlans.length > 0 ? "bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%" : ""
      }`}
    >
      {/* Conditionally Render Study Plans or Welcome Page */}
      {studyPlans.length > 0 ? (
        // 🎯 Study Plan Cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {studyPlans.map((plan, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-lg p-6 transition transform hover:scale-105 hover:shadow-2xl duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {plan.subject}
              </h2>
              <p className="text-gray-600">Days: {plan.days}</p>
              <p className="text-gray-600">Hours per day: {plan.hours}</p>
              <div className="mt-4">
                <h3 className="font-bold">Topics:</h3>
                <ul className="list-disc pl-6">
                  {plan.topics.map((topic, idx) => (
                    <li key={idx} className="text-gray-700">
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // 🎯 Welcome Page
        <>
          <main className="flex flex-col items-center justify-center gap-8 w-full">
            <Image
              className="dark:invert"
              src={Welcome}
              alt="Next.js logo"
              width={500}
              height={500}
              priority
            />
            <h1 className="text-3xl text-center">
              Welcome to <b>Learn Byte</b>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className="dark:invert"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
                />
                Get Started
              </a>
              <a
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </div>
          </main>

          <footer className="flex flex-wrap items-center justify-center gap-8 w-full mt-8">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              Learn
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
              />
              Examples
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Go to nextjs.org →
            </a>
          </footer>
        </>
      )}
    </div>
  );
}
