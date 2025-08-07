

import { useState, useEffect } from "react"
import React from "react"
import axios from "axios"
import Header from "../components/header"
import Footer from "../components/footer"
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTwitter, FaFacebookF, FaLinkedinIn, FaPaperPlane } from "react-icons/fa"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [status, setStatus] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark")

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-gray-900", "text-white")
      localStorage.setItem("theme", "dark")
    } else {
      document.body.classList.remove("bg-gray-900", "text-white")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus("Sending...")

    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData)
      setStatus(res.data.message)
      setFormData({ name: "", email: "", phone: "", message: "" })
    } catch (error) {
      setStatus("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="pt-32 pb-16">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                darkMode ? "text-white" : "bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent"
              }`}
            >
              Get In Touch With Us
            </h1>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"} mb-8`}>
              We'd love to hear from you. Reach out with any questions or inquiries.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <section className="container mx-auto px-4 mb-16">
          <div
            className={`rounded-2xl shadow-xl overflow-hidden ${
              darkMode ? "bg-gray-800" : "bg-white"
            } flex flex-col md:flex-row`}
          >
            {/* Contact Info */}
            <div
              className={`p-8 md:p-12 md:w-2/5 ${
                darkMode
                  ? "bg-gradient-to-br from-blue-900 to-indigo-900"
                  : "bg-gradient-to-br from-blue-600 to-indigo-700"
              } text-white relative`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-8">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
                      <FaPhone className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Call Us</h3>
                      <p className="text-white text-opacity-80">+252 614 388 477</p>
                      <p className="text-white text-opacity-80">+252 616 111 920</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
                      <FaEnvelope className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email Us</h3>
                      <p className="text-white text-opacity-80">info@hrpmanagement.com</p>
                      <p className="text-white text-opacity-80">support@hrpmanagement.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
                      <FaMapMarkerAlt className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Visit Us</h3>
                      <p className="text-white text-opacity-80">123 Business Avenue</p>
                      <p className="text-white text-opacity-80">Mogadishu, Somalia</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
                    >
                      <FaTwitter className="text-white" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
                    >
                      <FaFacebookF className="text-white" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
                    >
                      <FaLinkedinIn className="text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`p-8 md:p-12 md:w-3/5 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <p className={`mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500"
                      } focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors`}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500"
                      } focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500"
                    } focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors`}
                    placeholder="+1 (123) 456-7890"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500"
                    } focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-none`}
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 rounded-lg flex items-center justify-center ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                    } text-white font-medium transition-all duration-200 w-full md:w-auto`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Send Message
                        <FaPaperPlane className="ml-2" />
                      </span>
                    )}
                  </button>
                </div>

                {status && (
                  <div
                    className={`p-4 rounded-lg ${
                      status.includes("Failed")
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    }`}
                  >
                    {status}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className={`rounded-2xl overflow-hidden shadow-lg h-96 ${darkMode ? "border border-gray-700" : ""}`}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254344.2244857242!2d45.21344!3d2.0468401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d58425955ce6b53%3A0x491d6d7468cf91c3!2sMogadishu%2C%20Somalia!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            ></iframe>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4">
          <div
            className={`rounded-2xl ${
              darkMode ? "bg-gradient-to-r from-blue-900 to-indigo-900" : "bg-gradient-to-r from-blue-600 to-indigo-700"
            } py-12 px-6 md:px-12 text-center text-white shadow-xl`}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
              Join our community of satisfied clients and experience the difference our services can make for your
              business.
            </p>
            <button className="px-8 py-3 bg-white text-indigo-700 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-md">
              Schedule a Consultation
            </button>
          </div>
        </section>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  )
}

export default Contact
