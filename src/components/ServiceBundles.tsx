import React from 'react';

export interface ServiceBundle {
  id: number;
  name: string;
  description: string;
  services: string[];
  regularPrice: number;
  bundlePrice: number;
  savings: number;
  duration: number; // Total duration in minutes
  image: string;
  popular?: boolean;
}

export const serviceBundles: ServiceBundle[] = [
  {
    id: 1,
    name: "Ultimate Transformation",
    description: "Complete hair makeover with braids and color treatment",
    services: ["Braids & Cornrows", "Hair Coloring", "Hair Treatment"],
    regularPrice: 390,
    bundlePrice: 330,
    savings: 60,
    duration: 360, // 6 hours
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
    popular: true,
  },
  {
    id: 2,
    name: "Protective Style Package",
    description: "Braids with premium hair treatment for healthy protection",
    services: ["Braids & Cornrows", "Hair Treatment"],
    regularPrice: 210,
    bundlePrice: 180,
    savings: 30,
    duration: 240, // 4 hours
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
  },
  {
    id: 3,
    name: "Glam & Go",
    description: "Quick styling with silk press finish",
    services: ["Natural Hair Styling", "Silk Press"],
    regularPrice: 180,
    bundlePrice: 150,
    savings: 30,
    duration: 180, // 3 hours
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800",
  },
  {
    id: 4,
    name: "Locs Maintenance Special",
    description: "Full locs service with treatment and retwist",
    services: ["Dreadlocs/Sister Locs", "Hair Treatment"],
    regularPrice: 310,
    bundlePrice: 270,
    savings: 40,
    duration: 300, // 5 hours
    image: "https://images.unsplash.com/photo-1583834666451-f15d8d922ff1?w=800",
    popular: true,
  },
  {
    id: 5,
    name: "Weave Perfection",
    description: "Professional weave installation with treatment prep",
    services: ["Weave Installation", "Hair Treatment"],
    regularPrice: 260,
    bundlePrice: 220,
    savings: 40,
    duration: 240, // 4 hours
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800",
  },
  {
    id: 6,
    name: "Color & Style",
    description: "Custom color with silk press styling",
    services: ["Hair Coloring", "Silk Press"],
    regularPrice: 280,
    bundlePrice: 240,
    savings: 40,
    duration: 240, // 4 hours
    image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800",
  },
];

interface ServiceBundlesProps {
  onSelectBundle: (bundle: ServiceBundle) => void;
}

const ServiceBundles: React.FC<ServiceBundlesProps> = ({ onSelectBundle }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-extrabold gradient-text mb-3">
          🎁 Service Bundle Packages
        </h3>
        <p className="text-gray-600 text-lg">
          Save more with our curated service combinations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceBundles.map((bundle) => (
          <div
            key={bundle.id}
            className={`relative rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 ${
              bundle.popular ? 'border-yellow-400 ring-4 ring-yellow-200' : 'border-purple-200'
            }`}
            onClick={() => onSelectBundle(bundle)}
          >
            {bundle.popular && (
              <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                ⭐ POPULAR
              </div>
            )}

            <div className="relative h-48 overflow-hidden">
              <img
                src={bundle.image}
                alt={bundle.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="text-2xl font-bold drop-shadow-lg">{bundle.name}</h4>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-4 min-h-[3rem]">{bundle.description}</p>

              <div className="space-y-2 mb-4">
                <p className="text-sm font-semibold text-gray-700">📋 Includes:</p>
                <ul className="space-y-1">
                  {bundle.services.map((service, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="text-purple-500">✓</span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between mb-4 p-3 bg-purple-50 rounded-xl">
                <div>
                  <p className="text-xs text-gray-500 line-through">
                    ${bundle.regularPrice}
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    ${bundle.bundlePrice}
                  </p>
                </div>
                <div className="text-right">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Save ${bundle.savings}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((bundle.savings / bundle.regularPrice) * 100)}% off
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span className="font-semibold">
                    {Math.floor(bundle.duration / 60)}h {bundle.duration % 60}m
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💰</span>
                  <span className="font-semibold">20% deposit</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBundle(bundle);
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Book This Package
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-2 border-purple-300">
        <div className="flex items-center gap-4">
          <div className="text-4xl">💡</div>
          <div>
            <h4 className="text-lg font-bold text-purple-900 mb-1">Bundle Benefits</h4>
            <p className="text-purple-700 text-sm">
              Save time & money by booking multiple services together. All packages include 20% deposit requirement with the remaining balance due at appointment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBundles;
