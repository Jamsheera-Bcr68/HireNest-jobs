import { useMemo, useState } from 'react';
import { type typeOfToast } from '../../../types/toastTypes';
import axiosInstance from '../../../libraries/axios';
import type { UserProfileType } from '../../../types/dtos/userTypes';
import { skillService } from '../../../services/apiServices/skillServices';
import { type SkillType } from '../../../types/dtos/skillTypes';

export const useEditProfileDetails = (
  showToast: (data: typeOfToast) => void,
  onUserUpdate: (user: UserProfileType) => void,
  user: UserProfileType | undefined,
  skills: SkillType[] | []
) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsEditing(true);
    setValue(e.target.value);
  };
  const onEdit = () => {
    setIsEditing(true);
    setValue(user?.about || '');
  };
  const onBlur = () => {
    if (!user?.about && !value.trim()) {
      setIsEditing(false);
      setValue('');
    }
  };
  const cancelEdit = () => {
    setIsEditing(false);
    setValue('');
  };
  const addAbout = async () => {
    console.log('from add about');
    setIsEditing(false);
    if (!value.trim()) {
      showToast({ msg: 'Nothing to add', type: 'error' });
      return;
    }
    //submit
    try {
      console.log('value is ', value);
      const res = await axiosInstance.patch('/candidate/profile/about', {
        value: value,
      });

      console.log('user is ', res.data.user);

      showToast({ msg: res.data.message, type: 'success' });
      onUserUpdate(res.data.user);
    } catch (error: any) {
      showToast({
        msg: error.response?.data.message || error.message,
        type: 'error',
      });
    }
  };

  //skills component
  const [isAddSkill, setIsAddSkill] = useState<boolean>(false);
  const [skillName, setSkillName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [filteredSkill, setFilteredSkill] = useState<SkillType[] | []>([]);
  console.log('skiilfrom paraent', skills);

  const addSkill = async () => {
    setFilteredSkill([]);
    if (!isAddSkill) {
      setIsAddSkill(true);
      setSkillName('');
    } else {
      if (!skillName.trim()) {
        setError('Nothing to add');
        return;
      } else if (skillName.trim().length < 4) {
        setError('Skill name should atleast 3 letters');
        return;
      }
      setError('');
      try {
        console.log('validateion success skill name is ', skillName);

        const res = await axiosInstance.patch('/candidate/profile/skills/add', {
          skillName,
        });
        console.log('after adding skill ', res);
        onUserUpdate(res.data.user);
        showToast({ msg: res.data.message, type: 'success' });
        setSkillName('');
        setIsAddSkill(false);
      } catch (error: any) {
        console.log(error);
        showToast({
          msg: error.response?.data?.message || error.message,
          type: 'error',
        });
      }
    }
  };

  const removeSkill = async (skillId: string) => {
    try {
      const data = await skillService.removeSkill(skillId);
      console.log('data ', data);

      showToast({ msg: data.message, type: 'success' });
      onUserUpdate(data.user);
    } catch (error: any) {
      console.log(error);
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };

  const filteredSkills = useMemo(() => {
    if (!skillName.trim()) return [];
    return skills
      .filter((skill) =>
        skill.skillName.toLowerCase().includes(skillName.toLowerCase())
      )
      .filter(
        (skill) => !user?.skills.some((uskills) => uskills.id == skill.id)
      );
  }, [skillName, skills, user]);
  return {
    isEditing,
    handleChange,
    value,
    onEdit,
    addAbout,
    cancelEdit,
    setIsEditing,
    onBlur,

    //skills
    error,
    addSkill,
    isAddSkill,
    skillName,
    setSkillName,
    removeSkill,

    filteredSkills,
  };
};
