import { UserRole } from '../../../../domain/enums/user.enums';

export const participantConfig = {
  [UserRole.CANDIDATE]: {
    from: 'companies',
    localField: 'companyId',
    nameField: 'companyName',
    imageField: 'logoUrl',
  },
  [UserRole.COMPANY]: {
    from: 'users',
    localField: 'candidateId',
    nameField: 'name',
    imageField: 'imageUrl',
  },
};
