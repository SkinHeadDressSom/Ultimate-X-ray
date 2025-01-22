const SplitDateandTime = async (date_time) => {
  try {
    const date = date_time.toLocaleDateString(); // Locale-specific date
    const time = date_time.toLocaleTimeString(); // Locale-specific time

    return { date, time };
  } catch (error) {
    console.error("Error at Split Date and Time function:", error.message);
    return null;
  }
};
module.exports = { SplitDateandTime };
