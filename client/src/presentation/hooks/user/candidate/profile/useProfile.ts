import { useState, useEffect } from 'react';
import { type UserProfileType } from '../../../../../types/dtos/profileTypes/userTypes';

import { type typeOfToast } from '../../../../../types/toastTypes';
import { useNavigate } from 'react-router-dom';
import { type SkillType } from '../../../../../types/dtos/profileTypes/skillTypes';
import { skillService } from '../../../../../services/apiServices/skillServices';
import { profileService } from '../../../../../services/apiServices/candidateService';

export const useProfile = (showToast: (toast: typeOfToast) => void) => {
  const [user, setUser] = useState<UserProfileType>();
  const [allSkills, setAllSkills] = useState<SkillType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      try {
        const data = await profileService.getProfile();
        //console.log('response ', response);

        let user = data.user;
        console.log('user', user);

        setUser(user);
      } catch (error: any) {
        // console.log(error.response);
        showToast({
          msg: error?.response?.data?.message || error.message,
          type: 'error',
        });
        navigate('/');
        return;
      }
    }

    async function getAllSkills() {
      try {
        const data = await skillService.getSkills({ status: 'approved' });
        console.log('candidate skills', data);

        const skills = data.data.skills;
        console.log('skills ', skills);
        setAllSkills(skills);
      } catch (error: any) {
        // console.log(error);

        showToast({
          msg: error.response?.data.message || error.message,
          type: 'error',
        });
      }
    }
    getUser();
    getAllSkills();
  }, []);

  return { user, setUser, allSkills };
};
