import React, { useEffect } from 'react';

type Props = {
  onCancel: () => void;
  value: string;
  onSubmit: () => Promise<void>;
  title: string;
  placeHolder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error: string;
};
function CompanyProfileInputForm({
  onCancel,
  value,
  onSubmit,
  title,
  placeHolder,
  onChange,
  error,
}: Props) {
  return (
    <div>
      <h2 className="text-lg text-center mt-0 font-semibold mb-2">{title}</h2>

      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        className="w-full border rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      />
      {error && <p className="text-sm text-red-500">* {error} </p>}
      <div className="flex mt-4 gap-4 justify-end mr-4">
        <button
          onClick={onSubmit}
          className="bg-green-600 text-white rounded-md text-sm px-4 py-2"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-red-600 text-sm text-white rounded-md px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CompanyProfileInputForm;
