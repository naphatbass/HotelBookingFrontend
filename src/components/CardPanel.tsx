import Card from "./Card";

import getHotels from "@/libs/getHotels";

export default async function CardPanel() {
    const hotelsResponse = await getHotels();
    const hotels = hotelsResponse?.data || [];

    return (
        <div style={{ margin: "20px" }}>
            {/* Top list of venues */}
            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                {hotels.map((hotel : any) => (
                    <Card
                        key={hotel._id}
                        hotelName={hotel.name}
                        address={hotel.address}
                        district={hotel.district}
                        province={hotel.province}
                        tel={hotel.tel}
                        imgSrc={hotel.picture !== "None" ? hotel.picture : "https://lh3.googleusercontent.com/d/1N9ZTVrtu0KmeNqnVdofbOSKF7P_OXgRi=s0"} // Fallback image
                    />
                ))}
            </div>
        </div>
    );
}
