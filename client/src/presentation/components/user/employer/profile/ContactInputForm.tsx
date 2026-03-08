import type { ISocialLinks } from '../../../../../types/profileTypes';
import { Github, Twitter, Youtube, Globe } from 'lucide-react';
import { YoutubeIcon } from 'lucide-react';
type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  error: ISocialLinks | undefined;
  onSubmit: () => Promise<void>;
  formData: ISocialLinks | undefined;
  onCancel: () => void;
};
function ContactInputForm({
  onChange,
  title,
  formData,
  error,
  onCancel,
  onSubmit,
}: Props) {
  return (
    <div>
      <h2 className="text-lg text-center mt-0 font-semibold mb-2">{title}</h2>

      <div className="mt-3 space-y-3">
        {
          <div className="space-y-3">
            {/* LinkedIn */}
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              {/* <Linkedin className="w-5 h-5 text-blue-500 mr-2" /> */}
              <svg
                className="w-5 h-5 mr-3 text-blue-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <input
                value={formData?.linkedIn || ''}
                data-section="socialMediaLinks"
                onChange={onChange}
                type="text"
                name="linkedIn"
                placeholder="LinkedIn profile URL"
                className="w-full outline-none"
              />
            </div>
            {error?.linkedIn && (
              <p className="text-red-500 text-sm">*{error.linkedIn}</p>
            )}

            {/* GitHub */}
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-800">
              <Github className="w-5 h-5 text-gray-500 mr-2" />
              <input
                value={formData?.gitHub || ''}
                onChange={onChange}
                data-section="socialMediaLinks"
                type="text"
                name="gitHub"
                placeholder="GitHub profile URL"
                className="w-full outline-none"
              />
            </div>
            {error?.gitHub && formData?.gitHub !== '' && (
              <p className="text-red-500 text-sm">*{error.gitHub}</p>
            )}

            {/* Twitter */}
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring--400">
              <Twitter className="w-5 h-5 text-blue-500 mr-2" />
              <input
                value={formData?.twitter || ''}
                onChange={onChange}
                type="text"
                data-section="socialMediaLinks"
                name="twitter"
                placeholder="Twitter profile URL"
                className="w-full outline-none"
              />
            </div>
            {error?.twitter && formData?.twitter !== '' && (
              <p className="text-red-500 text-sm">*{error.twitter}</p>
            )}
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <div className="relative w-5 h-5 mr-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M16.002 3C9.373 3 4 8.373 4 15.002c0 2.646.863 5.09 2.32 7.07L4.2 29l7.13-2.08A11.94 11.94 0 0016.002 27C22.63 27 28 21.627 28 15.002 28 8.373 22.63 3 16.002 3zm0 21.8c-1.93 0-3.82-.52-5.47-1.5l-.39-.23-4.23 1.23 1.24-4.12-.25-.42A9.79 9.79 0 016.2 15c0-5.41 4.39-9.8 9.8-9.8 2.62 0 5.08 1.02 6.93 2.87A9.75 9.75 0 0125.8 15c0 5.41-4.39 9.8-9.8 9.8zm5.37-7.35c-.29-.14-1.7-.84-1.97-.94-.27-.1-.47-.14-.67.14-.2.29-.77.94-.95 1.13-.17.2-.35.22-.64.07-.29-.14-1.24-.46-2.36-1.47-.87-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.35.43-.52.14-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.14-.67-1.6-.92-2.19-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.48s1.06 2.87 1.21 3.07c.14.2 2.08 3.18 5.04 4.46.71.31 1.27.5 1.7.64.71.22 1.36.19 1.87.12.57-.09 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.27-.2-.57-.34z" />
                </svg>
              </div>

              <input
                value={formData?.whatsapp || ''}
                onChange={onChange}
                type="text"
                data-section="socialMediaLinks"
                name="whatsapp"
                placeholder="Whatapp  URL"
                className="w-full outline-none"
              />
            </div>
            {error?.whatsapp && formData?.whatsapp !== '' && (
              <p className="text-red-500 text-sm">*{error.whatsapp}</p>
            )}
            {/*youtube*/}
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-600">
              <YoutubeIcon className="w-5 h-5 text-red-500 mr-2" />
              <input
                value={formData?.youtube || ''}
                onChange={onChange}
                type="text"
                data-section="socialMediaLinks"
                name="youtube"
                placeholder="Youtube "
                className="w-full outline-none"
              />
            </div>
            {error?.youtube && formData?.youtube !== '' && (
              <p className="text-red-500 text-sm">*{error.youtube}</p>
            )}

            {/* Portfolio */}
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
              <Globe className="w-5 h-5 text-gray-500 mr-2" />
              <input
                value={formData?.portfolio || ''}
                onChange={onChange}
                type="text"
                name="portfolio"
                data-section="socialMediaLinks"
                placeholder="Portfolio website URL"
                className="w-full outline-none"
              />
            </div>
            {error?.portfolio && formData?.portfolio !== '' && (
              <p className="text-red-500 text-sm">*{error.portfolio}</p>
            )}
          </div>
        }
      </div>

      <div className="flex mt-4 gap-4 justify-end mr-4">
        <button
          onClick={onSubmit}
          className="bg-green-600 text-white rounded-md text-sm w-1/6"
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

export default ContactInputForm;
