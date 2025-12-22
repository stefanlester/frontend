import React from 'react';

const testimonials = [
  {
    name: 'Lindiwe M.',
    text: 'Absolutely love my new wig! The quality is amazing and the service was top-notch.',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Thabo K.',
    text: 'Fast delivery and the shampoo leaves my hair so soft. Highly recommend HairCity!',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Zanele P.',
    text: 'The best hair oil I have ever used. My hair has never looked better!',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

const TestimonialSection = () => (
  <section className="py-16 bg-gray-100">
    <h3 className="text-3xl font-extrabold text-center text-pink-700 mb-10 drop-shadow">What Our Customers Say</h3>
    <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-5xl mx-auto">
      {testimonials.map((t, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center max-w-xs border border-pink-100 hover:shadow-2xl transition-shadow">
          <img src={t.image} alt={t.name} className="w-20 h-20 rounded-full mb-4 border-4 border-pink-200 shadow" />
          <p className="text-gray-700 italic mb-3 text-center">“{t.text}”</p>
          <span className="font-bold text-pink-600">{t.name}</span>
        </div>
      ))}
    </div>
  </section>
);

export default TestimonialSection;
