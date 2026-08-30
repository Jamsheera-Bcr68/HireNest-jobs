import { useState, useEffect, useRef } from 'react';
import { X, FileWarning, Pencil } from 'lucide-react';

type Props = {
  isOpen: boolean;
  fileName: string;
  onCancel: () => void;
  onRename: (name: string) => void;
  error: string;
  setError: (error: string) => void;
};
export default function DuplicateResumeModal({
  isOpen,
  fileName,
  onCancel,
  setError,
  onRename,
  error,
}: Props) {
  const [step, setStep] = useState('confirm'); // "confirm" | "rename"
  const [newName, setNewName] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  // Split "myresume.pdf" -> base "myresume", ext ".pdf"
  const dotIndex = fileName.lastIndexOf('.');
  const baseName = dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;
  const extension = dotIndex > 0 ? fileName.slice(dotIndex) : '';

  useEffect(() => {
    if (isOpen) {
      setStep('confirm');
      setNewName(baseName);
    }
  }, [isOpen, fileName]);

  useEffect(() => {
    if (step === 'rename' && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [step]);

  if (!isOpen) return null;

  const handleConfirmRename = () => {
    const trimmed = newName.trim();
    if (!trimmed) {
      setError('Please enter a name for your resume.');
      return;
    }

    if (trimmed.length < 3) {
      setError('Name should have atleast 3 letters');
      return;
    }
    if (trimmed.includes("'")) {
      setError('Resume name contains an apostrophe');
      return;
    }
    onRename(`${trimmed}${extension}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleConfirmRename();
    if (e.key === 'Escape') onCancel();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white shadow-xl ring-1 ring-fuchsia-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5">
          <div className="flex items-center gap-2 text-fuchsia-700">
            {step === 'confirm' ? (
              <FileWarning size={18} />
            ) : (
              <Pencil size={18} />
            )}
            <h2 className="text-sm font-semibold">
              {step === 'confirm' ? 'Duplicate resume' : 'Rename resume'}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="text-fuchsia-300 hover:text-fuchsia-600 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 pt-3 pb-5">
          {step === 'confirm' ? (
            <>
              <p className="text-sm text-gray-600 leading-relaxed">
                A resume named{' '}
                <span className="font-medium text-fuchsia-700">
                  "{fileName}"
                </span>{' '}
                already exists. Would you like to rename this one before
                uploading?
              </p>

              <div className="mt-5 flex justify-end gap-2">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep('rename')}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-fuchsia-600 text-white hover:bg-fuchsia-700 transition-colors"
                >
                  Rename
                </button>
              </div>
            </>
          ) : (
            <>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                New file name
              </label>
              <div className="flex items-center rounded-lg border border-fuchsia-200 focus-within:ring-2 focus-within:ring-fuchsia-400 focus-within:border-fuchsia-400 overflow-hidden">
                <input
                  ref={inputRef}
                  type="text"
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value);
                    if (error) setError('');
                  }}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-3 py-2 text-sm text-gray-800 outline-none min-w-0"
                  placeholder="Enter new name"
                />
                <span className="pr-3 text-sm text-gray-400 select-none">
                  {extension}
                </span>
              </div>
              {error && <p className="mt-1.5 text-xs text-rose-500">{error}</p>}

              <div className="mt-5 flex justify-end gap-2">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRename}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-fuchsia-600 text-white hover:bg-fuchsia-700 transition-colors"
                >
                  Save name
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Example usage in a parent upload component:
 *
 * const [duplicateOpen, setDuplicateOpen] = useState(false);
 * const [pendingFile, setPendingFile] = useState(null);
 *
 * function handleFileSelect(file) {
 *   const exists = existingResumeNames.includes(file.name);
 *   if (exists) {
 *     setPendingFile(file);
 *     setDuplicateOpen(true);
 *   } else {
 *     uploadResume(file);
 *   }
 * }
 *
 * <DuplicateResumeModal
 *   isOpen={duplicateOpen}
 *   fileName={pendingFile?.name}
 *   onCancel={() => setDuplicateOpen(false)}
 *   onRename={(newName) => {
 *     const renamedFile = new File([pendingFile], newName, { type: pendingFile.type });
 *     uploadResume(renamedFile);
 *     setDuplicateOpen(false);
 *   }}
 * />
 * ------------------------------------------------------------------ */
