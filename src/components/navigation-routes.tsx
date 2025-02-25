import { MainRoutes } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface NavigationRoutesProps {
  isMobile?: boolean;
}

export const NavigationRoutes = ({
  isMobile = false,
}: NavigationRoutesProps) => {
  return (
    <ul
      className={cn(
        "flex items-center gap-8", // Increased gap for better spacing
        isMobile && "items-start flex-col gap-10" // More spacing for mobile view
      )}
    >
      {MainRoutes.map((route) => (
        <NavLink
          key={route.href}
          to={route.href}
          className={({ isActive }) =>
            cn(
              "relative text-base transition-all duration-200 px-2 py-1", // Added padding for spacing
              "text-neutral-600 dark:text-neutral-300", // Default color
              isActive && "text-neutral-900 dark:text-white font-semibold", // Active state
              "hover:text-black dark:hover:text-gray-200 hover:scale-105" // Hover effect
            )
          }
        >
          {route.label}
          {/* Underline animation on hover */}
          <span className="absolute left-1/2 bottom-0 w-3/4 h-[2px] bg-black dark:bg-white origin-center scale-x-0 transition-transform duration-200 ease-in-out hover:scale-x-100" />
        </NavLink>
      ))}
    </ul>
  );
};
