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
    <div>
      <h2 className="text-xl font-semibold mb-3 text-center text-indigo-600">
        {title}
      </h2>

      <p className="text-gray-600 text-sm leading-relaxed">
        {message}
        {type !== 'new' && (
          <span className="font-medium">2 days of registration.</span>
        )}
      </p>

      {type !== 'new' && (
        <p className="text-gray-600 text-sm mt-3">
          Once approved, you will be able to post jobs on the platform.
        </p>
      )}

      <div className="flex gap-5 justify-end mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Got it
        </button>
        {type == 'new' && (
          <button
            onClick={() => navigate('/company/register')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Register
          </button>
        )}
      </div>
    </div>
  );
}

export default CompanyRegistrationPendingModal;
