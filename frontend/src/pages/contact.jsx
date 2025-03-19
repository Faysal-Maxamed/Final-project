import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import contactBg from "../assets/contact.png"; // Import the image

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-gray-900", "text-white");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("bg-gray-900", "text-white");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      setStatus(res.data.message);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <section
          className="py-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${contactBg})` }} // Use the imported image
        >
          <div className="container mx-auto px-4">
            <div className="bg-white shadow-md rounded-lg flex overflow-hidden">
              <div className="bg-white p-6 flex-1 border-r border-gray-200">
                <h2 className="text-xl font-bold text-blue-600">Get In Touch</h2>
                <p className="text-gray-700 text-sm mt-2">
                  We'd love to hear from you! Whether you have questions, feedback, or need support, feel free to reach out.
                </p>

                <h3 className="font-semibold mt-4">Call Us</h3>
                <p className="text-gray-800">+252 614 388 477</p>
                <p className="text-gray-800">+252 616 111 920</p>

                <h3 className="font-semibold mt-4">Follow Our Social Media</h3>
                <div className="social-icons">
                  <a href="#" aria-label="Twitter" className="social-icon twitter">
                    𝕏
                  </a>
                  <a href="#" aria-label="Facebook" className="social-icon facebook">
                    f
                  </a>
                  <a href="#" aria-label="LinkedIn" className="social-icon linkedin">
                    in
                  </a>
                  <style jsx>{`
                    .social-icons {
                      display: flex;
                      gap: 10px;
                      margin-top: 10px;
                    }
                    .social-icon {
                      display: inline-flex;
                      align-items: center;
                      justify-content: center;
                      width: 35px;
                      height: 35px;
                      background: #1a73e8;
                      color: white;
                      border-radius: 50%;
                      text-decoration: none;
                      font-weight: bold;
                      font-size: 14px;
                    }
                    .social-icon:hover {
                      background: #1557b0;
                    }
                  `}</style>
                </div>
              </div>

              <div className="bg-gray-100 p-6 flex-1">
                <h2 className="text-blue-600 text-lg font-semibold mb-4">Send Us a Message</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Write anything"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded h-24 resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-yellow-400 text-gray-800 font-bold py-2 rounded transition hover:bg-yellow-300"
                  >
                    Submit
                  </button>
                </form>
                {status && <p className="mt-4 text-gray-700">{status}</p>}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
