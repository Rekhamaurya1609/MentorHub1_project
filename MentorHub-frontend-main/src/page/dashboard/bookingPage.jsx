import React, { useEffect, useState } from "react";
import { Table, Button, Spin } from "antd";
import moment from "moment";
import Layout from "../../components/Layout";
import booking from "../../apiManger/booking";
// ---
//import { getMentorAvailability } from "../../apiManger/availability";
//---

const Booking = () => {
  //--
  //const [MentorAvailability , setMentorAvailability ] = useState([]);
  //---
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming"); // 'upcoming' or 'past'

  const fetchBookings = async () => {
    setLoading(true);
    const res = await booking.getMentorBookings();
    setBookings(res?.data?.bookings);
    setLoading(false);
  };

  //------------add new
//   useEffect(() => {
//   fetchAvailability(selectedMentorId, selectedDuration);
// }, [selectedMentorId, selectedDuration]);
//----------------------

  useEffect(() => {
    fetchBookings();
  }, []);

  //--
  // const fetchAvailability = async (mentorId, duration) =>{
  //   try {
  //     const res = await getMentorAvailability (mentorId, duration);
  //      setMentorAvailability (res.data);  
  //   } catch(error) {
  //     console.log("Error fetching availability:", error);
  //       setMentorAvailability([]);

  //   }
  // };

  const handlePayNow = (bookingId) => {
    // handle payment logic for the booking
  };

  //------------------------------on upper coment
//   const handlePayNow = (bookingId, mentorId, duration) => {
//   if (mentorAvailability.length === 0) {
//     alert("No available slots for this mentor.");
//     return;
//   }
//   // if available, proceed
//   console.log("Processing payment for booking id", bookingId);
// };
  //----------

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "upcoming") {
      return moment(booking.dateAndTime).isAfter(moment()); // Future bookings
    } else {
      return moment(booking.dateAndTime).isBefore(moment()); // Past bookings
    }
  });

  const columns = [
    {
      title: "Date",
      dataIndex: "dateAndTime",
      key: "dateAndTime",
      render: (text) => moment(text).format("DD MMM YYYY, hh:mm A"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `₹${price}`,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) =>
        record.status === "pending" ? (
          <Button type="primary" onClick={() => handlePayNow(record._id)}>
            Pay Now
          </Button>
        ) : null,
    },
  ];

  return (
    <Layout>
      <div className="container p-4 mx-auto">
        <h2 className="text-2xl font-bold">Your Bookings</h2>
        <div className="flex my-4 space-x-4">
          <Button
            type={activeTab === "upcoming" ? "primary" : "default"}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Bookings
          </Button>
          <Button
            type={activeTab === "past" ? "primary" : "default"}
            onClick={() => setActiveTab("past")}
          >
            Past Bookings
          </Button>
        </div>

        {loading ? (
          <Spin size="large" />
        ) : (
          <Table
            columns={columns}
            dataSource={filteredBookings}
            pagination={{ pageSize: 5 }}
            rowKey={(record) => record._id}
          />
        )}
      </div>
    </Layout>
  );
};

export default Booking;
