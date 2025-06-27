import argon from "argon2";

export const hashPassword = async (password) => {
  try {
    return await argon.hash(password);
  } catch (err) {
    throw err;
  }
};

export const verifyPassword = async (hashPass, passsword) => {
  try {
    return argon.verify(hashPass, passsword);
  } catch (err) {
    throw err;
  }
};
