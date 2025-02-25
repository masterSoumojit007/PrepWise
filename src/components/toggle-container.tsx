import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Rocket, Navigation } from "lucide-react"; // Importing relevant icons
import { NavigationRoutes } from "./navigation-routes";
import { useAuth } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export const ToggleContainer = () => {
  const { userId } = useAuth();

  return (
    <Sheet>
      {/* Hamburger Menu Button */}
      <SheetTrigger className="block md:hidden p-2 rounded-lg transition-all bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-gray-200 dark:hover:bg-gray-700 shadow-md">
        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      </SheetTrigger>

      {/* Sidebar Sheet */}
      <SheetContent className="bg-white dark:bg-gray-900 border-none shadow-xl rounded-lg">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-gray-900 dark:text-white" />
            <SheetTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              Navigation
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Navigation Items */}
        <nav className="mt-6 flex flex-col gap-4">
          <NavigationRoutes isMobile />

          {/* "Take An Interview" Button */}
          {userId && (
            <NavLink
              to="/generate"
              className={({ isActive }) =>
                cn(
                  "w-full flex items-center justify-center gap-2 px-5 py-3 text-base font-semibold rounded-lg transition-all duration-300",
                  "border border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-sm", // Default state
                  "hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white", // Hover effect
                  isActive &&
                    "bg-emerald-500 text-white dark:bg-emerald-600 shadow-lg scale-105" // Active state
                )
              }
            >
              <Rocket className="w-5 h-5" /> {/* Lucide Rocket Icon */}
              Take An Interview
            </NavLink>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
