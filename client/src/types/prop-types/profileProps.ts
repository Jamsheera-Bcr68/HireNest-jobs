import type { UserProfileType } from '../dtos/profile-types/user.types';

export interface BasicDataProps {
  user?: UserProfileType;
  onUserUpdate: React.Dispatch<React.SetStateAction<UserProfileType | null>>;
}
export type ProfileImgViewModalProps = {
  open: boolean;
  onClose: () => void;
  profileImage: string | undefined;
  onUserUpdate: React.Dispatch<React.SetStateAction<UserProfileType | null>>;
};
