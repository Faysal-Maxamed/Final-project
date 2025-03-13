import React from 'react';
import Header from '../components/header';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">About Us</h2>
          <p className="text-gray-700 mb-4">
            Welcome to our About page! We are a team of passionate developers dedicated to building amazing web applications.
          </p>
          <p className="text-gray-700">
            Our mission is to provide high-quality solutions that make your life easier. Feel free to reach out to us if you have any questions or need assistance.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;