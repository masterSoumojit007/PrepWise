/* eslint-disable @typescript-eslint/no-unused-vars */
import { Interview } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderPage } from "./loader-page";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";
import { QuestionSection } from "@/components/question-section";

export const MockInterviewPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);

  const [isLoading, setIsLoading] = useState(false);

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
      <CustomBreadCrumb
        breadCrumbPage="Start"
        breadCrumpItems={[
          { label: "Mock Interviews", link: "/generate" },
          {
            label: interview?.position || "",
            link: `/generate/interview/${interview?.id}`,
          },
        ]}
      />

      <div className="w-full">
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
              video is{" "}
              <strong className="text-yellow-400">never recorded</strong>. You
              can disable your webcam at any time.
            </AlertDescription>
          </div>
        </Alert>
      </div>

      {interview?.questions && interview?.questions.length > 0 && (
        <div className="mt-4 w-full flex flex-col items-start gap-4">
          <QuestionSection questions={interview?.questions} />
        </div>
      )}
    </div>
  );
};
