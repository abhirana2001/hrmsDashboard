import candidate from "../model/candidateModel.js";
import employee from "../model/employeeModel.js";

export const createCandidate = async (req, res) => {
  try {
    const { fullName, email, phoneNo, position, experience } = req.body;
    const resume = req.file?.filename;

    const isCandidateExsit = await candidate.findOne({ email: email });

    if (isCandidateExsit) {
      return res
        .status(400)
        .json({ message: "The candidate with this email already exsist" });
    }

    if (!resume) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const newCandidate = await candidate.create({
      fullName,
      email,
      phoneNo,
      position,
      resumeUrl: resume,
      experience,
    });

    return res.status(201).json({ message: "Candidate created", newCandidate });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await candidate.find();
    res.json(candidates);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error while fetching candidates." });
  }
};

export const updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updateInfo = await candidate.findByIdAndUpdate(
      { _id: id },
      { $set: { status } },
      {
        new: true,
        runValidators: true,
      }
    );

    if (req.body.status === "Selected") {
      const existingEmployee = await employee.findOne({
        email: updateInfo.email,
      });
      if (!existingEmployee) {
        const newEmployee = await employee.create({
          fullName: updateInfo.fullName,
          email: updateInfo.email,
          phoneNo: updateInfo.phoneNo,
          position: updateInfo.role || "Intern",
          department: updateInfo.position,
          experience: updateInfo.experience,
          resumeUrl: updateInfo.resumeUrl,
        });

        if (newEmployee) {
          await candidate.findByIdAndDelete({ _id: id });
          return res.status(201).json({ message: "employee is created" });
        }
      }
    }

    if (!updateInfo) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json(updateInfo);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error updating candidate" });
  }
};

export const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCandidate = await candidate.findByIdAndDelete({ _id: id });

    if (!deletedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json({ message: "Candidate deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting candidate" });
  }
};
