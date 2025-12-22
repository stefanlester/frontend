import React from 'react';

type Props = { folder: string };

// This component renders images placed under public/images/new/<kebab-folder>/*.jpeg
const NewGallery: React.FC<Props> = ({ folder }) => {
  // We can't read the filesystem from the client; use predictable public paths.
  const base = `/images/new/${folder}`;
  // Example filenames — if you ran `npm run normalize-images` these names will exist.
  // The gallery will attempt to load a small set of common names; fallbacks will be ignored by browser if missing.
  const examples = [
    'whatsapp-image-2025-12-22-at-08-46-52-1.jpeg',
    'whatsapp-image-2025-12-22-at-08-46-52.jpeg',
    'whatsapp-image-2025-12-22-at-08-46-53-1.jpeg',
    'whatsapp-image-2025-12-22-at-08-46-53.jpeg',
    'whatsapp-image-2025-12-22-at-08-56-12.jpeg',
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {examples.map((f) => (
        <img
          key={f}
          src={`${base}/${f}`}
          alt={f}
          className="w-full h-48 object-cover rounded-lg bg-gray-100 border"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
      ))}
    </div>
  );
};

export default NewGallery;
