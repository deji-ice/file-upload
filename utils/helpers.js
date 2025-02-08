import bcrypt from "bcrypt";

const passwordHasher = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Password hashing failed");
  }
};

const passwordCompare = async (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    throw new Error("Password and hashed password must be provided");
  }
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

export { passwordHasher, passwordCompare };