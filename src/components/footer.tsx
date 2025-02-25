import {
  Briefcase,
  ClipboardCheck,
  Facebook,
  FileText,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Newspaper,
  Phone,
  Send,
  Twitter,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [bgColor, setBgColor] = useState(
    "bg-gradient-to-br from-gray-800 to-black"
  );

  const handleLogoClick = () => {
    setBgColor("bg-gradient-to-br from-gray-800 to-gray-900");
    setTimeout(
      () => setBgColor("bg-gradient-to-br from-gray-900 to-black"),
      1000
    );
  };

  return (
    <>
      {/* Divider at the top */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"></div>

      <footer
        className={`w-full ${bgColor} text-gray-300 py-16 transition-all duration-700`}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-700 pb-10">
            {/* Logo & Branding */}
            <Link
              to="/"
              onClick={handleLogoClick}
              className="flex items-center gap-3"
            >
              <img
                src="/logo.png"
                alt="Logo"
                className="w-12 h-12 rounded-full shadow-xl transition-transform duration-300"
              />
              <span className="text-3xl font-extrabold text-white tracking-wide transition-all duration-300">
                PrepWise
              </span>
            </Link>

            {/* Social Links */}
            <div className="flex gap-6">
              {[
                { icon: Facebook, color: "hover:text-blue-500" },
                { icon: Twitter, color: "hover:text-blue-400" },
                { icon: Instagram, color: "hover:text-pink-500" },
                { icon: Linkedin, color: "hover:text-blue-700" },
              ].map(({ icon: Icon, color }, index) => (
                <a
                  key={index}
                  href="#"
                  className={`text-gray-400 ${color} transition-all duration-500 transform hover:scale-125 hover:-translate-y-1`}
                >
                  <Icon size={30} />
                </a>
              ))}
            </div>
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-10">
            {/* About Us */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4 hover:text-blue-400 transition-colors duration-300">
                About PrepWise
              </h3>
              <p className="text-gray-400 leading-relaxed">
                PrepWise is your ultimate career companion, offering expert
                guidance, resume-building services, and interview preparation to
                help you achieve your dream job.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4 hover:text-blue-400 transition-colors duration-300">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { text: "About Us", icon: ClipboardCheck, link: "/about" },
                  { text: "Our Services", icon: Briefcase, link: "/services" },
                  { text: "Contact Us", icon: MapPin, link: "/contact" },
                ].map(({ text, icon: Icon, link }, index) => (
                  <li key={index}>
                    <Link
                      to={link}
                      className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2"
                    >
                      <Icon size={22} /> {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4 hover:text-blue-400 transition-colors duration-300">
                Resources
              </h3>
              <ul className="space-y-3">
                {[
                  { text: "Career Blog", icon: Newspaper, link: "/blog" },
                  {
                    text: "Success Stories",
                    icon: Users,
                    link: "/success-stories",
                  },
                  {
                    text: "Resume Templates",
                    icon: FileText,
                    link: "/resume-templates",
                  },
                ].map(({ text, icon: Icon, link }, index) => (
                  <li key={index}>
                    <Link
                      to={link}
                      className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2"
                    >
                      <Icon size={22} /> {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4 hover:text-blue-400 transition-colors duration-300">
                Get In Touch
              </h3>
              <div className="space-y-4">
                {[
                  { text: "Tech City, 12345", icon: MapPin },
                  { text: "contact@prepwise.com", icon: Mail },
                  { text: "+91 98765 43210", icon: Phone },
                ].map(({ text, icon: Icon }, index) => (
                  <p
                    key={index}
                    className="flex items-center gap-4 text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <Icon size={22} /> {text}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-8">
            {/* Testimonial */}
            <div className="max-w-md mx-auto md:mx-0 text-center md:text-left py-4 px-6 border-l-4 border-blue-400 bg-gray-900 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-white mb-2 hover:text-blue-400 transition-colors duration-300">
                Inspirational Quote
              </h3>
              <p className="text-lg text-gray-300 italic hover:text-gray-100 transition-colors duration-300">
                “The only way to do great work is to love what you do.”
              </p>
              <span className="block text-gray-400 mt-2 font-medium text-right">
                — Steve Jobs
              </span>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-6 md:mt-0 w-full md:w-auto">
              <h3 className="text-xl font-semibold text-white mb-4 text-center md:text-left hover:text-blue-400 transition-colors duration-300">
                Subscribe to Our Newsletter
              </h3>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-3 w-full md:w-64 bg-gray-800/50 text-gray-300 border border-gray-600 focus:ring focus:ring-blue-500 rounded-l-lg focus:outline-none transition-all duration-300 focus:shadow-lg backdrop-blur-md"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-r-lg flex items-center gap-2 transform hover:scale-105 transition-transform duration-300 shadow-lg">
                  Subscribe <Send size={22} />
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500 text-sm mt-12">
            © {new Date().getFullYear()} PrepWise. All Rights Reserved.
            <br />
            <span className="text-white font-semibold">
              Made with 💙 by{" "}
              <span className="text-blue-400">Soumojit Banerjee</span>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
