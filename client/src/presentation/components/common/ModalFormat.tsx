import React, { type ReactNode } from 'react';

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalFormat: React.FC<Props> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

    {/* Modal Container */}
    <div className="
      bg-white
      w-full
      max-w-2xl
      max-h-[90vh]
      rounded-2xl
      shadow-xl
      relative
      flex flex-col
    ">

      {/* X button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      {/* Header */}
      <div className="p-6 pb-2 pr-10">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          {title}
        </h2>
      </div>

      {/* Scrollable content ONLY */}
      <div className="px-6 overflow-y-auto flex-1">
        {children}
      </div>

      {/* Footer (fixed) */}
      <div className="p-6 pt-3 flex justify-end gap-3 border-t">
        <button
          onClick={onClose}
          className="px-4 py-1.5 rounded-lg border text-gray-600 hover:bg-gray-100"
        >
          Close
        </button>
      </div>

    </div>
  </div>
);
};
export default ModalFormat;
