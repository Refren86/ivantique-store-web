import { FurnitureCard } from 'components/FurnitureCard';

export const Furnitures = ({ furnitures }) => {
  return (
    <div className="wrapper my-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {furnitures?.map((furniture) => (
        <FurnitureCard key={furniture.slug} furniture={furniture} />
      ))}
    </div>
  );
};
