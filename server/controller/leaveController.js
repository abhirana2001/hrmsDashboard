import employee from "../model/employeeModel.js";
import leaves from "../model/leaveModel.js";

export const createLeaveRequest = async (req, res) => {
  try {
    console.log(req.body);
    const { employeeId, fullName, designation, leaveDate, reason } = req.body;
    const documentation = req.file?.filename;
    const employeeExists = await employee.findById(employeeId);

    if (!employeeExists) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const newLeave = await leaves.create({
      employee: employeeId,
      fullName,
      designation,
      date: leaveDate,
      reason,
      docUrl: documentation,
    });

    res.status(201).json({
      success: true,
      message: "Leave request submitted",
      data: newLeave,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message:
          "A leave request for this date already exists for this employee",
      });
    }
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to submit leave request",
      error: error.message,
    });
  }
};

export const getAllLeaveRequests = async (req, res) => {
  try {
    const leave = await leaves.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leave.length,
      data: leave,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch leave requests",
      error: error.message,
    });
  }
};

export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["Approved", "Rejected", "Pending"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const updatedLeave = await leaves.findByIdAndUpdate(id, { status });

    if (!updatedLeave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Leave status updated",
      data: updatedLeave,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update leave status",
      error: error.message,
    });
  }
};

export const filterLeaves = async (req, res) => {
  try {
    const { status, fullName } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (fullName) {
      query.fullName = { $regex: fullName, $options: "i" };
    }

    const leave = await leaves.find(query);

    res.status(200).json({
      success: true,
      count: leave.length,
      data: leave,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to filter leave requests",
      error: error.message,
    });
  }
};

export const getLeaveCountByDay = async (req, res) => {
  try {
    const result = await leaves.aggregate([
      {
        $match: {
          status: "Approved",
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: result.map((item) => ({
        date: item._id,
        count: item.count,
      })),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to count leaves by day",
      error: err.message,
    });
  }
};

export const findLeavesByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res
        .status(400)
        .json({ success: false, message: "Date is required" });
    }

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const leave = await leaves
      .find({
        date: { $gte: start, $lte: end },
      })
      .populate("employee", "fullName email position");

    res.status(200).json({
      success: true,
      count: leave.length,
      data: leave,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch leaves by date",
      error: error.message,
    });
  }
};
