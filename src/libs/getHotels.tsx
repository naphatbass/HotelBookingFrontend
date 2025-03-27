export default async function getHotels() {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels`, {cache: "no-store"});
    if ( !response.ok ) {
        throw new Error('Failed to fetch hotels');
    }

    return await response.json()
}