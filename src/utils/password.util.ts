import * as bcrypt from 'bcrypt';

export const createEncryptedHash = async (password: string) => {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
}

export const checkPasswordIfMatchWithHashedValue = async (password: string, encryptedHash: string) => {
    return bcrypt.compare(password, encryptedHash);
}