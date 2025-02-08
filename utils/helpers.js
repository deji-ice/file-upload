import bcrypt from "bcrypt";

const passwordHasher = async (password) => {
  const salt = await bcrypt.genSalt(10);
  if (!salt) {
    throw new Error("Something went wrong with bcrypt");
  }
  return await bcrypt.hash(password, salt);
};
const passwordCompare = async (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    throw new Error("Password and hashed password must be provided");
  }

  return await bcrypt.compare(password, hashedPassword);
};

export { passwordHasher, passwordCompare };
