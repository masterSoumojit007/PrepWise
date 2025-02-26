/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth } from "@clerk/clerk-react";
import {
  CircleStop,
  Loader,
  MessageSquareText,
  Mic,
  RefreshCw,
  Save,
  Video,
  VideoOff,
  WebcamIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import useSpeechToText, { ResultType } from "react-hook-speech-to-text";
import { useParams } from "react-router-dom";
import WebCam from "react-webcam";
import { TooltipButton } from "./tooltip-button";
import { toast } from "sonner";
import { chatSession } from "@/scripts";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { SaveModal } from "./save-modal";

interface RecordAnswerProps {
  question: { question: string; answer: string };
  isWebCam: boolean;
  setIsWebCam: (value: boolean) => void;
}

interface AIResponse {
  ratings: number;
  feedback: string;
}

export const RecordAnswer = ({
  question,
  isWebCam,
  setIsWebCam,
}: RecordAnswerProps) => {
  const {
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUserAnswer] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<AIResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userId } = useAuth();
  const { interviewId } = useParams();

  const recordUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();

      if (userAnswer?.length < 30) {
        toast.error("Error", {
          description: "Your answer should be more than 30 characters",
        });

        return;
      }

      //   ai result
      const aiResult = await generateResult(
        question.question,
        question.answer,
        userAnswer
      );

      setAiResult(aiResult);
    } else {
      startSpeechToText();
    }
  };

  const cleanJsonResponse = (responseText: string) => {
    // Step 1: Trim any surrounding whitespace
    let cleanText = responseText.trim();

    // Step 2: Remove any occurrences of "json" or code block symbols (``` or `)
    cleanText = cleanText.replace(/(json|```|`)/g, "");

    // Step 3: Parse the clean JSON text into an array of objects
    try {
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

  const generateResult = async (
    qst: string,
    qstAns: string,
    userAns: string
  ): Promise<AIResponse> => {
    setIsAiGenerating(true);
    const prompt = `
      Question: "${qst}"
      User Answer: "${userAns}"
      Correct Answer: "${qstAns}"
      Please compare the user's answer to the correct answer, and provide a rating (from 1 to 10) based on answer quality, and offer feedback for improvement.
      Return the result in JSON format with the fields "ratings" (number) and "feedback" (string).
    `;

    try {
      const aiResult = await chatSession.sendMessage(prompt);

      const parsedResult: AIResponse = cleanJsonResponse(
        aiResult.response.text()
      );
      return parsedResult;
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "An error occurred while generating feedback.",
      });
      return { ratings: 0, feedback: "Unable to generate feedback" };
    } finally {
      setIsAiGenerating(false);
    }
  };

  const recordNewAnswer = () => {
    setUserAnswer("");
    stopSpeechToText();
    startSpeechToText();
  };

  const saveUserAnswer = async () => {
    setLoading(true);

    if (!aiResult) {
      return;
    }

    const currentQuestion = question.question;
    try {
      // query the firbase to check if the user answer already exists for this question

      const userAnswerQuery = query(
        collection(db, "userAnswers"),
        where("userId", "==", userId),
        where("question", "==", currentQuestion)
      );

      const querySnap = await getDocs(userAnswerQuery);

      // if the user already answerd the question dont save it again
      if (!querySnap.empty) {
        console.log("Query Snap Size", querySnap.size);
        toast.info("Already Answered", {
          description: "You have already answered this question",
        });
        return;
      } else {
        // save the user answer

        await addDoc(collection(db, "userAnswers"), {
          mockIdRef: interviewId,
          question: question.question,
          correct_ans: question.answer,
          user_ans: userAnswer,
          feedback: aiResult.feedback,
          rating: aiResult.ratings,
          userId,
          createdAt: serverTimestamp(),
        });

        toast("Saved", { description: "Your answer has been saved.." });
      }

      setUserAnswer("");
      stopSpeechToText();
    } catch (error) {
      toast("Error", {
        description: "An error occurred while generating feedback.",
      });
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(!open);
    }
  };

  useEffect(() => {
    const combineTranscripts = results
      .filter((result): result is ResultType => typeof result !== "string")
      .map((result) => result.transcript)
      .join(" ");

    setUserAnswer(combineTranscripts);
  }, [results]);

  return (
    <div className="w-full flex flex-col items-center gap-8 mt-4">
      {/* save modal */}
      <SaveModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={saveUserAnswer}
        loading={loading}
      />

      {/* webcam */}
      <div
        className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center 
    border border-gray-700 dark:border-gray-600 p-6 rounded-xl shadow-2xl 
    bg-gray-900 dark:bg-gray-950 
    backdrop-blur-xl transition-all duration-500 relative 
    hover:shadow-gray-500/30 dark:hover:shadow-gray-950/40 overflow-hidden"
      >
        {isWebCam ? (
          <WebCam
            onUserMedia={() => setIsWebCam(true)}
            onUserMediaError={() => setIsWebCam(false)}
            className="w-full h-full object-cover rounded-lg border border-gray-700 dark:border-gray-600 
        shadow-lg shadow-gray-600/20 dark:shadow-gray-950/30 transition-all duration-300"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <div
              className="p-6 bg-gray-800 dark:bg-gray-900 rounded-full border border-gray-700 dark:border-gray-600 
          shadow-xl shadow-gray-700/20 dark:shadow-gray-950/20 transition-all duration-300 hover:scale-105"
            >
              <WebcamIcon className="w-24 h-24 text-gray-400 dark:text-gray-300 animate-pulse" />
            </div>
            <p className="text-gray-400 dark:text-gray-300 text-sm font-medium">
              Webcam is Off
            </p>
          </div>
        )}
      </div>

      {/* tooltip */}
      <div className="flex items-center justify-center gap-4 p-3 bg-gray-900 rounded-lg shadow-md">
        <TooltipButton
          content={isWebCam ? "Turn Off" : "Turn On"}
          icon={
            isWebCam ? (
              <VideoOff className="w-5 h-5 text-red-400 hover:scale-110 transition-all" />
            ) : (
              <Video className="w-5 h-5 text-green-400 hover:scale-110 transition-all" />
            )
          }
          onClick={() => setIsWebCam(!isWebCam)}
        />

        <TooltipButton
          content={isRecording ? "Stop Recording" : "Start Recording"}
          icon={
            isRecording ? (
              <CircleStop className="w-5 h-5 text-red-500 hover:scale-110 transition-all" />
            ) : (
              <Mic className="w-5 h-5 text-blue-400 hover:scale-110 transition-all" />
            )
          }
          onClick={recordUserAnswer}
        />

        <TooltipButton
          content="Record Again"
          icon={
            <RefreshCw className="w-5 h-5 text-yellow-400 hover:rotate-180 transition-transform duration-300" />
          }
          onClick={recordNewAnswer}
        />

        <TooltipButton
          content="Save Result"
          icon={
            isAiGenerating ? (
              <Loader className="w-5 h-5 text-gray-400 animate-spin" />
            ) : (
              <Save className="w-5 h-5 text-emerald-400 hover:scale-110 transition-all" />
            )
          }
          onClick={() => setOpen(!open)}
          disbaled={!aiResult}
        />
      </div>

      {/* answer */}
      <div className="w-full mt-4 p-4 border border-gray-700 rounded-lg bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-lg transition-all duration-300">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-100 tracking-wide">
          <Mic className="w-5 h-5 text-emerald-400" /> Your Answer:
        </h2>

        <p className="flex items-center gap-2 text-sm mt-2 text-gray-300 whitespace-normal animate-fade-in">
          {userAnswer || (
            <>
              <Mic className="w-4 h-4 text-gray-500" /> Start recording to see
              your answer here
            </>
          )}
        </p>

        {interimResult && (
          <p className="flex items-center gap-2 text-sm text-gray-400 mt-3 animate-pulse">
            <MessageSquareText className="w-4 h-4 text-blue-400" />
            <strong className="text-gray-300">Current Speech:</strong>{" "}
            {interimResult}
          </p>
        )}
      </div>
    </div>
  );
};
