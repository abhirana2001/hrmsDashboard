export const pageHeadings = () => {
  switch (location.pathname) {
    case "/candidate":
      return "Candidate";
    case "/attendance":
      return "Attendance";
    case "/employee":
      return "Employee";
    case "/leaves":
      return "Leaves";

    default:
      "HOME";
  }
};
