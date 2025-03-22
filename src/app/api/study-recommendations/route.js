import { NextResponse } from "next/server";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Named export for GET method
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get("subject") || "python";
  const dailyHours = searchParams.get("dailyHours") || "3";
  const totalDays = searchParams.get("totalDays") || "11";
  const level = searchParams.get("level") || "Beginner";

  if (!subject || !dailyHours || !totalDays || !level) {
    return NextResponse.json(
      { error: "Missing required query parameters" },
      { status: 400 }
    );
  }

  try {
    // 🔹 1️⃣ Generate Study Plan Using Gemini AI
    const prompt = `Give a ${totalDays}-day learning plan for ${subject} at ${level} level. Provide JSON in this format:
    {
        "studyplan": {
            "name": "${subject}",
            "duration": "${totalDays} days",
            "level": "${level}",
            "studyplan": [
              {
                "day": 1,
                "topic": "${subject} - Introduction"
              },
              {
                "day": 2,
                "topic": "${subject} - Basics"
              }
            ],
            "quiz": [
              {
                "question": "What is ${subject} used for?",
                "options": ["A", "B", "C", "D"],
                "answer": "A"
              }
              // ... like this 10 questions for ${subject}
            ]
        }
    }`;

    let studyPlan = {};
    let quiz = [];

    try {
      const aiResponse = await model.generateContent(prompt);
      const aiText = aiResponse.response.candidates[0].content.parts[0].text;

      console.log("AI Response:", aiText);

      const jsonString = aiText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      console.log("Cleaned JSON String:", jsonString);

      const parsedData = JSON.parse(jsonString);
      studyPlan = parsedData.studyplan || {};
      quiz = studyPlan.quiz || [];
    } catch (error) {
      console.error("❌ Error parsing AI study plan:", error);
    }

    // 🔹 2️⃣ Generate YouTube Search Query
    const youtubeQuery =
      totalDays <= 10 ? `${subject} crash course` : `${subject} tutorial playlist`;
    const youtubeQueryType = totalDays <= 10 ? "video" : "playlist";

    let youtubeResults = [];
    try {
      const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${youtubeQuery}&type=${youtubeQueryType}&maxResults=5&key=${process.env.YOUTUBE_API_KEY}`;
      const youtubeResponse = await axios.get(youtubeApiUrl);

      youtubeResults = youtubeResponse.data.items.map((result) => ({
        title: result.snippet.title,
        description: result.snippet.description,
        url: `https://www.youtube.com/${
          youtubeQueryType === "playlist"
            ? "playlist?list=" + result.id.playlistId
            : "watch?v=" + result.id.videoId
        }`,
        channel: result.snippet.channelTitle,
        thumbnail: result.snippet.thumbnails.high.url,
      }));
    } catch (error) {
      console.error("❌ Error fetching YouTube videos:", error);
    }

    // 🔹 3️⃣ Fetch Blogs (Commented out, add if needed)
    let blogResults = [];
    // Example (uncomment and configure if using Google Search API):
    // const googleSearchApi = `https://www.googleapis.com/customsearch/v1?q=${subject} learning guide&cx=${process.env.GOOGLE_CX}&key=${process.env.GOOGLE_SEARCH_API_KEY}`;
    // const blogResponse = await axios.get(googleSearchApi);
    // blogResults = blogResponse.data.items.map((blog) => ({
    //   title: blog.title,
    //   snippet: blog.snippet,
    //   url: blog.link,
    // }));

    // 🔹 4️⃣ Return Final JSON Response
    const response = {
      result: {
        subjects: [
          {
            name: subject,
            duration:
              studyPlan[subject.toLowerCase()]?.duration || `${totalDays} days`,
            level: studyPlan[subject.toLowerCase()]?.level || level,
            studyPlan: studyPlan?.studyplan || [],
            quiz: quiz || [],
            youtubeQuery,
            youtubeQueryType,
            youtubeResults,
            blogResults,
          },
        ],
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ Unexpected Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}