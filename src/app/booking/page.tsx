'use client';
import { useEffect, useState } from "react";
import DateReserve from "@/components/DateReserve";
import { TextField, Select, MenuItem } from "@mui/material";
import getHotels from "@/libs/getHotels";
import getUserProfile from "@/libs/getUserProfile";
import { useSession } from "next-auth/react";
import postBooking from "@/libs/postBooking"; // Import the postBooking function

export default function Booking() {
  const { data: session } = useSession();
  const [hotelsResponse, setHotelsResponse] = useState<any>(null);

  // Initialize formData with session values if available.
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    contact: session?.user?.tel || "",
    selectedHotel: "",
    bookingDate: "",
    checkoutDate: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      // Fetch hotels data
      const hotelsRes = await getHotels();
      setHotelsResponse(hotelsRes);

      // If the session has a token, fetch the user's profile
      if (session?.user?.token) {
        try {
          const profile = await getUserProfile(session.user.token);
          console.log("profile", profile);
          // If profile and profile.tel exist, update the contact field
          if (profile && profile.data.tel) {
            setFormData((prev) => ({ ...prev, contact: profile.data.tel }));
          }
        } catch (err) {
          console.error("Error fetching profile:", err);
        }
      }
    };
    fetchData();
  }, [session]);

  const hotels = hotelsResponse?.data || [];

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingDateChange = (date: string) => {
    setFormData((prev) => ({
      ...prev,
      bookingDate: date
    }));
  };

  const handleCheckoutDateChange = (date: string) => {
    setFormData((prev) => ({
      ...prev,
      checkoutDate: date
    }));
  };

  const handleBooking = async () => {
    const errors: string[] = [];

    // Validate name field
    if (!formData.name.trim()) {
      errors.push("Name field is required");
    }

    // Validate contact field
    if (!formData.contact.trim()) {
      errors.push("Contact number is required");
    }

    // Validate booking date: must be provided and not in the past
    if (!formData.bookingDate) {
      errors.push("Please select a booking date");
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const bookingDate = new Date(formData.bookingDate);
      bookingDate.setHours(0, 0, 0, 0);
      if (bookingDate < today) {
        errors.push("Booking date cannot be in the past");
      }
    }

    // Validate checkout date: must be provided and after booking date
    if (!formData.checkoutDate) {
      errors.push("Please select a checkout date");
    } else {
      const bookingDate = new Date(formData.bookingDate);
      const checkoutDate = new Date(formData.checkoutDate);
      if (checkoutDate <= bookingDate) {
        errors.push("Checkout date must be after booking date");
      }
    }

    // Validate hotel selection
    if (!formData.selectedHotel) {
      errors.push("Please select a hotel");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const hotel: any = hotels.find((hotel: any) => hotel.name === formData.selectedHotel);
    const hotelId = hotel ? hotel.id : null;

    if (hotelId && session?.user?.token) {
      try {
        const bookingResponse = await postBooking(
          session.user.token,
          formData.bookingDate,
          formData.checkoutDate,
          hotelId
        );
        console.log("Booking successful:", bookingResponse);
        alert("Booking successful!");
      } catch (err) {
        console.error("Error posting booking:", err);
        alert("Booking failed. Please try again.");
      }
    } else {
      alert("Hotel ID is missing. Please select a hotel.");
    }
  };

  return (
    <div className="mt-[12vh] h-[100vh] bg-white">
      <h1 className="text-xl p-5 pt-10">Venue Booking Form</h1>
      <p className="text-lg p-5">Please enter your information</p>
      <TextField
        className="m-5"
        label="Name-Lastname"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <TextField
        className="m-5"
        label="Contact-Number"
        variant="outlined"
        name="contact"
        value={formData.contact}
        onChange={handleInputChange}
      />
      <p className="text-lg p-5">Select booking date</p>
      <DateReserve onDateChange={handleBookingDateChange} />
      <p className="text-lg p-5">Select checkout date</p>
      <DateReserve onDateChange={handleCheckoutDateChange} />
      <p className="text-lg p-5">Select your hotel</p>
      <div className="p-5">
        <Select
          variant="standard"
          name="selectedHotel"
          id="venue"
          className="h-[2em] w-[200px]"
          value={formData.selectedHotel}
          onChange={handleInputChange}
        >
          {hotels.map((hotel: any) => (
            <MenuItem key={hotel.id} value={hotel.name}>
              {hotel.name}
            </MenuItem>
          ))}
        </Select>
        <button
          name="Book Venue"
          className="bg-blue-200 p-5 rounded-md m-2 shadow-sm hover:bg-blue-500 hover:text-white"
          onClick={handleBooking}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
