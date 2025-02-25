import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";

const reviews = [
  {
    name: "Amit",
    username: "@amit",
    body: "The features in this app have made a huge difference. It's exactly what I needed for career prep and interview coaching.",
    img: "https://avatar.vercel.sh/amit",
  },
  {
    name: "Priya",
    username: "@priya",
    body: "I'm blown away by how well the app organizes everything. From resume building to interview preparation, it's all in one place.",
    img: "https://avatar.vercel.sh/priya",
  },
  {
    name: "Ravi",
    username: "@ravi",
    body: "This app is a game-changer! It helped me organize my job search and gave me the resources I needed to prepare effectively.",
    img: "https://avatar.vercel.sh/ravi",
  },
  {
    name: "Sita",
    username: "@sita",
    body: "I love how user-friendly the app is. It’s easy to navigate, and the interview tips have been incredibly helpful.",
    img: "https://avatar.vercel.sh/sita",
  },
  {
    name: "Raj",
    username: "@raj",
    body: "Great app for anyone serious about job hunting! The resume templates and tips for interviews have made a big impact on my career journey.",
    img: "https://avatar.vercel.sh/raj",
  },
  {
    name: "Neha",
    username: "@neha",
    body: "I recommend this app to anyone who wants to stand out in their job search. The career advice and resume builder have been invaluable.",
    img: "https://avatar.vercel.sh/neha",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] hover:shadow-xl hover:shadow-blue-500/50 transition-all",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15] dark:hover:shadow-xl dark:hover:shadow-blue-500/50"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
