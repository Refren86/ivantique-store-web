import { useState } from 'react';

export const Accordion = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((current) => !current);

  return (
    <div className="mb-3">
      <div
        onClick={toggleExpanded}
        className="text-left items-center px-2 mb-3 h-12 select-none flex justify-between cursor-pointer flex-row border-b border-b-grey-500 hover:bg-secondary-300 transition-colors"
      >
        <h5 className="flex-1 text-lg font-semibold">{title}</h5>
        <svg
          data-accordion-icon
          className={`w-6 h-6 flex-none rotate-${
            expanded ? '180' : '0'
          } transition-transform`}
          fill="black"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <div
        className={`pt-0 px-2 overflow-y-auto transition-[max-height] duration-500 ease-in ${
          expanded ? 'max-h-60' : 'max-h-0'
        }`}
      >
        <p className="pb-4 text-left">{content}</p>
      </div>
    </div>
  );
};
