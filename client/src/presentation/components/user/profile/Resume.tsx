import { useState } from 'react';
import { type ResumeType } from '../../../../types/dtos/profileTypes/ResumeType';
import { profileService } from '../../../../services/apiServices/candidateService';
import { useToast } from '../../../../shared/toast/useToast';
import type { UserProfileType } from '../../../../types/dtos/profileTypes/userTypes';
import { Upload } from 'lucide-react';
import { Trash, X, LucideLoader } from 'lucide-react';
import { FormatDate } from '../../../../utils/dateConversion';
import DeleteConfirmationModal from '../../../modals/DeleteConfirmationModal';
type ResumeProps = {
  onUserUpdate: (user: UserProfileType) => void;
  resumes: ResumeType[] | [];
};
function Resume({ onUserUpdate, resumes }: ResumeProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleUpload = async () => {
    if (isUploading) return;
    console.log(file);

    if (!file) {
      showToast({ msg: 'Please select a file', type: 'error' });
      return;
    }
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('resume', file);
      const data = await profileService.uploadResume(formData);
      showToast({ msg: data.message, type: 'success' });
      onUserUpdate(data.user);
      setFile(null);
      setIsUploading(false);
    } catch (error: any) {
      console.log(error);
      showToast({
        msg: error?.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };
  const handleRemove = async () => {
    if (!deleteId) {
      showToast({ msg: 'Delete Id is not found', type: 'error' });
      setIsOpen(false);
      return;
    }
    try {
      const data = await profileService.removeResume(deleteId);
      onUserUpdate(data.user);
      showToast({ msg: data.message, type: 'success' });
      setDeleteId(null);
      setIsOpen(false);
    } catch (error: any) {
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
      setDeleteId(null);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Resume </h3>
          {!file && (
            <label className="cursor-pointer text-green-600 hover:text-green-700 text-sm font-medium">
              Add
              <input
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                type="file"
                className="hidden"
              />
            </label>
          )}
        </div>
        {file ? (
          <div className="flex items-center gap-3 border rounded-xl p-3 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex-1 flex items-center gap-3 border border-dashed rounded-lg px-3 py-2 text-sm text-gray-500">
              <span className="text-lg">📄</span>
              <span>{file.name}</span>
            </div>

            <button
              onClick={handleUpload}
              disabled={isUploading}
              className={`cursor-pointer text-green-600 hover:text-green-700 text-sm font-medium ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isUploading ? <LucideLoader size={18} /> : <Upload size={18} />}
            </button>

            <button
              onClick={() => {
                setIsUploading(false);
                setFile(null);
              }}
              disabled={isUploading}
              className="text-red-400 text-bold hover:text-red-500 text-lg px-2 transition"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          ''
        )}

        <div className="space-y-4 mt-2">
          {resumes.length ? (
            resumes.map((res) => {
              return (
                <div className="flex items-center justify-between border rounded-lg p-4 hover:shadow-sm transition">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">📄</div>

                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {res.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Uploaded on{' '}
                        {res.uploadedAt ? FormatDate(res.uploadedAt) : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Default Badge */}
                    {/* <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-md">
                  Default
                </span> */}

                    <a
                      href={`${import.meta.env.VITE_BACKEND_URL}${res.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      View
                    </a>

                    <button
                      onClick={() => {
                        setDeleteId(res.id);
                        setIsOpen(true);
                      }}
                      className="text-red-500 hover:text-red-600 text-sm"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500  text-sm italic">
              No resumes uploaded yet
            </div>
          )}
        </div>
        <DeleteConfirmationModal
          isOpen={isOpen}
          item="Resume"
          onDelete={handleRemove}
          onClose={() => {
            setDeleteId(null);
            setIsOpen(false);
          }}
        />
      </div>
    </div>
  );
}
export default Resume;
