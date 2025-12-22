import React from 'react';

const NewsletterSignup = () => (
  <section className="py-12 bg-white flex flex-col items-center">
    <h4 className="text-2xl font-bold text-pink-700 mb-2">Stay in the Loop</h4>
    <p className="text-gray-700 mb-6 text-center">Sign up for our newsletter and get exclusive offers, hair tips, and more!</p>
    <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        placeholder="Your email address"
        className="flex-1 px-4 py-2 rounded-full border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        required
      />
      <button
        type="submit"
        className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-full shadow transition-all"
      >
        Subscribe
      </button>
    </form>
  </section>
);

export default NewsletterSignup;
