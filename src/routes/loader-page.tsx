import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

export const LoaderPage = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white z-50",
        className
      )}
    >
      {/* GLASSMORPHIC BACKGROUND */}
      <div className="relative flex flex-col items-center justify-center p-8 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl border border-white/20">
        <Loader className="w-12 h-12 text-blue-400 animate-spin drop-shadow-lg" />
        
        <p className="mt-4 text-lg font-semibold text-gray-300 animate-pulse tracking-wide">
          Loading, please wait...
        </p>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-blue-400 opacity-10 blur-3xl" />
      </div>
    </div>
  );
};
