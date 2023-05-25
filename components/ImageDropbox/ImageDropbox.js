import Image from 'next/image';

export const ImageDropbox = ({
  image,
  index,
  handleDrop = () => {},
  handlePlaceholderClick,
  handleRemove,
}) => {
  return (
    <div
      key={index}
      className="border-[2px] flex justify-center items-center border-dashed border-primary-600 rounded-[10px] min-h-[200px] relative"
      onDrop={(event) => handleDrop(event, index)}
      onDragOver={(event) => event.preventDefault()}
    >
      {image ? (
        <>
          <Image
            className="object-contain"
            src={image}
            alt={`Image ${index}`}
            layout="fill"
          />
          {handleRemove && (
            <button
              type="button"
              className="absolute top-0 right-0"
              onClick={() => handleRemove(index)}
            >
              <Image
                src={'/icons/common/x-circle.svg'}
                alt="remove"
                width={32}
                height={32}
              />
            </button>
          )}
        </>
      ) : (
        <button type="button" onClick={() => handlePlaceholderClick(index)}>
          <Image
            src={'/icons/common/img-file.png'}
            alt="user img"
            width={60}
            height={60}
          />
        </button>
      )}
    </div>
  );
};
