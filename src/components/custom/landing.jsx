"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import Welcome from "../../static/images/home.jpeg";
import { Button } from "../ui/button";
import Link from "next/link";

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
              <Button className="rounded-full">
                <Link href="/byte-form">Get Started</Link>
              </Button>
            </div>
          </main>

          <footer className="flex flex-wrap items-center justify-center gap-8 w-full mt-8 font-sans">
            Build with byte-crafters ❤️❤️❤️
          </footer>
        </>
      )}
    </div>
  );
}
