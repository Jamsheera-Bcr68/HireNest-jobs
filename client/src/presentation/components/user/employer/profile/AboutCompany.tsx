import { useEffect, useRef, useState } from 'react';
import { useToast } from '../../../../../shared/toast/useToast';
import { type CompanyProfileType } from '../../../../../types/dtos/profileTypes/userTypes';
import { companyService } from '../../../../../services/apiServices/companyService';
import { updateCompanyFieldSchema } from '../../../../../libraries/validations/company/companyUpdateFieldsValidation';

export const AboutCompany = ({
  company,
  onUpdate,
}: {
  company: CompanyProfileType | null;
  onUpdate: (company: CompanyProfileType) => void;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [about, setAbout] = useState<string>('');
  const [error, setError] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { showToast } = useToast();
  const autoResize = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };
  useEffect(() => {
    autoResize();
  }, [about]);
  useEffect(() => {
    if (company && company.about) setAbout(company.about);
  }, [company]);
  const addAbout = async () => {
    console.log('from add about');

    const field = { about: about };
    const result = updateCompanyFieldSchema.safeParse(field);

    if (!result.success) {
      console.log(result.error);
      const error = result.error.flatten().fieldErrors.about?.[0];
      if (error) setError(error);
      return;
    }
    setError('');
    try {
      const data = await companyService.addAbout(about);
      console.log('user is ', data.company);

      onUpdate(data.company);
      showToast({ msg: data.message, type: 'success' });

      setIsEditing(false);
    } catch (error: any) {
      showToast({
        msg: error.response?.data.message || error.message,
        type: 'error',
      });
    }
  };
  const cancelEdit = () => {
    setIsEditing(false);
    setAbout('');
  };
  const onEdit = () => {
    setIsEditing(true);
    setAbout(company?.about || '');
  };
  const onBlur = () => {
    if (!company?.about && !about.trim()) {
      setIsEditing(false);
      setAbout('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsEditing(true);
    setAbout(e.target.value);
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">About Company</h3>

        {isEditing ? (
          <div className="flex items-center gap-3">
            <button
              onClick={addAbout}
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              Save
            </button>

            <button
              onClick={() => {
                cancelEdit();
                setError('');
                setAbout('');
              }}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        ) : company?.about ? (
          <button
            onClick={onEdit}
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            Edit
          </button>
        ) : null}
      </div>

      <textarea
        value={isEditing ? about : company?.about || ''}
        placeholder="Add something about your company..."
        readOnly={!!company?.about && !isEditing}
        style={{ resize: 'none', overflow: 'hidden' }}
        onChange={handleChange}
        onBlur={onBlur}
        ref={textareaRef}
        className={`w-full resize-none h-auto bg-transparent rounded p-2 ${isEditing ? 'border border_grey-300' : ''}  focus:outline-none text-gray-700 leading-relaxed`}
        rows={1}
      />
      {error && <p className="text-sm text-red-500">* {error} </p>}
    </div>
  );
};
