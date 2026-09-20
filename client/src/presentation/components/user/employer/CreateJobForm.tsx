import { useCallback, useState } from 'react';
import { useJobs } from '../../../hooks/user/employer/useJobs';
import { X, PlusIcon } from 'lucide-react';
import { useToast } from '../../../../shared/toast/use-toast';
import { skillService } from '../../../../services/api-services/skillServices';
import { type SkillType } from '../../../../types/dtos/skill.types';
import PermissionModal from '../../../modals/PermissionModal';
import { useNavigate } from 'react-router-dom';
import { Experience_Types } from '../../../../types/dtos/profile-types/experience.type';
import type { SkillFilter } from '../../../hooks/user/candidate/profile/useProfile';


const workMode = ['hybrid', 'remote', 'onsite'];

const CreateJobPost = () => {
  console.log('from create page');

  const { showToast } = useToast();
  const { formData, handleChange, handleSubmit, setFormData, error, setError } =
    useJobs();
  const [addSkill, setAddSkill] = useState(false);
  const [addRes, setAddRes] = useState(false);
 // const [skill, setSkill] = useState<string>('');
  //const [filteredSkills, setFilteredSkills] = useState<SkillType[]>([]);
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [filter] = useState<SkillFilter>({ status: 'approved' });
  const [res, setRes] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');

  const ErrorText = ({ error }: { error: string }) => {
    return <p className="text-sm text-red-600"> * {error}</p>;
  };

  const selectSkill = (skill: SkillType) => {
    const skill_exist = formData.skills.find((s) => s.id == skill.id);
    if (skill_exist) {
      showToast({ msg: 'Already existing ', type: 'error' });
      setSkills([]);
      setAddSkill(false);
      setSearch('');
      return;
    }
    setError((prev) => ({ ...prev, skills: '' }));
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
    setAddSkill(false);
    setSearch('');
    //setFilteredSkills([]);
  };

  const handlSkillInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (search.trim().length) {
      filter.search = search;
    }else{return}
    const data = await skillService.getSkills({ ...filter });
    console.log('data after getting skills',data);
    
    setSkills(data.data.skills);
  },[filter,search])

  // useEffect(() => {
  //   async function fetchskill() {
  //     try {
  //       const data = await skillService.getSkills({ status: 'approved' });
  //       console.log('skills ', data);
  //       setSkills(data.data.skills);
  //     } catch (error: any) {
  //       console.log(error);
  //       showToast({
  //         msg: error?.response?.data?.message || error.message,
  //         type: 'error',
  //       });
  //     }
  //   }
  //   fetchskill();
  // }, [filter]);

  // const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setError((prev) => ({ ...prev, skills: '' }));
  //   const value = e.currentTarget.value;
  //   setSkill(value);

  //   if (!value.trim()) {
  //     setSkills(skills);
  //     return;
  //   }

  //   const filtered = skills.filter((skill: SkillType) =>
  //     skill.skillName.toLowerCase().includes(value.toLowerCase())
  //   );
  //   console.log('fil', filtered);

  //   setSkills(filtered);
  // };

  const removeSkill = (id: string | undefined) => {
    if (!id) return;
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  const handleAddResponsibility = () => {
    if (!res.trim()) {
      setError((prev) => ({ ...prev, responsibilities: 'Nothing to add' }));
      return;
    } else if (res.trim().length < 5) {
      setError((prev) => ({
        ...prev,
        responsibilities: 'Responsibilities should have atleast 5 letters',
      }));
      return;
    }
    if (
      formData.responsibilities.length > 0 &&
      (formData.responsibilities as string[]).includes(res.trim())
    ) {
      setError((prev) => ({ ...prev, responsibilities: 'Already added' }));
      return;
    }
    if (formData.responsibilities.length >= 5) {
      setError((prev) => ({
        ...prev,
        responsibilities: 'You can only add 5 responsibility',
      }));
      setAddRes(false);
      setRes('');
      return;
    }
    setError((prev) => ({ ...prev, responsibilities: '' }));

    setFormData((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, res],
    }));
    setAddRes(false);
    setRes('');
  };

  const removeResponsibility = (res: string) => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((r) => r !== res),
    }));
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (!search.trim()) {
      showToast({ msg: 'Nothing to add', type: 'error' });
      setAddSkill(false);
      setSearch('')
      return;
    }
    const normalized = search.trim().toLowerCase();
    let skillExisInJob = formData.skills.find(
      (s) => s.skillName.toLowerCase() === normalized
    );
    if (skillExisInJob) {
      showToast({ msg: 'Skill aready exist', type: 'error' });
      setSearch('')
      return;
    }
    const skillExist = skills.find(
      (s) => s.skillName.toLowerCase() === normalized
    );
    if (skillExist) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillExist],
      }));
      setSearch('');
      setAddSkill(false);
    } else {
      setOpen(true);
    }
  };

  const handleAddNewSkill = async () => {
    console.log('user confirmed');
    try {
      if (!search) {
        setAddSkill(false);
        setSearch('');
        setOpen(false);
        return;
      }
      const data = await skillService.addNewSkill(search);
      console.log(data);

      console.log('skill created', data.skill);
      setOpen(false);
      setSearch('');
      setAddSkill(false);
      showToast({ msg: data.message, type: 'success' });
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, data.skill],
      }));
    } catch (error: any) {
      showToast({
        msg: error?.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto px-2">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">
          Create Job Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Job Title
              </label>
              <input
                value={formData.title}
                onChange={handleChange}
                name="title"
                type="text"
                placeholder="e.g. Frontend Developer"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {error && error.title && <ErrorText error={error.title} />}
            </div>
            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Job Mode</label>
              <select
                value={formData.mode}
                onChange={handleChange}
                name="mode"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Mode</option>
                {workMode.map((mode) => (
                  <option value={mode.toLowerCase()}>{mode}</option>
                ))}
              </select>
              {error && error.mode && <ErrorText error={error.mode} />}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Job type</label>
              <select
                value={formData.jobType}
                onChange={handleChange}
                name="jobType"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select type</option>
                <option value="partTime">Part-Time</option>
                <option value="fullTime">Full-time</option>
              </select>
              {error && error.jobType && <ErrorText error={error.jobType} />}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Vacancy Count
              </label>
              <input
                type="number"
                placeholder=""
                min={0}
                value={formData.vacancyCount}
                onChange={handleChange}
                name="vacancyCount"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {error && error.vacancyCount && (
                <ErrorText error={error.vacancyCount} />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Experience Needed
              </label>
              <select
                value={formData.experience}
                onChange={handleChange}
                name="experience"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select </option>
                {Experience_Types.map((ex, i) => (
                  <option key={i} value={ex}>
                    {ex} years
                  </option>
                ))}
              </select>
              {error && error.experience && (
                <ErrorText error={error.experience} />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Education
              </label>
              <input
                value={formData.education}
                onChange={handleChange}
                name="education"
                type="text"
                placeholder="e.g. B.Tech / MCA / Any Degree"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              {error && error.education && (
                <ErrorText error={error.education} />
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                value={formData.state}
                onChange={handleChange}
                name="state"
                type="text"
                placeholder="e.g. Kerala"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {error && error.state && <ErrorText error={error.state} />}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                value={formData.country}
                onChange={handleChange}
                name="country"
                type="text"
                placeholder="e.g. India"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {error && error.country && <ErrorText error={error.country} />}
            </div>
          </div>
          {/* Salary */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Salary Range
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  value={formData.min_salary}
                  onChange={handleChange}
                  name="min_salary"
                  placeholder="Min Salary (₹)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
                {error && error.min_salary && (
                  <ErrorText error={error.min_salary} />
                )}
              </div>
              <div>
                <input
                  type="text"
                  value={formData.max_salary}
                  onChange={handleChange}
                  name="max_salary"
                  placeholder="Max Salary (₹)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
                {error && error.max_salary && (
                  <ErrorText error={error.max_salary} />
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Date to Apply
              </label>
              <input
                value={formData.lastDate ?? ''}
                onChange={handleChange}
                name="lastDate"
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {error && error.lastDate && <ErrorText error={error.lastDate} />}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Languages Known
              </label>
              <input
                value={formData.languages}
                onChange={handleChange}
                name="languages"
                type="text"
                placeholder="e.g. English, Malayalam"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              {error && error.languages && (
                <ErrorText error={error.languages} />
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Requirements
              </label>

              <div className="w-full border border-gray-300 rounded-lg px-4 py-2">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">Skills</p>
                  {!addSkill && (
                    <PlusIcon
                      className="text-green-600 cursor-pointer"
                      onClick={() => setAddSkill(true)}
                      size={18}
                    />
                  )}
                </div>

                {/* Skills list */}
                {formData.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="flex items-center bg-fuchsia-100 text-fuchsia-800 px-3 py-1.5 rounded-full text-sm font-medium"
                      >
                        {skill.skillName}
                        <X
                          onClick={() => removeSkill(skill?.id)}
                          className="ml-2 cursor-pointer hover:text-red-500"
                          size={14}
                        />
                      </span>
                    ))}
                  </div>
                ) : (
                  !addSkill && (
                    <p className="text-gray-400 italic">
                      Add the skills you expect
                    </p>
                  )
                )}
              </div>

              {/* Input field */}
              {addSkill && (
                <div className="flex border border-gray-300 rounded-lg px-4 py-2 mt-2 justify-between items-center mb-2">
                  <input
                    onChange={handlSkillInput}
                    value={search}
                    type="text"
                    name="skill"
                    placeholder="Enter a skill and press Enter"
                    className="w-full  focus:outline-none focus:ring-2 rounded-lg px-4 py-2 mt-2  focus:ring-blue-400"
                  />
                  {!skills.length && (
                    <div>
                      <PlusIcon
                        onClick={handleAddSkill}
                        size={18}
                        className="ml-1 text-green-600 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              )}
              {skills.length > 0 && addSkill && !error?.skills && (
                <div className="absolute bg-white shadow-md w-1/4 border rounded-md z-10">
                  {skills.map((skill: SkillType) => (
                    <div
                      key={skill?.id}
                      onMouseDown={() => {
                        setSearch(skill.skillName);
                        selectSkill(skill);
                        setSearch('')
                        setSkills([])
                      }}
                      className="p-2 hover:bg-gray-100 border cursor-pointer"
                    >
                      {skill.skillName}
                    </div>
                  ))}
                </div>
              )}
              {error && error.skills && <ErrorText error={error.skills} />}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Responsibilities
              </label>

              <div className="w-full border border-gray-300 rounded-lg px-4 py-3">
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">Responsibilities</p>
                  {!addRes && (
                    <PlusIcon
                      className="text-green-600 cursor-pointer"
                      onClick={() => setAddRes(true)}
                      size={18}
                    />
                  )}
                </div>

                {/* List */}
                {formData.responsibilities.length > 0 ? (
                  <ul className="space-y-2">
                    {formData.responsibilities.map((res, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-md text-sm"
                      >
                        <span>• {res}</span>
                        <X
                          onClick={() => removeResponsibility(res)}
                          className="cursor-pointer hover:text-red-500"
                          size={14}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  !addRes && (
                    <p className="text-gray-400 italic">
                      Add the responsibilities
                    </p>
                  )
                )}
              </div>
              {error && error.responsibilities && (
                <ErrorText error={error.responsibilities} />
              )}
              {/* Input */}
              {addRes && (
                <div className="flex items-center gap-2 mt-2">
                  <input
                    onChange={(e) => setRes(e.target.value)}
                    // onKeyDown={handleResKeyDown}
                    value={res}
                    type="text"
                    placeholder="Enter a responsibility and press Enter"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <PlusIcon
                    onClick={handleAddResponsibility}
                    className="text-green-600 cursor-pointer"
                    size={18}
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium w-full">
              Job Description
            </label>
            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleAreaChange}
              placeholder="Write job description..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {error && error.description && (
              <ErrorText error={error.description} />
            )}
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => {
                navigate(-1);
              }}
              className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-fuchsia-800 text-white hover:bg-fuchsia-600 transition"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
      <PermissionModal
        isOpen={open}
        onClose={() => {
          setAddSkill(false);
          setSearch('');
          setOpen(false);
        }}
        onConfirm={handleAddNewSkill}
        text="This item not in the skillset, Do you want to request it?"
      />
    </div>
  );
};

export default CreateJobPost;
