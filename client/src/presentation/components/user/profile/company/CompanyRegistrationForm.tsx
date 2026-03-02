import { Twitter, Globe, Youtube } from 'lucide-react';
import { useRegisterCompany } from '../../../../hooks/user/company/useRegisterCompany';
import { YEARS } from '../../../../../types/dtos/profileTypes/educationTypes';
import SuccessModal from '../../../../modals/SuccessModal';
import React, {
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from 'react';
import ImageCropModal from '../../../../modals/ImageCropModal';
import {
  Industry_Type,
  Country_Name,
  Company_Size,
  Document_Types,
} from '../../../../../types/dtos/profileTypes/industryType';
import { useNavigate } from 'react-router-dom';

/* ─── tiny icon helpers (inline SVG as React components) ─── */

const IconCamera = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
    <path
      d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
      stroke="#a5b4fc"
      strokeWidth="1.6"
    />
    <circle cx="12" cy="13" r="4" stroke="#a5b4fc" strokeWidth="1.6" />
  </svg>
);
const IconChevron = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
    <path
      d="M6 9l6 6 6-6"
      stroke="#94a3b8"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconInfo = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="#6366F1" strokeWidth="1.8" />
    <path
      d="M12 8v4m0 4h.01"
      stroke="#6366F1"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const Field = ({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label
      className="text-xs  font-bold uppercase tracking-widest text-black-400"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      {label}
      {required && <span className="text-indigo-500 ml-0.5">*</span>}
    </label>
    {children}
    {hint && <p className="text-xs text-slate-400">{hint}</p>}
  </div>
);

const inputCls = ` w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all`;
const docSelect = ` w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all`;

type SelectProps<T extends string> = {
  placeholder: string;
  value: T;
  name: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  options: readonly T[] | number[];
};
const SelectField = <T extends string>({
  placeholder,
  name,
  onChange,
  value,
  options,
}: SelectProps<T>) => (
  <div className="relative">
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`${name == 'documents' ? docSelect : inputCls} appearance-none pr-9 cursor-pointer`}
      defaultValue=""
    >
      <option value={''} disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
      <IconChevron />
    </span>
  </div>
);

/* ─── section card ─── */
const Card = ({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children?: ReactNode;
}) => (
  <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
    <div className="px-7 pt-6 pb-1">
      <h3
        className="text-base font-bold text-slate-800 flex items-center gap-3"
        style={{ fontFamily: "'Syne',sans-serif" }}
      >
        {title}
        <span className="flex-1 h-px bg-slate-100" />
      </h3>
      {desc && <p className="text-xs text-slate-400 mt-1">{desc}</p>}
    </div>
    <div className="px-7 py-6 flex flex-col gap-5">{children}</div>
  </div>
);

/* ─── step indicator ─── */
const steps = ['Account', 'Company Info', 'Verification', 'Complete'];
const Stepper = ({ current = 1 }) => (
  <div className="flex items-center max-w-2xl mx-auto w-full px-4">
    {steps.map((s, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <div key={s} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${done ? 'bg-slate-800 text-white' : active ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200' : 'bg-white border-2 border-slate-200 text-slate-400'}`}
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              {done ? '✓' : i + 1}
            </div>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${active ? 'text-indigo-500' : done ? 'text-slate-700' : 'text-slate-400'}`}
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-0.5 flex-1 mx-2 mb-5 rounded-full transition-all ${done ? 'bg-slate-800' : 'bg-slate-200'}`}
            />
          )}
        </div>
      );
    })}
  </div>
);

/* ─── checkbox ─── */
type CheckboxProps = {
  checked: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
  name: string;
};

const Checkbox = ({ children, checked, handleChange, name }: CheckboxProps) => (
  <label className="flex items-start gap-3 cursor-pointer group">
    <input
      name={name}
      type="checkbox"
      checked={checked}
      onChange={handleChange}
      className="mt-2"
    />

    <span className="text-sm text-slate-600 leading-relaxed block">
      {children}
    </span>
  </label>
);

export default function CompanyRegistration() {
  // const [blob, setblob] = useState<Blob | null>(null);
  const [url, setUrl] = useState('');

  const {
    formData,
    handleChange,
    handleAreaChange,
    handleSubmit,
    error,
    setVerify_file,
    isSuccessOpen,
    setIsSuccessOpen,
  } = useRegisterCompany(url);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleCameraClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0] || null;
    console.log('file ', file);
    if (!file) return;
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result as string);
      setIsOpen(true);
      setIsCropping(true);
    };
    reader.readAsDataURL(file);
    setPreview(URL.createObjectURL(file));
  };
  return (
    <>
      <div className="w-full">
        {/* ── Dark hero strip ── */}
        {/* <div className="bg-indigo-700 w-full from-slate-900 to-slate-800 px-6 py-10">
          <div className="max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 bg-indigo-900/50 border border-indigo-700 rounded-full px-3 py-1 mb-4">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              Employer Upgrade
            </span>
            <h1
              className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-2"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              Register Your Company
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              You're upgrading to an employer account. Fill in your company
              details to start posting jobs on HIRNEST.
            </p>
          </div>
        </div> */}

        {/* ── Stepper bar ── */}
        {/* <div className="bg-white border-b border-slate-100 py-5 px-6">
          stepper
          {/* <Stepper current={1} /> */}
        {/* </div> */}

        {/* ── Main form area ── */}
        <div className="max-w-2xl mx-auto bg-white mt-3 px-4 py-10 flex flex-col gap-6">
          {/* Info banner */}
          <div className="flex items-start gap-3 rounded-2xl bg-indigo-50 border border-indigo-100 px-5 py-4">
            <div className="flex-shrink-0 mt-0.5">
              <IconInfo />
            </div>
            <div>
              <p
                className="text-sm font-bold text-indigo-600 mb-0.5"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                Your account is already set up
              </p>
              <p className="text-xs text-indigo-500/80 leading-relaxed">
                Your username, password, and phone number are carried over from
                your existing account — no need to re-enter them. Just complete
                your company profile below.
              </p>
            </div>
          </div>
          {/* ─── CARD 1 · Company Identity ─── */}
          <Card title="Company Identity">
            <div className="flex gap-5 bg items-start flex-wrap">
              {/* Logo upload circle */}
              <div className="flex flex-col items-center gap-2">
                <div
                  onClick={handleCameraClick}
                  className="relative w-28 h-28 rounded-full border-2 border-dashed border-slate-200 bg-white flex items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all overflow-hidden"
                >
                  <input
                    onChange={handleImageChange}
                    type="file"
                    ref={inputRef}
                    accept="image/*"
                    className="hidden"
                  />

                  {preview ? (
                    <img src={preview} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <IconCamera />
                      <span className="text-[10px] text-slate-400 mt-1">
                        Upload Logo
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400">
                  PNG, JPG · Max 5 MB
                </span>
                {error && error.logo && (
                  <p className="text-red-600 text-sm">* {error.logo}</p>
                )}
              </div>
              {/* Name + tagline */}
              <div className="flex-1 min-w-[200px] flex flex-col gap-4">
                <Field label="Company Name" required>
                  <input
                    name="companyName"
                    onChange={handleChange}
                    value={formData.companyName}
                    type="text"
                    className={inputCls}
                    placeholder="e.g. Acme Technologies Pvt. Ltd."
                  />
                  {error && error.companyName && (
                    <p className="text-red-600 text-sm">
                      * {error.companyName}
                    </p>
                  )}
                </Field>
                <Field label="Tagline / Short Description">
                  <input
                    name="tagLine"
                    onChange={handleChange}
                    value={formData.tagLine}
                    type="text"
                    className={inputCls}
                    placeholder="e.g. Building the future of work"
                  />
                  {error && error.tagLine && (
                    <p className="text-red-600 text-sm">* {error.tagLine}</p>
                  )}
                </Field>
              </div>
            </div>
            {/* Website + Industry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Company Website">
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="https://yourcompany.com"
                />
                {error && error.website && (
                  <p className="text-red-600 text-sm">* {error.website}</p>
                )}
              </Field>
              <Field label="Industry" required>
                <SelectField
                  name="industry"
                  onChange={handleChange}
                  options={Industry_Type}
                  value={formData.industry}
                  placeholder="Select industry"
                />
                {error && error.industry && (
                  <p className="text-red-600 text-sm">* {error.industry}</p>
                )}
              </Field>
            </div>
          </Card>
          {/* Size + Founded */}
          <Card title="Location & Contact">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Company Size" required>
                <SelectField
                  name="size"
                  onChange={handleChange}
                  value={formData.size}
                  placeholder="Select size"
                  options={Company_Size}
                />
                {error && error.size && (
                  <p className="text-red-600 text-sm">* {error.size}</p>
                )}
              </Field>
              <Field label="Year Founded">
                <SelectField
                  name="startedIn"
                  onChange={handleChange}
                  value={formData.startedIn}
                  placeholder="Select Year"
                  options={YEARS}
                />
                {error && error.size && (
                  <p className="text-red-600 text-sm">* {error.startedIn}</p>
                )}
              </Field>
            </div>
          </Card>
          {/* ─── CARD 2 · Location & Contact ─── */}
          <Card title="Location & Contact">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Country" required>
                <SelectField
                  placeholder="Select country"
                  onChange={handleChange}
                  name="adress.country"
                  value={formData?.adress?.country || ''}
                  options={Country_Name}
                />
                {error && error.adress?.country && (
                  <p className="text-red-600 text-sm">
                    * {error.adress.country}
                  </p>
                )}
              </Field>
              <Field label="City / State" required>
                <input
                  name="adress.state"
                  onChange={handleChange}
                  value={formData.adress.state}
                  type="text"
                  className={inputCls}
                  placeholder="e.g. Bengaluru, Karnataka"
                />
                {error && error.adress?.state && (
                  <p className="text-red-600 text-sm">* {error.adress.state}</p>
                )}
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Official Email" required>
                <input
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  className={inputCls}
                  placeholder="hr@yourcompany.com"
                />
                {error && error.email && (
                  <p className="text-red-600 text-sm">* {error.email}</p>
                )}
              </Field>
              <Field label="Office Phone">
                <input
                  value={formData.phone}
                  onChange={handleChange}
                  name="phone"
                  type="tel"
                  className={inputCls}
                  placeholder="+91 98765 43210"
                />
                {error && error.phone && (
                  <p className="text-red-600 text-sm">* {error.phone}</p>
                )}
              </Field>
            </div>
          </Card>

          {/* ─── CARD 3 · About ─── */}
          <Card title="About the Company">
            <Field
              label="Company Overview"
              required
              hint="Describe your mission, culture, and what makes you a great place to work."
            >
              <textarea
                value={formData.about}
                onChange={handleAreaChange}
                name="about"
                className={`${inputCls} resize-y min-h-[100px]`}
                placeholder="Tell candidates about your company..."
              />

              <p className="text-xs text-slate-400 text-right -mt-1">
                0 / 1000
              </p>
              {error && error.about && (
                <p className="text-red-600 text-sm">* {error.about}</p>
              )}
            </Field>

            <Field label="">
              <div className="flex flex-col gap-3">
                <div className="space-y-3">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold text-gray-700">
                      Social Media Links
                    </summary>

                    <div className="mt-3 space-y-3">
                      {
                        <div className="space-y-3">
                          {/* LinkedIn */}
                          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                            <svg
                              className="w-5 h-5 mr-3 text-blue-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            <input
                              value={formData.links.linkedIn}
                              data-section="socialMediaLinks"
                              onChange={handleChange}
                              type="text"
                              name="links.linkedIn"
                              placeholder="LinkedIn profile URL"
                              className="w-full outline-none"
                            />
                          </div>
                          {error && error?.links?.linkedIn && (
                            <p className="text-red-600 text-sm">
                              * {error.links.linkedIn}
                            </p>
                          )}
                          {/* Twitter */}
                          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring--400">
                            <Twitter className="w-5 h-5 text-blue-500 mr-2" />
                            <input
                              value={formData.links?.twitter}
                              onChange={handleChange}
                              type="text"
                              data-section="socialMediaLinks"
                              name="links.twitter"
                              placeholder="Twitter profile URL"
                              className="w-full outline-none"
                            />
                          </div>
                          {error && error?.links?.twitter && (
                            <p className="text-red-600 text-sm">
                              * {error.links.twitter}
                            </p>
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
                              value={formData.links?.whatsapp}
                              onChange={handleChange}
                              type="text"
                              data-section="socialMediaLinks"
                              name="links.whatsapp"
                              placeholder="Whatapp  URL"
                              className="w-full outline-none"
                            />
                          </div>
                          {error?.links?.whatsapp &&
                            formData.links?.whatsapp !== '' && (
                              <p className="text-red-500 text-sm">
                                *{error.links.whatsapp}
                              </p>
                            )}
                          {/*youtube*/}
                          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-600">
                            <Youtube className="w-5 h-5 text-red-500 mr-2" />
                            <input
                              value={formData.links?.youtube || ''}
                              onChange={handleChange}
                              type="text"
                              data-section="socialMediaLinks"
                              name="links.youtube"
                              placeholder="Youtube "
                              className="w-full outline-none"
                            />
                          </div>
                          {error?.links?.youtube &&
                            formData.links?.youtube !== '' && (
                              <p className="text-red-500 text-sm">
                                *{error.links.youtube}
                              </p>
                            )}

                          {/* Portfolio */}
                          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
                            <Globe className="w-5 h-5 text-gray-500 mr-2" />
                            <input
                              value={formData.links?.portfolio}
                              onChange={handleChange}
                              type="text"
                              name="links.portfolio"
                              data-section="socialMediaLinks"
                              placeholder="Portfolio website URL"
                              className="w-full outline-none"
                            />
                          </div>
                          {error?.links?.portfolio &&
                            formData.links?.portfolio !== '' && (
                              <p className="text-red-500 text-sm">
                                *{error.links.portfolio}
                              </p>
                            )}
                        </div>
                      }
                    </div>
                  </details>
                </div>
                {/* LinkedIn
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-blue-50 flex items-center justify-center">
                    <IconLinkedIn />
                  </div>
                  <input
                    type="url"
                    className={inputCls}
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>
                {/* Twitter */}
                {/* <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-sky-50 flex items-center justify-center">
                    <IconTwitter />
                  </div>
                  <input
                    type="url"
                    className={inputCls}
                    placeholder="https://twitter.com/yourcompany"
                  />
                </div> */}
              </div>
            </Field>
          </Card>
          {/* ─── CARD 4 · Verification Documents ─── */}
          <Card
            title="Verification Documents"
            desc="Used to verify your company's legitimacy. Documents are never displayed publicly."
          >
            <div className="flex w-full gap-4 items-end">
              {/* Select */}
              <div className="w-1/2">
                <SelectField
                  name="documents.type"
                  value={formData.documents.type}
                  onChange={handleChange}
                  options={Document_Types}
                  placeholder="Select document type"
                />
                {error && error.documents.type && (
                  <p className="text-red-600 text-sm">
                    * {error.documents.type}
                  </p>
                )}
              </div>

              {/* File Input */}
              <div className="w-1/2">
                <input
                  type="file"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setVerify_file(e.target?.files?.[0] || null)
                  }
                  className={`${inputCls} cursor-pointer file:mr-1 file:px-1 file:py-.5 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100`}
                />
                {error && error.documents?.file && (
                  <p className="text-red-600 text-sm">
                    * {error.documents.file}
                  </p>
                )}
              </div>
            </div>
          </Card>
          {/* ─── CARD 5 · Terms ─── */}
          <Card title="Terms & Agreement">
            <Checkbox
              name="isAgreed"
              handleChange={handleChange}
              checked={formData.isAgreed}
            >
              I confirm that all information provided is accurate and that I am
              authorised to register this company on HIRNEST. I agree to the{' '}
              <a
                href="#"
                className="text-indigo-500 hover:underline font-medium"
              >
                Employer Terms of Service
              </a>{' '}
              and{' '}
              <a
                href="#"
                className="text-indigo-500 hover:underline font-medium"
              >
                Privacy Policy
              </a>
              .
            </Checkbox>
            {error && error.isAgreed && (
              <p className="text-red-600 text-sm">* {error.isAgreed}</p>
            )}

            <Checkbox
              name="isConsent"
              handleChange={handleChange}
              checked={formData.isConsent}
            >
              I consent to HIRNEST verifying the submitted documents with
              relevant authorities for identity verification purposes.
              {error && error.isConsent && (
                <p className="text-red-600 text-sm">* {error.isConsent}</p>
              )}
            </Checkbox>
          </Card>
          {/* ─── Action bar ─── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto rounded-xl border-2 border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-500 hover:border-slate-400 hover:text-slate-700 transition-all"
              style={{ fontFamily: "'DM Sans',sans-serif" }}
            >
              ← Back to Homepage
            </button>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={handleSubmit}
                className="flex-1 sm:flex-none rounded-xl bg-green-600 px-7 py-2.5 text-sm font-bold text-white hover:bg-indigo-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-200 transition-all"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                Submit & Continue →
              </button>
            </div>
          </div>
          {/* Help note */}
          <p className="text-center text-xs text-slate-400 pb-4">
            Documents are reviewed within 1–2 business days.{' '}
            <a href="#" className="text-indigo-500 hover:underline">
              Contact Support
            </a>
          </p>
        </div>
        <ImageCropModal
          preview={preview}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          image={imageSrc}
          setPreview={setPreview}
          isCropping={isCropping}
          setIsCropping={setIsCropping}
          handleSelectedImage={setUrl}
        />
        <SuccessModal
          open={isSuccessOpen}
          onClose={() => setIsSuccessOpen(false)}
        />
      </div>
    </>
  );
}
