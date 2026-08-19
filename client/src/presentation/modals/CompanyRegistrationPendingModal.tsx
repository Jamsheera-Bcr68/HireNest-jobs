import { useNavigate } from 'react-router-dom';
type Props = {
  onClose: () => void;
  title: string;
  type: string;
  message: string;
};
function CompanyRegistrationPendingModal({
  onClose,
  title,
  message,
  type,
}: Props) {
  const navigate = useNavigate();
  return (
  <div className="relative">
    {/* Icon */}
    <div onClick={onClose} className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-fuchsia-50 ring-8 ring-fuchsia-50/50">
      <svg 
        className="h-7 w-7 text-fuchsia-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>

    <h2 className="text-xl font-semibold text-center text-gray-900">
      {title}
    </h2>

    <p className="text-gray-500 text-sm leading-relaxed text-center mt-2">
      {message}
      {type !== 'new' && (
        <span className="font-medium text-gray-700"> 2 days of registration.</span>
      )}
    </p>

    {type !== 'new' && (
      <p className="text-gray-500 text-sm text-center mt-2">
        Once approved, you will be able to post jobs on the platform.
      </p>
    )}

    <div className="flex gap-3 justify-center mt-7">
      {type === 'new' ? (
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            Got it
          </button>
          <button
            onClick={() => navigate('/company/register')}
            className="px-4 py-2 text-sm font-medium text-white bg-fuchsia-600 rounded-lg shadow-sm shadow-fuchsia-200 hover:bg-fuchsia-700 transition"
          >
            Register
          </button>
        </>
      ) : (
        <button
          onClick={onClose}
          className="px-5 py-2 text-sm font-medium text-white bg-fuchsia-600 rounded-lg shadow-sm shadow-fuchsia-200 hover:bg-fuchsia-700 transition"
        >
          Got it
        </button>
      )}
    </div>
  </div>
);
  // return (
  //   <div>
  //     <h2 className="text-xl font-semibold mb-3 text-center text-indigo-600">
  //       {title}
  //     </h2>

  //     <p className="text-gray-600 text-sm leading-relaxed">
  //       {message}
  //       {type !== 'new' && (
  //         <span className="font-medium">2 days of registration.</span>
  //       )}
  //     </p>

  //     {type !== 'new' && (
  //       <p className="text-gray-600 text-sm mt-3">
  //         Once approved, you will be able to post jobs on the platform.
  //       </p>
  //     )}

  //     <div className="flex gap-5 justify-end mt-6">
  //       <button
  //         onClick={onClose}
  //         className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
  //       >
  //         Got it
  //       </button>
  //       {type == 'new' && (
  //         <button
  //           onClick={() => navigate('/company/register')}
  //           className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
  //         >
  //           Register
  //         </button>
  //       )}
  //     </div>
  //   </div>
  // );
}

export default CompanyRegistrationPendingModal;
