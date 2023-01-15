export const Loader = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
      <div
        className="border-dashed border-secondary-700 animate-spin inline-block w-10 h-10 border-4 rounded-full"
        role="status"
      />
    </div>
  );
};
