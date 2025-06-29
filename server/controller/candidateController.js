import attendance from "../model/attendanceModel.js";
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

    console.log(req.body);

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
        console.log("employee created");

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        console.log("today");

        const exists = await attendance.findOne({
          employee: newEmployee._id,
          date: today,
        });

        console.log(exists, "exsist");

        if (!exists) {
          await attendance.create({
            employee: newEmployee._id,
            fullName: newEmployee.fullName,
            position: newEmployee.position,
            department: newEmployee.department,
            date: today,
          });
        }
        console.log("attendanve");

        if (newEmployee) {
          await candidate.findByIdAndDelete(id);
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

    const deletedCandidate = await candidate.findByIdAndDelete(id);

    if (!deletedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json({ message: "Candidate deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting candidate" });
  }
};

export const filterCandidate = async (req, res) => {
  try {
    const { fullName, position, status } = req.query;

    const query = {};

    if (fullName) {
      query.fullName = { $regex: fullName, $options: "i" };
    }

    if (position) {
      query.position = position;
    }

    if (status) {
      query.status = status;
    }

    const results = await candidate.find(query);
    console.log(results);

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error filtering attendance",
      error: err.message,
    });
  }
};
