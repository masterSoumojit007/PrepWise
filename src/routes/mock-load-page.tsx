/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/config/firebase.config";
import { Interview } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoaderPage } from "./loader-page";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { Button } from "@/components/ui/button";
import { Camera, Lightbulb, Sparkles, WebcamIcon } from "lucide-react";
import { InterviewPin } from "@/components/pin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WebCam from "react-webcam";

export const MockLoadPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fetchInterview = async () => {
      if (interviewId) {
        try {
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
          if (interviewDoc.exists()) {
            setInterview({
              id: interviewDoc.id,
              ...interviewDoc.data(),
            } as Interview);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchInterview();
  }, [interviewId, navigate]);

  if (isLoading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  if (!interviewId) {
    navigate("/generate", { replace: true });
  }

  if (!interview) {
    navigate("/generate", { replace: true });
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5">
      <div className="flex items-center justify-between w-full gap-2">
        <CustomBreadCrumb
          breadCrumbPage={interview?.position || ""}
          breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
        />

        <Link to={`/generate/interview/${interviewId}/start`} className="group">
          <Button
            size="sm"
            className="flex items-center gap-2 px-5 py-2.5 rounded-md font-medium text-white 
    bg-emerald-500 shadow-md shadow-emerald-500/20 transition-all duration-300 
    hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/40"
          >
            Start
            <Sparkles className="w-5 h-5 text-white group-hover:text-white transition-colors duration-300" />
          </Button>
        </Link>
      </div>
      {interview && <InterviewPin interview={interview} onMockPage />}
      <Alert className="bg-gray-900 border border-yellow-300 p-5 rounded-lg flex items-start gap-4 shadow-lg shadow-yellow-300/20 -mt-3">
        <div className="p-2 bg-yellow-200/30 border border-yellow-300 rounded-full">
          <Lightbulb className="h-6 w-6 text-yellow-500" />
        </div>
        <div>
          <AlertTitle className="text-yellow-500 font-semibold text-lg">
            Important Information
          </AlertTitle>
          <AlertDescription className="text-sm text-gray-200 mt-2 leading-relaxed">
            Please enable your{" "}
            <strong className="text-yellow-400">webcam</strong> and
            <strong className="text-yellow-400"> microphone</strong> to start
            the AI-generated mock interview. The interview consists of five
            questions. You’ll receive a
            <span className="text-yellow-400 font-medium">
              {" "}
              personalized report
            </span>{" "}
            based on your responses at the end.
            <br />
            <br />
            <span className="font-medium text-yellow-500">Note:</span> Your
            video is <strong className="text-yellow-400">never recorded</strong>
            . You can disable your webcam at any time.
          </AlertDescription>
        </div>
      </Alert>
      <div className="flex items-center justify-center w-full h-full">
        <div
          className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center 
      border border-gray-300 dark:border-gray-700 p-6 rounded-xl shadow-2xl 
      bg-gradient-to-br from-gray-100/50 to-white/60 dark:from-gray-800/50 dark:to-gray-900/60 
      backdrop-blur-xl transition-all duration-500 relative"
        >
          {isWebCamEnabled ? (
            <WebCam
              onUserMedia={() => setIsWebCamEnabled(true)}
              onUserMediaError={() => setIsWebCamEnabled(false)}
              className="w-full h-full object-cover rounded-lg border border-gray-300 dark:border-gray-700 
          shadow-lg shadow-gray-400/20 dark:shadow-gray-900/30 transition-all duration-300"
            />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div
                className="p-5 bg-gray-200 dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-600 
            shadow-lg shadow-gray-400/20 dark:shadow-gray-900/20 transition-all duration-300"
              >
                <WebcamIcon className="w-24 h-24 text-gray-500 dark:text-gray-300 animate-pulse" />
              </div>
              <p className="text-gray-700 dark:text-gray-400 text-sm font-medium">
                Webcam is disabled
              </p>
            </div>
          )}

          {/* Floating Glow Effect */}
          <div
            className="absolute inset-0 rounded-xl border border-transparent 
        bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 
        opacity-40 blur-lg transition-all duration-700"
          ></div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button
          onClick={() => setIsWebCamEnabled(!isWebCamEnabled)}
          className="px-6 py-3 font-medium text-white rounded-lg transition-all duration-300 
      bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400
      shadow-lg shadow-cyan-500/30 dark:shadow-blue-500/20 
      hover:shadow-cyan-400/50 dark:hover:shadow-blue-400/50 
      focus:ring-2 focus:ring-cyan-400 dark:focus:ring-blue-400
      flex items-center gap-2"
        >
          <Camera className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
          {isWebCamEnabled ? "Disable Webcam" : "Enable Webcam"}
        </Button>
      </div>
    </div>
  );
};
