import { useNavigate } from 'react-router-dom';
export const Button = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => navigate('/')}
        className="px-4 py-1 bg-indigo-100 text-indigo-600 rounded"
      >
        Back To home
      </button>
    </div>
  );
};
