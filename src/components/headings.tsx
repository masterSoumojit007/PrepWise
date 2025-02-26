import { cn } from "@/lib/utils";

interface HeadingsProps {
  title: string;
  description?: string;
  isSubHeading?: boolean;
}

export const Headings = ({
  title,
  description,
  isSubHeading = false,
}: HeadingsProps) => {
  return (
    <div className="space-y-1">
      <h2
        className={cn(
          "text-3xl md:text-4xl font-extrabold tracking-wide",
          "transition-all duration-200 hover:shadow-md text-blue-400",
          isSubHeading && "text-xl md:text-2xl text-gray-300"
        )}
      >
        {title}
      </h2>
      {description && <p className="text-sm text-gray-400">{description}</p>}
    </div>
  );
};
