export const UserAuthTypes = {
  APPLICATION: {
    USER_REGISTER: Symbol('UserRegisterApplication'),
    USER_LOGIN: Symbol('UserLoginApplication'),
  },
  INFRASTRUCTURE: {
    REPOSITORY: Symbol('UserAuthRepository'),
  },
};
