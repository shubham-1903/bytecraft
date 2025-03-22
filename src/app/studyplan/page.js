"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useFormStore } from "@/store/useFormStore"

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [studyPlanData, setStudyPlanData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [youtubeResults, setYoutubeResults] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to show loading spinner
  const [blogResults, setBlogResults] = useState([])

  const formData = useFormStore((state) => state.formData);

  useEffect(() => {
    const fetchStudyPlan = async () => {
      try {
        const response = await axios.get('/api/study-recommendations', {
          params: {
            subject: formData.subject,
            dailyHours: "3",
            totalDays: formData.estimatedDays,
            level: formData.learningReasons[0],
          },
        });
        const studyPlan = response.data.result.subjects[0];
        setStudyPlanData(studyPlan.studyPlan); // Setting the study plan data
        setQuizData(studyPlan.quiz); // Setting the quiz data
        setAssignments(studyPlan.assignments || []); // Assuming assignments is part of the API response
        setYoutubeResults(studyPlan.youtubeResults || ""); // Setting YouTube playlist URL if available
        setLoading(false); // Data is loaded
        setBlogResults(studyPlan.blogResults)
      } catch (error) {
        console.error("Error fetching study plan data");
        setLoading(false);
      }
    };

    fetchStudyPlan();
  }, []);

  useEffect(() => {
    if (quizStarted && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (quizStarted) {
      handleNext();
    }
  }, [timer, quizStarted]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }

    setSelectedOption(null);

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(15);
    } else {
      setShowResult(true);
    }
  };

  const getTimerColor = () => {
    if (timer > 10) return "bg-green-500";
    if (timer > 5) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Loading spinner JSX
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-screen bg-[#CDDBFE]">
      <div className="relative w-16 h-16 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin">
        <div className="absolute inset-0 m-auto w-12 h-12 rounded-full border-t-4 border-b-4 border-green-500 animate-spin"></div>
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-[#E5EDFF] text-black">
      <div className="w-full max-w-4xl p-6">
        {/* Show Loading Spinner while fetching data */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Study Plan Component */}
            {!quizStarted && (
              <div className="space-y-8">
                <h2 className="text-4xl font-bold mb-6 text-gray-800">
                  Study Plan for {studyPlanData[0]?.topic ? studyPlanData[0]?.topic.split(' ')[0] : 'Python'}
                </h2>

                <div className="space-y-6">
                  {studyPlanData.map((plan, index) => (
                    <div key={index} className="shadow-lg rounded-xl bg-white p-6 transform transition-all hover:scale-105 hover:shadow-2xl">
                      <div>
                        <h4 className="text-xl font-semibold text-[#2d3748] mb-2">
                          <span className="text-lg font-bold text-blue-500">Day {plan.day}</span>
                        </h4>
                        <p>
                        {plan.topic}
                        </p>

                        {/* Display Assignment Component */}
                        {assignments.length > 0 && assignments[index] && (
                          <div className="mt-6 bg-blue-50 p-4 rounded-md border-l-4 border-blue-500 shadow-md">
                            <h5 className="text-lg font-semibold text-gray-800 mb-2">Assignment</h5>
                            <p className="text-gray-700">{assignments[index]}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* YouTube Playlists Component */}
                <div className="mt-10">
                  <h3 className="text-2xl font-semibold mb-4">Recommended YouTube Playlists</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {youtubeResults.map((video, index) => (
                      <Card key={index} className="shadow-xl rounded-lg overflow-hidden">
                        <a href={video.url} target="_blank" rel="noopener noreferrer">
                          <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                          <CardContent className="p-4">
                            <h4 className="text-lg font-semibold text-gray-800">{video.title}</h4>
                            <p className="text-sm text-gray-600">{video.description || 'No description available'}</p>
                          </CardContent>
                        </a>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">Recommended Blog Articles</h3>
                  <div className="space-y-4">
                    {blogResults.map((blog, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                        <a href={blog.url} className="text-lg font-medium text-blue-600 hover:underline">
                          {blog.title}
                        </a>
                        <p className="text-sm text-gray-500 mt-2">{blog.snippet}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full py-4 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-lg font-bold rounded-lg mt-6"
                  onClick={() => setQuizStarted(true)}
                >
                  Start Quiz
                </Button>
              </div>
            )}

            {/* Quiz Component */}
            {quizStarted && !showResult && (
              <Card className="w-full shadow-2xl rounded-2xl bg-[#f5f5f5] border border-gray-400 mt-6">
                <CardContent>
                  <h2 className="text-3xl font-bold text-center mb-6">
                    {quizData[currentQuestion]?.question}
                  </h2>

                  {/* Timer Bar */}
                  <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden mb-6">
                    <div
                      className={`absolute left-0 top-0 h-full transition-all duration-300 ${getTimerColor()}`}
                      style={{ width: `${(timer / 15) * 100}%` }}
                    />
                  </div>

                  <div className="space-y-4">
                    {quizData[currentQuestion]?.options.map((option, index) => (
                      <Button
                        key={index}
                        className={`w-full py-3 text-lg font-medium rounded-lg transition-colors duration-300 ${selectedOption === option
                            ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                          }`}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>

                  <Button
                    className="w-full mt-6 py-3 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-lg font-bold rounded-lg transition-all duration-300"
                    onClick={handleNext}
                    disabled={!selectedOption}
                  >
                    Next
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Quiz Result Component */}
            {showResult && (
              <div className="text-center">
                <h2 className="text-5xl font-extrabold mb-4">
                  🎉 Quiz Completed! 🎉
                </h2>
                <p className="text-2xl font-semibold text-gray-800">
                  Your Score: <span className="text-green-500">{score}</span> / {quizData.length}
                </p>
                <div className="mt-6">
                  <Button
                    className="py-4 px-8 bg-blue-500 hover:bg-blue-600 text-lg font-bold rounded-lg shadow-lg"
                    onClick={() => window.location.reload()}
                  >
                    Retry Quiz
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
