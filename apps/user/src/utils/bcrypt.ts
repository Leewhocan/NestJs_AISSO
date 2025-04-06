import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
    const SALT = await bcrypt.genSalt(10);
    return bcrypt.hash(password, SALT);
}
