import { useState, useEffect } from 'react';
import { type UserProfileType } from '../../../../../types/dtos/profileTypes/userTypes';
import axiosInstance from '../../../../../libraries/axios';
import { type typeOfToast } from '../../../../../types/toastTypes';
import { useNavigate } from 'react-router-dom';
import { type SkillType } from '../../../../../types/dtos/profileTypes/skillTypes';

export const useProfile = (showToast: (toast: typeOfToast) => void) => {
  const [user, setUser] = useState<UserProfileType>();
  const [allSkills, setAllSkills] = useState<SkillType[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    async function getUser() {
      try {
        let response = await axiosInstance.get('/candidate/profile');
        console.log('response ', response);

        let user = response.data?.user;
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
        const response = await axiosInstance.get('/skills');
        const skills = response.data.skills;
        console.log('skills ', skills);
        setAllSkills(skills);
      } catch (error: any) {
        console.log(error);

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
