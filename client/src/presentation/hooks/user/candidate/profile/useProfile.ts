import { useState, useEffect } from 'react';
import { type UserProfileType } from '../../../../../types/dtos/profile-types/user.types';
import { useToast } from '../../../../../shared/toast/use-toast';

import { useNavigate } from 'react-router-dom';
import { type SkillType } from '../../../../../types/dtos/profile-types/skill.types';
import { skillService } from '../../../../../services/api-services/skillServices';
import { profileService } from '../../../../../services/api-services/candidateService';

export const useProfile = () => {
  const [user, setUser] = useState<UserProfileType>();
  const [allSkills, setAllSkills] = useState<SkillType[]>([]);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      try {
        const data = await profileService.getProfile();
        console.log(`data candidate`, data);

        let user = data.user;
        console.log('user', user);

        setUser(user);
      } catch (error: any) {
        console.log(error.response);
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
