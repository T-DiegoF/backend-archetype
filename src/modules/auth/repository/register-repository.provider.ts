import { UserAuthTypes } from '../auth.types';
import { UserAuthRepository } from './register.repository';

export const UserAuthRepositoryProvider = {
  provide: UserAuthTypes.INFRASTRUCTURE.REPOSITORY,
  useClass: UserAuthRepository,
};
