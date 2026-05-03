import { type ResumeType } from '../../../../types/dtos/profileTypes/ResumeType';
import { useLockBodyScroll } from '../../../hooks/useBodyLock';
import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { profileService } from '../../../../services/apiServices/candidateService';
import { useToast } from '../../../../shared/toast/useToast';

type Props = {
  resumes: ResumeType[];
  isOpen: boolean;
  onClose: () => void;
  onApply: (resumeId: string) => void;
};

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export default function SelectResumeModal({
  resumes,
  isOpen,
  onClose,
  onApply,
}: Props) {
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { showToast } = useToast();

  const handleApplyClick = async () => {
    let resumeId = selectedResumeId;

    if (!resumeId && file) {
      resumeId = await handleUpload();
    }

    if (!resumeId) {
      setError('Please select a Resume');
      return;
    }

    setError('');
    onApply(resumeId);
    setSelectedResumeId(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }
    setError('');
    try {
      const formData = new FormData();
      formData.append('resume', file);
      const data = await profileService.uploadResume(formData);
      console.log('after uploading resume', data);
      setSelectedResumeId(data.resume.id);
      setFile(null);
      return data.resume.id;
    } catch (error: any) {
      showToast({
        msg: error?.response?.data.message || error.message,
        type: 'error',
      });
    }
  };
  useLockBodyScroll(isOpen);
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Box */}
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Select Resume</h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Resume list */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {resumes.length ? (
            resumes.map((resume) => (
              <label
                key={resume.id}
                className={`flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer transition
                ${
                  selectedResumeId === resume.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-400'
                }
              `}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={selectedResumeId === resume.id}
                    onChange={() => setSelectedResumeId(resume.id)}
                  />

                  <span className="text-gray-700 font-medium">
                    {resume.name}
                  </span>

                  {resume.isDefault && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>

                <a
                  href={`${baseUrl}${resume.url}`}
                  target="_blank"
                  className="text-blue-500 text-sm hover:underline"
                >
                  View
                </a>
              </label>
            ))
          ) : (
            <p className="text-gray-500">
              You have not uploaded any resume yet.
            </p>
          )}
        </div>

        {/* Upload new resume */}
        <label className="mt-4 text-blue-600 hover:underline text-sm font-medium cursor-pointer inline-block">
          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              if (file) return;
              const selectedFile = e.target.files?.[0] || null;
              setFile(selectedFile);
            }}
          />
          {file ? '' : ' + Upload New Resume'}
        </label>

        {file && (
          <div className="mt-3 flex items-center justify-between border rounded-lg px-3 py-2 text-sm bg-gray-50">
            <span className="text-gray-700">{file.name}</span>

            <div className="flex gap-3">
              {' '}
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-red-500 hover:text-red-600"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {error && <p className="text-sm text-red-600">* {error} </p>}
        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            disabled={!selectedResumeId && !file}
            onClick={handleApplyClick}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
