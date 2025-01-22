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

module.exports = { CalculateAge };
