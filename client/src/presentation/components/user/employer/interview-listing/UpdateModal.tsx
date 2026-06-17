import { DialogContent, Dialog } from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { useState } from 'react';
import type { InterviewResult } from '../../../../../types/dtos/interview.dto';

type FeedbackModalProps = {
  isOpen: boolean;
  onClose: () => void;
  loading?: boolean;
  onSubmit: (data: {
    result: InterviewResult;
    feedback?: string;
    score:number
  }) => Promise<void>;
};

export default function InterviewFeedbackModal({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}: FeedbackModalProps) {
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState<number>(0);
  const [result, setResult] = useState<'passed' | 'failed' | ''>('');
  const [error, setError] = useState<{
    result?: string;
    feedback?: string;
    score?: string;
  } | null>(null);

  const handleSubmit = () => {
    if (!result) {
      setError({ result: 'Please Update the result' });
      return;
    }
    if (!feedback.trim()) {
      setError({ feedback: 'Please Add your Feedback' });
      return;
    }
    if (score < 0) {
      setError({ score: 'Score cannot be less than zero' });
    } else if (score > 10) {
      setError({ score: 'Score cannot be greater than 10' });
    }
    setError(null);
    onSubmit({ feedback, result,score });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">
              Add Interview Feedback
            </p>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"
            >
              <XIcon />
            </button>
          </div>

          {/* Body */}
          {/* Body */}
          <div className="px-6 py-5 flex flex-col gap-5">
            {/* Result + Score */}
            <div className="grid grid-cols-2 gap-4">
              {/* Result */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Result
                </label>

                <select
                  value={result}
                  onChange={(e) =>
                    setResult(e.target.value as 'passed' | 'failed')
                  }
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Pending</option>
                  <option value="passed">Passed</option>
                  <option value="failed">Failed</option>
                </select>

                {error?.result && (
                  <p className="mt-1 text-sm text-red-500">* {error.result}</p>
                )}
              </div>

              {/* Score */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Score
                </label>

                <input
                  type="number"
                  min={0}
                  max={10}
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  placeholder="0 - 10"
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />

                {error?.score && (
                  <p className="mt-1 text-sm text-red-500">* {error.score}</p>
                )}
              </div>
            </div>

            {/* Feedback */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Feedback
              </label>

              <textarea
                rows={5}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write interview feedback..."
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-100"
              />

              {error?.feedback && (
                <p className="mt-1 text-sm text-red-500">* {error.feedback}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-4 flex justify-end gap-2 border-t border-gray-100">
            <button
              onClick={onClose}
              className="text-xs px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="text-xs px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
