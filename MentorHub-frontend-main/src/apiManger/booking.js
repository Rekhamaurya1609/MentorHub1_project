import AxiosInstances from ".";

const bookService = async (data) => {
  return await AxiosInstances.post("/booking/initiate-booking", data);
};
const getMentorBookings = async () => {
  return await AxiosInstances.get("/booking/mentor");
};
const getStudentBookings = async () => {
  return await AxiosInstances.get("/booking/");
};

const booking = {
  bookService,
  getMentorBookings,
  getStudentBookings,
};

export default booking;
