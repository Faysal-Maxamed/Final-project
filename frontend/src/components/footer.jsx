import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold">Hospital Name</h2>
          <p className="mt-3 text-gray-400">
            Providing world-class healthcare with compassion, innovation, and excellence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-blue-400">Home</a></li>
            <li><a href="#" className="hover:text-blue-400">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400">Services</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <p className="mt-3 text-gray-400">123 Main Street, City, Country</p>
          <p className="text-gray-400">Phone: +123 456 7890</p>
          <p className="text-gray-400">Email: info@hospital.com</p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold">Newsletter</h3>
          <p className="mt-3 text-gray-400">Subscribe to receive the latest updates.</p>
          <div className="mt-3 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l-md w-full text-gray-900"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="mt-10 text-center">
        <h3 className="text-xl font-semibold">Follow Us</h3>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="#" className="text-gray-400 hover:text-blue-400 text-xl"><FaFacebookF /></a>
          <a href="#" className="text-gray-400 hover:text-blue-400 text-xl"><FaTwitter /></a>
          <a href="#" className="text-gray-400 hover:text-blue-400 text-xl"><FaInstagram /></a>
          <a href="#" className="text-gray-400 hover:text-blue-400 text-xl"><FaLinkedinIn /></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Hospital Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
