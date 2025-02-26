import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/clerk-react";
import { Rocket } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Container } from "./container";
import { LogoContainer } from "./logo-container";
import { NavigationRoutes } from "./navigation-routes";
import { ProfileContainer } from "./profile-container";
import { ToggleContainer } from "./toggle-container";

const Header = () => {
  const { userId } = useAuth();

  return (
    <header
      className={cn(
        "w-full border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-800 via-gray-900 to-black",
        "duration-150 transition-all ease-in-out"
      )}
    >
      <Container>
        <div className="flex items-center gap-4 w-full">
          {/* Logo section */}
          <LogoContainer />

          {/* Navigation section */}
          <nav className="hidden md:flex items-center justify-center w-full gap-3">
            <NavigationRoutes />
            {userId && (
              <NavLink
                to="/generate"
                className={({ isActive }) =>
                  cn(
                    "relative flex items-center gap-2 text-base px-4 py-2 border border-emerald-500 rounded-lg transition-all duration-300", // Border, spacing, and smooth transition
                    "text-gray-600 dark:text-gray-300", // Default colors
                    isActive && "text-gray-900 dark:text-white font-semibold", // Active state
                    "hover:bg-emerald-100 dark:hover:bg-emerald-900 hover:border-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-400", // Hover effect
                    "ml-4" // Left margin to add gap
                  )
                }
              >
                <Rocket className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                <span className="text-emerald-400">Take An Interview</span>
              </NavLink>
            )}
          </nav>

          <div className="ml-auto flex items-center gap-6">
            {/* Profile section */}
            <ProfileContainer />

            {/* Mobile toggle section */}
            <ToggleContainer />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
