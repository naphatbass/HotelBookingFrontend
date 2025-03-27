export default async function postBooking( token : string, bookingDate: string, checkoutDate: string, hotelId: string ) {

    const response = await fetch(`http://localhost:5000/api/v1/hotels/${hotelId}/bookings`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bookingDate: bookingDate,
            checkoutDate: checkoutDate,
        })
    });
    if ( !response.ok ) {
        throw new Error('Failed to post booking');
    }

    return await response.json()
}