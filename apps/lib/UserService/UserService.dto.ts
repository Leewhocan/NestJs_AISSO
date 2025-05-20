export type UserLoginInput = {
    email: string;
    password: string;
};
export type AuthResult = { acseesToken: string; userName: string; role: string; id: number };
