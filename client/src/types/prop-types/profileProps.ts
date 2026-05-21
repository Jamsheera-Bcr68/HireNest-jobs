import type { UserProfileType } from '../dtos/profile-types/user.types';

export interface BasicDataProps {
  user?: UserProfileType;
  onUserUpdate: (updatedUser: UserProfileType) => void;
}
export type ProfileImgViewModalProps = {
  open: boolean;
  onClose: () => void;
  profileImage: string | undefined;
  onUserUpdate: (updatedUser: UserProfileType) => void;
};
