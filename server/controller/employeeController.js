import employee from "../model/employeeModel.js";

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await employee.find().sort({ dateOfJoining: -1 });

    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: "Error fetching employees" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await employee.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Error deleting employee" });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    console.log("hii");

    const updatedEmployee = await employee.findByIdAndUpdate(
      id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const filterEmployees = async (req, res) => {
  try {
    const { fullName, position } = req.query;
    console.log(fullName, position);

    const query = {};

    if (fullName && fullName.trim()) {
      query.fullName = { $regex: fullName.trim(), $options: "i" };
    }

    if (position && position.trim()) {
      query.position = position.trim();
    }

    const employees = await employee.find(query);
    console.log(employees);

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to filter employees",
      error: err.message,
    });
  }
};
