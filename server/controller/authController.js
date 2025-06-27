import User from "../model/userModel.js";
import { generateToken } from "../services/jwsToken.js";
import { hashPassword, verifyPassword } from "../services/password.js";

export const createUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req?.body;

    const exsistingUser = await User.findOne({ email });

    if (exsistingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      fullName,
      email,
      role,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "new user created successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserExsist = await User.findOne({ email });
    if (!isUserExsist) {
      return res
        .status(404)
        .json({ message: "email or password is incorrect" });
    }

    const isMatch = await verifyPassword(isUserExsist.password, password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ message: "email or password is incorrect" });
    }
    const jwtToken = generateToken({
      id: isUserExsist._id.toString(),
      fullName: isUserExsist.fullName,
      email: isUserExsist.email,
    });
    res
      .status(200)
      .cookie("token", jwtToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 1000 * 60 * 60 * 2,
      })
      .json({
        message: "Login successfully",
        user: {
          id: isUserExsist._id.toString(),
          fullName: isUserExsist.fullName,
          email: isUserExsist.email,
        },
        jwtToken,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
