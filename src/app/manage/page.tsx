'use client';
import { useEffect, useState } from "react";
import getBookings from "@/libs/getBookings";
import { useSession } from "next-auth/react";
import deleteBooking from "@/libs/deleteBooking"; // Import delete function
import updateBooking from "@/libs/updateBooking"; // Import update function
import DateReserve from "@/components/DateReserve";

export default function Manage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingBooking, setEditingBooking] = useState<any | null>(null);
  const [newBookingDate, setNewBookingDate] = useState<string>('');
  const [newCheckoutDate, setNewCheckoutDate] = useState<string>('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!session?.user?.token) {
          throw new Error("No token found in session");
        }
        const response = await getBookings(session?.user?.token);
        setBookings(response.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [session]);

  const handleDeleteBooking = async (bookingId: string) => {
    try {
      if (!session?.user?.token) {
        throw new Error("No token found in session");
      }
      await deleteBooking(session?.user?.token, bookingId);
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      alert("Booking deleted successfully");
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking");
    }
  };

  const handleEditBooking = (booking: any) => {
    setEditingBooking(booking);
    setNewBookingDate(new Date(booking.bookingDate).toLocaleDateString());
    setNewCheckoutDate(new Date(booking.checkoutDate).toLocaleDateString());
  };

  const handleUpdateBooking = async () => {
    if (editingBooking && session?.user?.token) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize time to avoid time mismatches
  
      const newBooking = new Date(newBookingDate);
      const newCheckout = new Date(newCheckoutDate);
  
      if (newBooking < today) {
        alert("Booking date cannot be in the past.");
        return;
      }
  
      if (newCheckout <= newBooking) {
        alert("Checkout date must be after the booking date.");
        return;
      }
  
      try {
        await updateBooking(session?.user?.token, newBookingDate, newCheckoutDate, editingBooking._id);
        const updatedBookings = bookings.map((booking) => {
          if (booking._id === editingBooking._id) {
            return { ...booking, bookingDate: newBookingDate, checkoutDate: newCheckoutDate };
          }
          return booking;
        });
        setBookings(updatedBookings);
        setEditingBooking(null);
        alert("Booking updated successfully");
      } catch (error) {
        console.error("Error updating booking:", error);
        alert("Failed to update booking");
      }
    }
  };
  

  const handleBookingDateChange = (date: string) => {
    setNewBookingDate(date);
  };

  const handleCheckoutDateChange = (date: string) => {
    setNewCheckoutDate(date);
  };

  if (loading) {
    return <div className="p-5 h-[100vh]">Loading bookings...</div>;
  }

  return (
    <div className="mt-[12vh] h-[88vh] bg-white p-5">
      <h1 className="text-xl mb-4">Manage Bookings</h1>
      {bookings.length > 0 ? (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Booking ID</th>
              <th className="px-4 py-2">Booking Date</th>
              <th className="px-4 py-2">Checkout Date</th>
              <th className="px-4 py-2">Hotel</th>
              <th className="px-4 py-2">Actions</th> {/* Added actions column */}
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking: any) => (
              <tr key={booking.id} className="border-t">
                <td className="px-4 py-2 text-center">{booking._id}</td>
                <td className="px-4 py-2 text-center">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-center">
                  {new Date(booking.checkoutDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-center">{booking.hotel.name}</td>
                <td className="px-4 py-2 text-center">
                  {/* Add Edit and Delete buttons */}
                  <button
                    onClick={() => handleEditBooking(booking)}
                    className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBooking(booking._id)}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found.</p>
      )}

      {/* Show date pickers for editing booking */}
      {editingBooking && (
        <div className="mt-5 p-5 bg-gray-100 rounded-md">
          <h2 className="text-lg mb-4">Edit Booking</h2>
          <p className="text-lg">Select new booking date</p>
          <DateReserve onDateChange={handleBookingDateChange} defaultDate={newBookingDate} />
          <p className="text-lg mt-4">Select new checkout date</p>
          <DateReserve onDateChange={handleCheckoutDateChange} defaultDate={newCheckoutDate} />
          <div className="mt-4">
            <button
              onClick={handleUpdateBooking}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Update Booking
            </button>
            <button
              onClick={() => setEditingBooking(null)}
              className="bg-gray-500 text-white p-2 rounded-md ml-2 hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
