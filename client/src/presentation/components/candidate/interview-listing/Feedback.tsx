type Props = {
  feedback?: string;
  result?: 'passed' | 'failed' | 'pending';
};

function Feedback({ feedback, result }: Props) {
  return (
    <div className="p-5">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              Interview Feedback
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Feedback shared after interview completion
            </p>
          </div>

          {result && (
            <span
              className={`text-xs px-3 py-1 rounded-full text-white ${
                result === 'passed'
                  ? 'bg-green-500'
                  : result === 'failed'
                    ? 'bg-red-500'
                    : 'bg-yellow-500'
              }`}
            >
              {result}
            </span>
          )}
        </div>

        {/* Feedback */}
        <div className="mt-4">
          {feedback ? (
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {feedback}
            </p>
          ) : (
            <div className="text-sm text-amber-600 bg-amber-50 border border-amber-100 rounded-lg p-3">
              Feedback has not been added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Feedback;
