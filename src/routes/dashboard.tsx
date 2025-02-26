import { Headings } from "@/components/headings";
import { InterviewPin } from "@/components/pin";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/config/firebase.config";
import { Interview } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export const Dashboard = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    setLoading(true);
    const interviewQuery = query(
      collection(db, "interviews"),
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(
      interviewQuery,
      (snapshot) => {
        const interviewList: Interview[] = snapshot.docs.map((doc) => {
          const id = doc.id;
          return {
            id,
            ...doc.data(),
          };
        }) as Interview[];
        setInterviews(interviewList);
        setLoading(false);
      },
      (error) => {
        console.error("Error on fetching: ", error);
        toast.error("Error", {
          description: "Something went wrong. Try again later.",
        });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return (
    <div className="w-full bg-gray-950 min-h-screen px-4 sm:px-6 lg:px-8 py-6 text-gray-300">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between gap-4">
        <Headings
          title="Dashboard"
          description="Create and start your AI Mock Interview"
        />
        <Link to={"/generate/create"} className="ml-auto">
          <Button
            className="bg-gradient-to-r from-blue-700 to-cyan-500 
                 hover:from-blue-600 hover:to-cyan-400 
                 text-white font-semibold shadow-md rounded-lg 
                 px-4 sm:px-5 py-2 transition-all transform 
                 hover:shadow-lg hover:shadow-cyan-500/50"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New
          </Button>
        </Link>
      </div>

      <Separator className="my-6 bg-gray-800" />

      {/* INTERVIEW CONTENT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
        {/* LOADING STATE */}
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-28 md:h-36 rounded-xl shadow-md bg-gray-800/50"
            />
          ))
        ) : interviews.length > 0 ? (
          // INTERVIEW LIST
          interviews.map((interview) => (
            <InterviewPin key={interview.id} interview={interview} />
          ))
        ) : (
          // NO DATA FOUND
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex flex-col items-center justify-center text-center py-8 px-4 sm:px-6 rounded-lg border border-gray-700 shadow-lg bg-gray-800/30 backdrop-blur-lg">
            <img
              src="/assets/svg/not-found.svg"
              className="w-28 h-28 sm:w-32 sm:h-32 object-contain opacity-70"
              alt="No Data"
            />

            <h2 className="mt-4 text-lg font-semibold text-gray-400">
              No Data Found
            </h2>

            <p className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 text-sm text-gray-500 mt-2">
              There are no mock interviews available. Start creating one now!
            </p>

            <Link to={"/generate/create"} className="mt-4">
              <Button
                className="bg-gradient-to-r from-blue-700 to-cyan-500 
                 hover:from-blue-600 hover:to-cyan-400 
                 text-white font-semibold shadow-md rounded-lg 
                 px-4 sm:px-5 py-2 transition-all transform 
                 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                <Plus className="w-5 h-5 mr-1" />
                Add New
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
