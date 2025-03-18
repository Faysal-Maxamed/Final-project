import React, { useState } from "react";
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState(""); // Store email
  const [message, setMessage] = useState(""); // Success/Error message

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setMessage("❌ Please enter a valid email!");
      return;
    }

    try {
      // API Request (if you have a backend)
      // await fetch("YOUR_BACKEND_API_URL", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });

      setMessage("✅ Successfully subscribed! 🎉");
      setEmail(""); // Clear input
    } catch (error) {
      setMessage("❌ Subscription failed! Try again.");
    }
  };

  return (
    <footer
      className="bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://www.toptal.com/designers/subtlepatterns/patterns/diagonal_stripes.png')",
      }}
    >
      <div className="bg-gradient-to-b from-teal-700 to-cyan-900 bg-opacity-90">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & Social Links */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-4 hover:scale-105 transition-transform">
                HRP <span className="text-cyan-300">MANAGEMENT</span>
              </h2>
              <div className="flex space-x-4">
                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-gray-300 hover:text-cyan-300 transition-transform transform hover:scale-125"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-gray-300 hover:text-cyan-300 transition-transform transform hover:scale-125"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="text-gray-300 hover:text-cyan-300 transition-transform transform hover:scale-125"
                >
                  <FaLinkedinIn size={20} />
                </a>
              </div>
            </div>

            {/* Footer Links */}
            <div>
              <h4 className="text-lg font-semibold text-cyan-300 mb-3">
                Company
              </h4>
              <ul>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-cyan-300 transition-transform transform hover:translate-x-1"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-cyan-300 transition-transform transform hover:translate-x-1"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-cyan-300 transition-transform transform hover:translate-x-1"
                  >
                    Predict
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-cyan-300 transition-transform transform hover:translate-x-1"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-cyan-300 mb-3">
                Resources
              </h4>
              <ul>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-cyan-300 transition-transform transform hover:translate-x-1"
                  >
                    Docs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-cyan-300 transition-transform transform hover:translate-x-1"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-cyan-300 transition-transform transform hover:translate-x-1"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-cyan-300 transition-transform transform hover:translate-x-1"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Subscribe Section */}
            <div>
              <h4 className="text-lg font-semibold text-cyan-300 mb-3">
                Subscribe
              </h4>
              <p className="text-gray-300 mb-4">
                Join our newsletter to stay updated.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-l-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleSubscribe}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-cyan-500 hover:to-teal-500 transition px-4 py-2 rounded-r-md text-white font-semibold shadow-lg"
                >
                  Subscribe
                </button>
              </div>
              {message && <p className="mt-3 text-sm text-gray-300">{message}</p>}
            </div>
          </div>
        </div>

        {/* Footer Bottom Wave */}
        <div className="footer-wave bg-teal-500 h-10"></div>
      </div>
    </footer>
  );
};

export default Footer;
