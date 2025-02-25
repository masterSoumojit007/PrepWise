import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

export const LoaderPage = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 text-white z-50",
        className
      )}
    >
      <Loader className="w-10 h-10 animate-spin text-blue-400" />
      <p className="mt-4 text-lg font-medium text-gray-300 animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};
