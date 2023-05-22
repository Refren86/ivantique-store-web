import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export const CheckboxDropdown = ({
  options = ['1', '2', '3'],
  selectedOptions = [],
  onSelect,
  placeholder,
  label,
  btnClassnames,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const isChecked = (option) => {
    return selectedOptions.includes(option);
  };

  return (
    <div>
      {label && (
        <p className="inline-block mb-3 text-sm font-semibold cursor-default">
          {label}
        </p>
      )}

      <div ref={dropdownRef} className="relative">
        <div>
          <button
            type="button"
            className={`flex gap-x-2 items-center justify-between w-full px-4 py-3 text-left text-grey-900 bg-inherit rounded-md border border-grey-800 focus:outline-none ${btnClassnames}`}
            onClick={toggleDropdown}
          >
            <span className="truncate">{placeholder}</span>

            <Image
              src="/icons/common/caret-down.svg"
              className={`${isOpen ? 'rotate-180' : ''}`}
              alt="Down caret"
              width={14}
              height={14}
            />
          </button>
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 overflow-auto bg-[#1B1B1B] border border-[#535353] rounded-md shadow-lg max-h-60">
            {options?.length > 0 &&
              options.map((option) => (
                <label
                  key={option}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="opacity-0 absolute h-0 w-0"
                      checked={isChecked(option)}
                      onChange={() => handleSelect(option)}
                    />
                    <div className="w-6 h-6 flex items-center justify-center border border-white rounded-md transition-all duration-200">
                      {isChecked(option) && (
                        <svg
                          className="w-4 h-4 text-white fill-white"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M17.707 5.293a1 1 0 010 1.414l-9 9a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 13.586l8.293-8.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="ml-2 text-sm text-white">{option}</span>
                </label>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
