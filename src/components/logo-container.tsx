import { Link } from "react-router-dom";

export const LogoContainer = () => {
  return (
    <Link to={"/"} className="flex items-center gap-2">
      {/* Logo Image */}
      <img
        src="/logo.svg"
        alt="Prepwise Logo"
        className="w-10 h-10 object-contain transition-transform duration-200 hover:scale-105"
      />
      {/* Logo Text */}
      <span className="text-2xl font-bold text-neutral-800 dark:text-white">
        Prepwise
      </span>
    </Link>
  );
};
