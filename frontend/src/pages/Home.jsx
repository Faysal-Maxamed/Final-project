import React from 'react';
import Header from '../components/header';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Welcome to My Awesome App</h2>
          <p className="text-gray-700">
            This is a simple home page built with React, Vite, and Tailwind CSS. Feel free to explore!
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;