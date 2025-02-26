import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { RecordAnswer } from "./record-answer";
import { TooltipButton } from "./tooltip-button";

interface QuestionSectionProps {
  questions: { question: string; answer: string }[];
}

export const QuestionSection = ({ questions }: QuestionSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWebCam, setIsWebCam] = useState(false);

  const [currentSpeech, setCurrentSpeech] =
    useState<SpeechSynthesisUtterance | null>(null);

  const handlePlayQuestion = (qst: string) => {
    if (isPlaying && currentSpeech) {
      // stop the speech if already playing
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSpeech(null);
    } else {
      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(qst);
        window.speechSynthesis.speak(speech);
        setIsPlaying(true);
        setCurrentSpeech(speech);

        // handle the speech end
        speech.onend = () => {
          setIsPlaying(false);
          setCurrentSpeech(null);
        };
      }
    }
  };

  return (
    <div className="w-full min-h-96 border border-gray-300 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-900 shadow-lg">
      <Tabs
        defaultValue={questions[0]?.question}
        className="w-full space-y-10"
        orientation="vertical"
      >
        {/* Tabs Navigation */}
        <TabsList className="bg-transparent w-full flex flex-wrap items-center justify-start gap-3">
          {questions?.map((tab, i) => (
            <TabsTrigger
              key={tab.question}
              value={tab.question}
              className={cn(
                "flex items-center gap-2 text-sm px-4 py-2 font-medium rounded-lg transition-all duration-300",
                "data-[state=active]:bg-emerald-200 dark:data-[state=active]:bg-emerald-700",
                "data-[state=active]:shadow-md text-gray-600 dark:text-gray-300"
              )}
            >
              {`Question #${i + 1}`}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tabs Content */}
        {questions?.map((tab, i) => (
          <TabsContent key={i} value={tab.question}>
            <div className="space-y-6">
              {/* Question Text */}
              <div className="flex items-center gap-2">
                <p className="text-lg font-medium text-gray-700 dark:text-gray-200 leading-relaxed">
                  {tab.question}
                </p>
              </div>

              {/* Controls: Play Button */}
              <div className="w-full flex items-center justify-end">
                <TooltipButton
                  content={isPlaying ? "Stop" : "Play Question"}
                  icon={
                    isPlaying ? (
                      <VolumeX className="w-6 h-6 text-red-500 dark:text-red-400" />
                    ) : (
                      <Volume2 className="w-6 h-6 text-green-500 dark:text-green-400" />
                    )
                  }
                  onClick={() => handlePlayQuestion(tab.question)}
                />
              </div>

              {/* Record Answer Section */}
              <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm flex items-center gap-3">
                <RecordAnswer
                  question={tab}
                  isWebCam={isWebCam}
                  setIsWebCam={setIsWebCam}
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
