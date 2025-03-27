export default async function updateBooking( token : string, bookingDate: string, checkoutDate: string, bookingId: string ) {

    const response = await fetch(`http://localhost:5000/api/v1/bookings/${bookingId}`, {
        method: 'PUT',
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
        throw new Error('Failed to update booking');
    }

    return await response.json()
}