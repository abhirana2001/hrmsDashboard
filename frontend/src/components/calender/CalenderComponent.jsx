import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import intrectionPlugin from "@fullcalendar/interaction";
import "./CalenderComponent.css";
import { axiosInstance } from "../../features/axiosInstance";

const CalenderComponent = ({ handleApprovedLeaves }) => {
  const [leave, setLeave] = useState([]);

  useEffect(() => {
    async function getLeave() {
      const res = await axiosInstance.get("/leave/datecount");

      setLeave(res?.data?.data);
    }
    getLeave();
  }, []);

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    handleApprovedLeaves(info.dateStr);
  };

  useEffect(() => {
    const allCells = document.querySelectorAll(".fc-daygrid-day");

    allCells.forEach((cell) => {
      const cellDate = cell.getAttribute("data-date");
      cell.classList.remove("custom-selected");

      if (selectedDate && cellDate === selectedDate) {
        cell.classList.add("custom-selected");
      }

      if (!selectedDate) {
        const today = new Date().toISOString().split("T")[0];
        if (cellDate === today) {
          cell.classList.add("custom-selected");
        }
      }
    });
  }, [selectedDate]);

  const leaveEvents = leave?.map((item) => {
    return {
      title: `${item.count}`,
      start: item.date,
      display: "background",
      className: "leave-dot",
    };
  });

  return (
    <FullCalendar
      plugins={[dayGridPlugin, intrectionPlugin]}
      headerToolbar={{
        start: "prev",
        center: "title",
        end: "next",
      }}
      dateClick={handleDateClick}
      validRange={{
        start: new Date().toLocaleDateString("en-CA", {
          timeZone: "Asia/Kolkata",
        }),
      }}
      events={leaveEvents}
      eventContent={(arg) => (
        <div className="dot-wrapper">
          <div className="dot-with-count">{arg.event.title}</div>
        </div>
      )}
      height={"40vh"}
      dayHeaderFormat={{ weekday: "narrow" }}
      showNonCurrentDates={false}
      fixedWeekCount={false}
    />
  );
};

export default CalenderComponent;
