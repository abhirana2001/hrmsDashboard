import attendance from "../model/attendanceModel.js";
import employee from "../model/employeeModel.js";

export const getTodayAttendance = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const todaysAttendance = await attendance.find({
      date: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    });

    res.status(200).json(todaysAttendance);
  } catch (error) {
    console.error("Error fetching today's attendance:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateAttendance = async (req, res) => {
  const { id } = req.params;
  const { status, task } = req.body;

  try {
    if (
      !["Present", "Absent", "Medical Leave", "Work from Home"].includes(status)
    ) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updated = await attendance.findByIdAndUpdate(
      id,
      { status, task },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.status(200).json({
      message: "Attendance status updated successfully",
      attendance: updated,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const autoCreateDailyPresentAttendance = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const employees = await employee.find();

    const attendanceEmp = await attendance.find({ date: today }, "employeeId");

    const markedIds = attendanceEmp.map((a) => a.employee?.toString());

    const toInsert = employees
      .filter((e) => !markedIds?.includes(e._id.toString()))
      .map((e) => ({
        employee: e._id,
        fullName: e.fullName,
        position: e.position,
        department: e.department,
        status: "Present",
        date: today,
      }));
    console.log(toInsert);

    if (toInsert.length > 0) {
      await attendance.insertMany(toInsert);
    }

    console.log({ scuss: true, message: "employee attendance is created" });
  } catch (err) {
    console.log(err);
  }
};

export const getTodayPresentEmployees = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const presentEmployees = await attendance
      .find({
        status: "Present",
        date: { $gte: today, $lt: tomorrow },
      })
      .populate("employeeId");

    res.status(200).json({
      success: true,
      count: presentEmployees.length,
      data: presentEmployees,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch today's present employees.",
      error: err.message,
    });
  }
};

export const searchTodayPresentByName = async (req, res) => {
  try {
    const { fullName } = req.query;

    if (!fullName || fullName.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required.",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const attendances = await attendance.find({
      status: "Present",
      date: { $gte: today, $lt: tomorrow },
      fullName: { $regex: fullName, $options: "i" },
    });

    const filtered = attendances.filter((a) => a.employee !== null);

    if (!filtered.length > 0) {
      res.status(404).json({
        success: false,
        message: "Not present",
      });
    }

    res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching today's present employees by name",
      error: err.message,
    });
  }
};

export const filterAttendance = async (req, res) => {
  try {
    const { fullName, status } = req.query;
    console.log(fullName, status);

    const query = {};

    if (fullName && fullName.trim()) {
      query.fullName = { $regex: fullName.trim(), $options: "i" };
    }

    if (status && status.trim()) {
      query.status = status.trim();
    }

    const records = await attendance.find(query);

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to filter attendance",
      error: err.message,
    });
  }
};
