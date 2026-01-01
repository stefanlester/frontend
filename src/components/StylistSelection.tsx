import React from 'react';

export interface Stylist {
  id: number;
  name: string;
  title: string;
  image: string;
  specialties: string[];
  rating: number;
  yearsExperience: number;
  bio: string;
}

interface StylistSelectionProps {
  selectedStylistId?: number;
  onSelect: (stylistId: number) => void;
}

export const stylists: Stylist[] = [
  {
    id: 1,
    name: "Chi Anderson",
    title: "Master Stylist & Owner",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400",
    specialties: ["Braids", "Weaves", "Natural Hair"],
    rating: 5.0,
    yearsExperience: 15,
    bio: "Specializing in protective styles and natural hair care with over 15 years of experience."
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Senior Stylist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    specialties: ["Locs", "Twists", "Extensions"],
    rating: 4.9,
    yearsExperience: 8,
    bio: "Expert in locs maintenance and creative braiding styles."
  },
  {
    id: 3,
    name: "Maya Thompson",
    title: "Color Specialist",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400",
    specialties: ["Hair Coloring", "Silk Press", "Treatments"],
    rating: 4.8,
    yearsExperience: 6,
    bio: "Passionate about hair coloring and transformative styles."
  },
  {
    id: 4,
    name: "Lisa Rodriguez",
    title: "Wig Specialist",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400",
    specialties: ["Wig Installation", "Customization", "Styling"],
    rating: 4.9,
    yearsExperience: 10,
    bio: "Creating flawless wig installations and custom units."
  }
];

const StylistSelection: React.FC<StylistSelectionProps> = ({
  selectedStylistId,
  onSelect
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-gray-900">💇 Choose Your Stylist</h4>
        <span className="text-sm text-gray-500">(Optional - We'll assign if not selected)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stylists.map((stylist) => (
          <div
            key={stylist.id}
            onClick={() => onSelect(stylist.id)}
            className={`cursor-pointer rounded-2xl p-4 border-2 transition-all duration-300 ${
              selectedStylistId === stylist.id
                ? 'border-purple-500 bg-purple-50 shadow-lg ring-4 ring-purple-200'
                : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
            }`}
          >
            <div className="flex gap-4">
              <img
                src={stylist.image}
                alt={stylist.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-bold text-gray-900">{stylist.name}</h5>
                    <p className="text-sm text-purple-600 font-semibold">{stylist.title}</p>
                  </div>
                  {selectedStylistId === stylist.id && (
                    <div className="text-2xl">✓</div>
                  )}
                </div>
                
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="flex items-center gap-1 text-yellow-500">
                    ⭐ {stylist.rating}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{stylist.yearsExperience}+ years</span>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {stylist.specialties.slice(0, 2).map((specialty, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-semibold"
                    >
                      {specialty}
                    </span>
                  ))}
                  {stylist.specialties.length > 2 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      +{stylist.specialties.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <p className="text-xs text-gray-600 mt-3 line-clamp-2">{stylist.bio}</p>
          </div>
        ))}
      </div>

      {!selectedStylistId && (
        <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600">
            💡 <span className="font-semibold">Tip:</span> Select a stylist to ensure availability, or we'll match you with the best available stylist
          </p>
        </div>
      )}
    </div>
  );
};

export default StylistSelection;
