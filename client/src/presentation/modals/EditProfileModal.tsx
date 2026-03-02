import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useProfileEdit } from '../hooks/user/candidate/profile/useProfileEdit';
import { useToast } from '../../shared/toast/useToast';
import { Github, Twitter, Globe, Youtube } from 'lucide-react';
import { type UserProfileType } from '../../types/dtos/profileTypes/userTypes';

export default function ProfileEditModal({
  open,
  onClose,
  user,
  onUserUpdate,
}: {
  open: boolean;
  onClose: () => void;
  user: UserProfileType | undefined;
  onUserUpdate: (updatedUser: UserProfileType) => void;
}) {
  const { showToast } = useToast();
  const { formData, handleChange, handleSubmit, error } = useProfileEdit(
    showToast,
    onClose,
    user,
    onUserUpdate
  );
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />

        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50
                    w-full max-w-md ml-2
                    -translate-x-1/2 -translate-y-1/2
                     rounded-xl bg-white p-2 shadow-lg
                     focus:outline-none
                     max-h-[90vh]
                      overflow-y-auto
                        "
        >
          {/* Close button top-right */}
          <Dialog.Close asChild>
            <button
              aria-label="Close"
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </Dialog.Close>
          <Dialog.Title className="text-2xl font-semibold mt-3 text-indigo-800 text-center">
            Edit Profile
          </Dialog.Title>
          <form action="" onSubmit={handleSubmit}>
            <div className="mt-6 space-y-3 ml-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Name :</label>
                <input
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  type="text"
                  placeholder="Eg:John"
                  className="w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                {error?.name && formData.name !== '' && (
                  <p className="text-red-500 text-sm">*{error.name}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Title :
                </label>
                <div>
                  <input
                    name="title"
                    value={formData.title || ''}
                    onChange={handleChange}
                    type="text"
                    placeholder="Eg: FullStack Developer"
                    className="w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  {error?.title && formData.title !== '' && (
                    <p className="text-red-500 text-sm">*{error.title}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Place :
                </label>
                <div>
                  <input
                    onChange={handleChange}
                    name="place"
                    value={formData.place || ''}
                    type="text"
                    placeholder="Eg: Chennai"
                    className="w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  {error?.place && formData.place !== '' && (
                    <p className="text-red-500 text-sm">*{error.place}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  State :
                </label>
                <div>
                  <input
                    name="state"
                    onChange={handleChange}
                    value={formData.state || ''}
                    type="text"
                    placeholder="Eg:Thamil Nadu"
                    className="w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  {error?.state && formData.state !== '' && (
                    <p className="text-red-500 text-sm">*{error.state}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Coutry:
                </label>
                <div>
                  <input
                    name="country"
                    value={formData.country || ''}
                    onChange={handleChange}
                    type="text"
                    placeholder="Eg:India "
                    className="w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  {error?.country && formData.country !== '' && (
                    <p className="text-red-500 text-sm">*{error.country}</p>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-700">
                    Social Links
                  </summary>

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
                            value={formData.socialMediaLinks?.linkedIn || ''}
                            data-section="socialMediaLinks"
                            onChange={handleChange}
                            type="text"
                            name="linkedIn"
                            placeholder="LinkedIn profile URL"
                            className="w-full outline-none"
                          />
                        </div>
                        {error?.socialMediaLinks?.linkedIn &&
                          formData.socialMediaLinks?.linkedIn !== '' && (
                            <p className="text-red-500 text-sm">
                              *{error.socialMediaLinks.linkedIn}
                            </p>
                          )}

                        {/* GitHub */}
                        <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-800">
                          <Github className="w-5 h-5 text-gray-500 mr-2" />
                          <input
                            value={formData.socialMediaLinks?.gitHub || ''}
                            onChange={handleChange}
                            data-section="socialMediaLinks"
                            type="text"
                            name="gitHub"
                            placeholder="GitHub profile URL"
                            className="w-full outline-none"
                          />
                        </div>
                        {error?.socialMediaLinks?.gitHub &&
                          formData.socialMediaLinks?.gitHub !== '' && (
                            <p className="text-red-500 text-sm">
                              *{error.socialMediaLinks.gitHub}
                            </p>
                          )}

                        {/* Twitter */}
                        <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring--400">
                          <Twitter className="w-5 h-5 text-blue-500 mr-2" />
                          <input
                            value={formData.socialMediaLinks?.twitter || ''}
                            onChange={handleChange}
                            type="text"
                            data-section="socialMediaLinks"
                            name="twitter"
                            placeholder="Twitter profile URL"
                            className="w-full outline-none"
                          />
                        </div>
                        {error?.socialMediaLinks?.twitter &&
                          formData.socialMediaLinks?.twitter !== '' && (
                            <p className="text-red-500 text-sm">
                              *{error.socialMediaLinks.twitter}
                            </p>
                          )}
                        <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
                          <div className="relative w-5 h-5 mr-2">
                            {/* <MessageCircle
                              size={20}
                              className="text-green-500 "
                            /> */}
                            <svg
                              className="w-5 h-5 text-green-500"
                              viewBox="0 0 32 32"
                              fill="currentColor"
                            >
                              <path d="M16.002 3C9.373 3 4 8.373 4 15.002c0 2.646.863 5.09 2.32 7.07L4.2 29l7.13-2.08A11.94 11.94 0 0016.002 27C22.63 27 28 21.627 28 15.002 28 8.373 22.63 3 16.002 3zm0 21.8c-1.93 0-3.82-.52-5.47-1.5l-.39-.23-4.23 1.23 1.24-4.12-.25-.42A9.79 9.79 0 016.2 15c0-5.41 4.39-9.8 9.8-9.8 2.62 0 5.08 1.02 6.93 2.87A9.75 9.75 0 0125.8 15c0 5.41-4.39 9.8-9.8 9.8zm5.37-7.35c-.29-.14-1.7-.84-1.97-.94-.27-.1-.47-.14-.67.14-.2.29-.77.94-.95 1.13-.17.2-.35.22-.64.07-.29-.14-1.24-.46-2.36-1.47-.87-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.35.43-.52.14-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.14-.67-1.6-.92-2.19-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.48s1.06 2.87 1.21 3.07c.14.2 2.08 3.18 5.04 4.46.71.31 1.27.5 1.7.64.71.22 1.36.19 1.87.12.57-.09 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.27-.2-.57-.34z" />
                            </svg>
                          </div>

                          <input
                            value={formData.socialMediaLinks?.whatsapp || ''}
                            onChange={handleChange}
                            type="text"
                            data-section="socialMediaLinks"
                            name="whatsapp"
                            placeholder="Whatapp  URL"
                            className="w-full outline-none"
                          />
                        </div>
                        {error?.socialMediaLinks?.whatsapp &&
                          formData.socialMediaLinks?.whatsapp !== '' && (
                            <p className="text-red-500 text-sm">
                              *{error.socialMediaLinks.whatsapp}
                            </p>
                          )}
                        {/*youtube*/}
                        <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-600">
                          <Youtube className="w-5 h-5 text-red-500 mr-2" />
                          <input
                            value={formData.socialMediaLinks?.youtube || ''}
                            onChange={handleChange}
                            type="text"
                            data-section="socialMediaLinks"
                            name="youtube"
                            placeholder="Youtube "
                            className="w-full outline-none"
                          />
                        </div>
                        {error?.socialMediaLinks?.youtube &&
                          formData.socialMediaLinks?.youtube !== '' && (
                            <p className="text-red-500 text-sm">
                              *{error.socialMediaLinks.youtube}
                            </p>
                          )}

                        {/* Portfolio */}
                        <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
                          <Globe className="w-5 h-5 text-gray-500 mr-2" />
                          <input
                            value={formData.socialMediaLinks?.portfolio || ''}
                            onChange={handleChange}
                            type="text"
                            name="portfolio"
                            data-section="socialMediaLinks"
                            placeholder="Portfolio website URL"
                            className="w-full outline-none"
                          />
                        </div>
                        {error?.socialMediaLinks?.portfolio &&
                          formData.socialMediaLinks?.portfolio !== '' && (
                            <p className="text-red-500 text-sm">
                              *{error.socialMediaLinks.portfolio}
                            </p>
                          )}
                      </div>
                    }
                  </div>
                </details>
              </div>

              <div className=" flex gap-10">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close"
                    className=" w-1/4 ml-10 bg-red-600 rounded-md border border-red-600 text-white py-2 hover:bg-red-400"
                  >
                    Cancel
                  </button>
                </Dialog.Close>

                <button
                  type="submit"
                  className=" w-1/4 ml-10 mr-3 rounded-md border bg-green-600 text-white py-2 hover:bg-green-400"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
