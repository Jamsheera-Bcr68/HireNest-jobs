import { useState, useEffect } from 'react';
import { type UserProfileType } from '../../../../../types/dtos/profile-types/user.types';
import { useToast } from '../../../../../shared/toast/use-toast';

import { data, useNavigate } from 'react-router-dom';
import { type SkillType } from '../../../../../types/dtos/profile-types/skill.types';
import { skillService } from '../../../../../services/api-services/skillServices';
import { profileService } from '../../../../../services/api-services/candidateService';
import type { SkillStatusType } from '../../../../../types/dtos/skill.types';
export type SkillFilter = {
  status: SkillStatusType;
  search?: string;
};

export const useProfile = () => {
  const [user, setUser] = useState<UserProfileType>();
  const [allSkills, setAllSkills] = useState<SkillType[]>([]);
    const [loading,setLoading]=useState<boolean>(false)
  const { showToast } = useToast();
  const navigate = useNavigate();

  const initialSkillFilter: SkillFilter = {
    status: 'approved',
  };

  const [skillFilter, setSkillFilter] =
    useState<SkillFilter>(initialSkillFilter);
  const updateFilter = (search: string) => {
    console.log('from update filter,search is ', search);
    setSkillFilter({ ...skillFilter, search: search });
  };
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
      setLoading(true)
      try {
        const data = await skillService.getSkills(skillFilter);
        console.log('candidate skills', data);

        const skills = data.data.skills;
        console.log('skills ', skills);
        setAllSkills(skills);
        setLoading(false)
      } catch (error: any) {
        // console.log(error);
setLoading(false)
        showToast({
          msg: error.response?.data.message || error.message,
          type: 'error',
        });
      }
    }
    getUser();
    getAllSkills();
  }, [skillFilter]);

  return { user, setUser, allSkills, updateFilter };
};
