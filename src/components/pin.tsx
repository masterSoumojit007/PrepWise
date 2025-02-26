import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Interview } from "@/types";
import {
  Briefcase,
  CalendarClock,
  Eye,
  Newspaper,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TooltipButton } from "./tooltip-button";
import { Badge } from "./ui/badge";

interface InterviewPinProps {
  interview: Interview;
  onMockPage?: boolean;
}

export const InterviewPin = ({
  interview,
  onMockPage = false,
}: InterviewPinProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="p-5 rounded-lg bg-gray-900 border border-gray-700 shadow-md transition-shadow duration-500 ease-in-out cursor-pointer space-y-4 
hover:ring-2 hover:ring-blue-400/50 hover:shadow-xl hover:shadow-blue-500/50"
    >
      {/* Job Position with Briefcase Icon */}
      <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-emerald-400" />
        {interview?.position}
      </CardTitle>

      {/* Job Description */}
      <CardDescription className="text-gray-400">
        {interview?.description}
      </CardDescription>

      {/* Tech Stack with Glowing Badges */}
      <div className="w-full flex items-center gap-2 flex-wrap">
        {interview?.techStack.split(",").map((word, index) => (
          <Badge
            key={index}
            variant="outline"
            className="text-xs font-medium border-gray-600 text-gray-300 bg-gray-800 px-2 py-1 rounded-md flex items-center gap-1 transition-all duration-500 ease-in-out
        hover:border-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 hover:shadow-md hover:shadow-emerald-400/40"
          >
            {word}
          </Badge>
        ))}
      </div>

      {/* Footer Section */}
      <CardFooter className="w-full flex items-center justify-between flex-wrap gap-2 p-0">
        {/* ✅ Timestamp with CalendarClock Icon */}
        <p className="text-xs text-gray-400 min-w-0 truncate flex items-center gap-2">
          <CalendarClock className="w-4 h-4 text-gray-400" />
          {`${new Date(interview?.createdAt.toDate()).toLocaleDateString(
            "en-US",
            { dateStyle: "long" }
          )} - ${new Date(interview?.createdAt.toDate()).toLocaleTimeString(
            "en-US",
            { timeStyle: "short" }
          )}`}
        </p>

        {!onMockPage && (
          <div className="flex items-center justify-center gap-3">
          {/* View Button with Eye Icon */}
          <div className="group cursor-pointer">
            <TooltipButton
              content="View"
              buttonVariant="ghost"
              onClick={() => navigate(`/generate/${interview?.id}`, { replace: true })}
              disbaled={false}
              buttonClassName="transition-all duration-500 ease-in-out flex items-center gap-1 group-hover:text-sky-400"
              icon={
                <div className="p-2 border border-gray-600 rounded-full transition-all duration-500 ease-in-out 
                  group-hover:border-sky-400 group-hover:shadow-md group-hover:shadow-blue-400/50">
                  <Eye className="w-5 h-5 text-gray-400 group-hover:text-sky-400" />
                </div>
              }
              loading={false}
            />
          </div>
        
          {/* Feedback Button with Newspaper Icon */}
          <div className="group cursor-pointer">
            <TooltipButton
              content="Feedback"
              buttonVariant="ghost"
              onClick={() => navigate(`/generate/feedback/${interview?.id}`, { replace: true })}
              disbaled={false}
              buttonClassName="transition-all duration-500 ease-in-out flex items-center gap-1 group-hover:text-yellow-400"
              icon={
                <div className="p-2 border border-gray-600 rounded-full transition-all duration-500 ease-in-out 
                  group-hover:border-yellow-400 group-hover:shadow-md group-hover:shadow-yellow-400/50">
                  <Newspaper className="w-5 h-5 text-gray-400 group-hover:text-yellow-400" />
                </div>
              }
              loading={false}
            />
          </div>
        
          {/* Start Button with Sparkles Icon */}
          <div className="group cursor-pointer">
            <TooltipButton
              content="Start"
              buttonVariant="ghost"
              onClick={() => navigate(`/generate/interview/${interview?.id}`, { replace: true })}
              disbaled={false}
              buttonClassName="transition-all duration-500 ease-in-out flex items-center gap-1 group-hover:text-emerald-400"
              icon={
                <div className="p-2 border border-gray-600 rounded-full transition-all duration-500 ease-in-out 
                  group-hover:border-emerald-400 group-hover:shadow-md group-hover:shadow-emerald-400/50">
                  <Sparkles className="w-5 h-5 text-gray-400 group-hover:text-emerald-400" />
                </div>
              }
              loading={false}
            />
          </div>
        </div>
        
        )}
      </CardFooter>
    </Card>
  );
};
