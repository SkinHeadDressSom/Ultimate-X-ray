const CalculateAge = async (dobString) => {
  try {
    const dob = new Date(dobString); // date of birth
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const month_diff = today.getMonth() - dob.getMonth();
    const day_diff = today.getDate() - dob.getDate();

    // Check if the day and month has passed yet
    if (month_diff < 0 || (month_diff === 0 && day_diff < 0)) {
      age--;
    }

    return age;
  } catch (error) {
    console.error("Error at Calculate Age function:", error.message);
    return null;
  }
};

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
module.exports = { CalculateAge, SplitDateandTime };
