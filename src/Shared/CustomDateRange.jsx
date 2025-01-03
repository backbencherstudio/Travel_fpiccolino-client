export const getDateRange = (filter) => {
  const today = new Date();
  let startDate, endDate;

  switch (filter) {
    case "thisWeek":
      const firstDayOfWeek = today.getDate() - today.getDay(); // Sunday
      startDate = new Date(today);
      startDate.setDate(firstDayOfWeek);
      endDate = new Date(today);
      endDate.setDate(firstDayOfWeek + 6); // Saturday
      break;
    case "lastWeek":
      const lastWeekEnd = today.getDate() - today.getDay(); // Last week's Sunday
      const lastWeekStart = lastWeekEnd - 6; // Last week's Saturday
      startDate = new Date(today);
      startDate.setDate(lastWeekStart);
      endDate = new Date(today);
      endDate.setDate(lastWeekEnd);
      break;
    case "thisMonth":
      startDate = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the current month
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the current month
      break;
    case "lastMonth":
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1); // First day of last month
      endDate = new Date(today.getFullYear(), today.getMonth(), 0); // Last day of last month
      break;
    case "thisYear":
      startDate = new Date(today.getFullYear(), 0, 1); // First day of the current year
      endDate = new Date(today.getFullYear(), 12, 0); // Last day of the current year
      break;
    case "lastYear":
      startDate = new Date(today.getFullYear() - 1, 0, 1); // First day of last year
      endDate = new Date(today.getFullYear() - 1, 12, 0); // Last day of last year
      break;
    default:
      startDate = null;
      endDate = null;
      break;
  }

  return { startDate, endDate };
};
