import { useAuth, UserButton } from "@clerk/clerk-react";
import { Loader, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const ProfileContainer = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="w-5 h-5 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      {isSignedIn ? (
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox:
                "w-10 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full transition-all hover:scale-105",
            },
          }}
        />
      ) : (
        <Link to="/signin">
          <Button
            size="sm"
            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-emerald-500 text-white rounded-lg shadow-md transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg dark:bg-emerald-600 dark:hover:bg-emerald-700"
          >
            <LogIn className="w-4 h-4" /> Sign In
          </Button>
        </Link>
      )}
    </div>
  );
};
