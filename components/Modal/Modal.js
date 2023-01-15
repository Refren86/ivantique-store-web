export const Modal = ({ children, open, onClose }) => {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[10000] overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={onClose}
          />
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg min-h-[150px]">
              <button
                className="absolute right-2 top-2 text-grey-600 bg-transparent hover:bg-gray-200 hover:text-white hover:bg-grey-600 rounded-lg text-sm p-1.5 inline-flex items-center duration-200"
                onClick={onClose}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                </svg>
              </button>

              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
