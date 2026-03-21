import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { UserProfileType } from '../../../types/dtos/profileTypes/userTypes';
import { adminService } from '../../../services/apiServices/adminService';
import ImageAndName from '../../components/admin/CandidateDetails/ImageAndName';
import Tabs from '../../components/admin/CandidateDetails/Tabs';
import OverView from '../../components/admin/CandidateDetails/OverView';
import { useToast } from '../../../shared/toast/useToast';
import { type ContactDataType } from '../../components/admin/CandidateDetails/RightSideBar';
import {
  Github,
  Globe,
  Linkedin,
  MessageCircle,
  Twitter,
  Youtube,
  MailIcon,
  Phone,
} from 'lucide-react';

function CandidateDetails() {
  const { showToast } = useToast();
  const { candidateId } = useParams();
  console.log('candidate id is', candidateId);
  if (!candidateId) return;
  const [candidate, setCandidate] = useState<UserProfileType | null>(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [contactLinks, setContactLinks] = useState<ContactDataType[]>([]);
  useEffect(() => {
    async function getCandidate(candidateId: string) {
      try {
        const data = await adminService.getCandidate(candidateId);
        console.log('candidate', data);

        setCandidate(data.candidate);
        const links = [];
        if (data.candidate?.socialLinks?.gitHub)
          links.push({
            label: 'gitHub',
            icon: <Github size={18} className="text-gra-700" />,
            value: data.candidate.socialLinks.gitHub,
          });
        if (data.candidate?.socialLinks?.linkedIn)
          links.push({
            label: 'LinkedIn',
            icon: <Linkedin size={18} className="text-blur-700" />,
            value: data.candidate.socialLinks.linkedIn,
          });
        if (data.candidate?.socialLinks?.twitter)
          links.push({
            label: 'Twitter',
            icon: <Twitter size={18} className="text-blue-700" />,
            value: data.candidate.socialLinks.twitter,
          });
        if (data.candidate?.socialLinks?.portfolio)
          links.push({
            label: 'Website',
            icon: <Globe />,
            value: data.candidate.socialLinks.portfolio,
          });
        if (data.candidate?.socialLinks?.whatsapp)
          links.push({
            label: 'Whatsapp',
            icon: <MessageCircle size={18} className="text-green-700" />,
            value: data.candidate.socialLinks.whatsapp,
          });

        if (data.candidate?.socialLinks?.youtube)
          links.push({
            label: 'YouTube',
            icon: <Youtube size={18} className="text-red-700" />,
            value: data.candidate.socialLinks.youtube,
          });
        if (data.candidate?.email)
          links.push({
            label: 'Email',
            icon: <MailIcon size={18} className="text-red-700" />,
            value: data.candidate?.email,
          });
        if (data.candidate?.phone)
          links.push({
            label: 'Phone',
            icon: <Phone size={18} className="text-green-700" />,
            value: data.candidate?.phone,
          });
        setContactLinks(links);
        console.log('candidate phone', candidate?.phone);
      } catch (error: any) {
        showToast({
          msg: error.response?.data.message || error.message,
          type: 'error',
        });
      }
    }
    getCandidate(candidateId);
  }, []);
  if (!candidate) return null;
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <ImageAndName updateCandidate={setCandidate} candidate={candidate} />
      <Tabs activeTab={activeTab} handleTabChange={setActiveTab} />
      <OverView contactLinkes={contactLinks} candidate={candidate} />
    </div>
  );
}

export default CandidateDetails;
