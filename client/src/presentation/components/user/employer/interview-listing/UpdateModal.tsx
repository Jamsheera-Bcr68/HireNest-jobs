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
  }) => Promise<void>;
};

export default function InterviewFeedbackModal({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}: FeedbackModalProps) {
  const [feedback, setFeedback] = useState('');
  const [result, setResult] = useState<'passed' | 'failed' | ''>('');
  const [error, setError] = useState<{
    result?: string;
    feedback?: string;
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
    setError(null);
    onSubmit({ feedback, result });
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
          <div className="px-5 py-4 flex flex-col gap-4">
            {/* Result */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Result</label>
              <select
                value={result}
                onChange={(e) =>
                  setResult(e.target.value as 'passed' | 'failed')
                }
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Pending</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
              </select>
              {error && error.result && (
                <p className="text-sm text-red-500">* {error.result} </p>
              )}
            </div>

            {/* Feedback */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Feedback
              </label>
              <textarea
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write interview feedback..."
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              {error && error.feedback && (
                <p className="text-sm text-red-500">* {error.feedback} </p>
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
