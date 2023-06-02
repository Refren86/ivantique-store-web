import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export const Dropdown = ({
  options = [],
  selectedOption,
  placeholder,
  onSelect = () => {},
  btnClassnames,
  listClassnames,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('click', handleOutsideClick, true);
      return () => {
        document.removeEventListener('click', handleOutsideClick, true);
      };
    }
  }, []);

  const fullSelectedOption = options?.length > 0 && options.find(
    (option) => option._id === selectedOption
  );

  return (
    <div>
      {label && (
        <p className="inline-block mb-3 text-sm font-semibold cursor-default">
          {label}
        </p>
      )}

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className={`flex gap-x-2 items-center justify-between w-full px-4 py-3 text-left text-grey-900 bg-inherit rounded-md border border-grey-800 focus:outline-none ${btnClassnames}`}
          onClick={toggleDropdown}
        >
          <span className="truncate">
            {selectedOption
              ? fullSelectedOption?.name || fullSelectedOption?.title
              : placeholder}
          </span>

          <Image
            src="/icons/common/caret-down.svg"
            className={`${isOpen ? 'rotate-180' : ''}`}
            alt="Down caret"
            width={14}
            height={14}
          />
        </button>
        {isOpen && (
          <div
            className={`absolute z-50 max-h-[300px] overflow-y-auto w-full py-1 mt-1 bg-[#1B1B1B] border border-[#535353] rounded-md shadow-md ${listClassnames}`}
          >
            {options?.length > 0 &&
              options.map((option) => (
                <button
                  type="button"
                  key={option._id}
                  className="block w-full py-1 pl-3 pr-9 text-left text-white hover:bg-gray-200 hover:bg-grey-600 focus:outline-none"
                  onClick={() => {
                    onSelect(option._id);
                    setIsOpen(false);
                  }}
                >
                  {option.name || option.title}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
