import employee from "../model/employeeModel.js";

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await employee.find().sort({ dateOfJoining: -1 });
    console.log(employees);

    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: "Error fetching employees" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await employee.findByIdAndDelete({ _id: id });

    if (!deleted) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting employee" });
  }
};
