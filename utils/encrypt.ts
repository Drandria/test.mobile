import bcrypt from "bcryptjs";

bcrypt.setRandomFallback((len: number) => {
	const random = [];
	for (let i = 0; i < len; i++) {
		random.push(Math.floor(Math.random() * 256));
	}
	return random;
});

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(4);
    return await bcrypt.hash(password, salt);
}

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
}