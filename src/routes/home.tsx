import { Container } from "@/components/container";
import { TextAnimate } from "@/components/magicui/text-animate";
import LogoMarquee from "@/components/marquee";
import { MarqueeDemo } from "@/components/testimonial";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building,
  CheckCircle,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="flex flex-col w-full pb-24 bg-black text-white">
      <Container>
        {/* Hero Section */}
        <div className="my-12 text-center md:text-left px-4 md:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-300 to-yellow-300 font-extrabold md:text-8xl animate-gradient">
              AI Superpower
            </span>

            <span className="text-gray-300"> - Smarter way to</span>
            <br />
            <span className="text-gray-100 text-2xl sm:text-3xl mt-2 font-bold">
              Ace Your Interviews
            </span>
          </h2>

          <TextAnimate
            animation="blurInUp"
            by="character"
            once
            className="mt-4 text-gray-400 text-base sm:text-lg max-w-2xl"
          >
            Boost your interview skills and increase your success rate with
            AI-driven insights. Discover a smarter way to prepare, practice, and
            stand out.
          </TextAnimate>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 w-full items-center justify-center gap-6 sm:gap-8 lg:gap-10 px-6 sm:px-12 py-12">
          {[
            {
              label: "Offers Received",
              value: "250k+",
              gradient: "from-blue-400 to-purple-400",
              glow: "shadow-blue-400/50 hover:shadow-blue-400/90",
              icon: <Briefcase size={40} className="text-blue-300" />,
            },
            {
              label: "Interviews Aced",
              value: "1.2M+",
              gradient: "from-green-400 to-yellow-400",
              glow: "shadow-green-400/50 hover:shadow-green-400/90",
              icon: <CheckCircle size={40} className="text-green-300" />,
            },
            {
              label: "Companies Covered",
              value: "500+",
              gradient: "from-pink-400 to-red-400",
              glow: "shadow-pink-400/50 hover:shadow-pink-400/90",
              icon: <Building size={40} className="text-pink-300" />,
            },
            {
              label: "Active Users",
              value: "2M+",
              gradient: "from-teal-400 to-cyan-400",
              glow: "shadow-teal-400/50 hover:shadow-teal-400/90",
              icon: <Users size={40} className="text-teal-300" />,
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center bg-gray-900/50 backdrop-blur-lg rounded-xl p-10 shadow-xl border border-gray-800 transition-all duration-500 hover:shadow-2xl w-full max-w-[300px] mx-auto border-transparent ${item.glow}`}
            >
              {/* Icon with subtle glow effect */}
              <div className="mb-4 p-3 bg-gray-800/70 rounded-full shadow-md">
                {item.icon}
              </div>

              {/* Value */}
              <p
                className={`text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${item.gradient} drop-shadow-md`}
              >
                {item.value}
              </p>

              {/* Label */}
              <span className="block text-lg sm:text-xl text-gray-300 font-medium mt-2 text-center">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Image Section */}
        <div className="relative w-full mt-6 rounded-2xl overflow-hidden shadow-2xl">
          {/* Hero Image - Fully Responsive */}
          <img
            src="/assets/img/hero.jpg"
            alt="Hero"
            className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[65vh] object-cover object-center opacity-80 transition-all duration-500 hover:opacity-100 hover:scale-105"
          />

          {/* Branding Badge (Position Adjusts on Mobile) */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-3 sm:px-4 py-1 sm:py-2 rounded-lg bg-white/10 backdrop-blur-lg text-white shadow-md border border-white/20 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-white/20 hover:shadow-lg">
            <span className="font-bold text-gray-100">Interviews Copilot</span>{" "}
            &copy;
          </div>

          {/* Info Card - Mobile & Desktop Adjustments */}
          <div className="absolute w-[90%] sm:w-80 bottom-4 sm:bottom-6 left-1/2 sm:left-auto right-auto sm:right-6 transform -translate-x-1/2 sm:translate-x-0 p-4 sm:p-6 rounded-xl bg-white/10 backdrop-blur-xl text-white shadow-xl border border-white/20">
            <h2 className="font-semibold text-lg sm:text-xl text-gray-100">
              Developer Insights
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mt-1">
              Unlock AI-powered insights and refine your skills with smart
              interview preparation.
            </p>

            {/* Call-to-Action Button - Adjusted for Mobile */}
            <Button className="mt-4 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-4 sm:px-5 py-2 rounded-lg shadow-lg transition-all duration-500 ease-in-out transform hover:shadow-xl hover:shadow-blue-500/40">
              Generate <Sparkles />
            </Button>
          </div>
        </div>
      </Container>

      {/* Marquee Section */}
      <div className="w-full my-12">
        <LogoMarquee />
      </div>

      <Container className="py-20 space-y-16 px-6 sm:px-12 md:px-16">
        {/* Heading */}
        <h2 className="tracking-wide text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-100 font-extrabold text-center mb-8">
          Unleash your potential with personalized AI insights and targeted
          interview practice.
        </h2>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Image Section */}
          <div className="col-span-1 md:col-span-3">
            <img
              src="/assets/img/office.jpg"
              alt="Office"
              className="w-full h-80 sm:h-96 rounded-3xl object-cover object-center opacity-85 transition-all duration-500 hover:opacity-100 hover:scale-105 shadow-2xl transform hover:rotate-2"
            />
          </div>

          {/* Text and Button Section */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center text-center gap-8 p-8 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl transform transition-all duration-500 hover:shadow-xl">
            {/* Text Content */}
            <p className="text-lg sm:text-xl text-gray-100 leading-relaxed font-semibold tracking-wide">
              Transform the way you prepare, gain confidence, and boost your
              chances of landing your dream job. Let AI be your edge in today’s
              competitive job market.
            </p>

            {/* Button */}
            <Link to={"/generate"} className="w-full">
              <Button className="w-full sm:w-3/4 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white py-3 px-6 rounded-xl shadow-2xl transition-all duration-300 transform hover:shadow-lg animate-slow-bounce">
                Generate <Sparkles className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      <div className="w-full my-12 px-4 sm:px-6 md:px-8">
        <h2 className="tracking-wide text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-100 font-extrabold text-center mb-8">
          Hear What Our Users Have to Say: Real Stories, Real Success!
        </h2>
        <MarqueeDemo />
      </div>
    </div>
  );
};

export default HomePage;
