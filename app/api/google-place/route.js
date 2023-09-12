import { NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const GET = async (req) => {
    try {
        const requestURL = new URL(req.url);
        const { category, radius, lat, lng } = {
            category: requestURL.searchParams.get('category'),
            radius: requestURL.searchParams.get("radius"),
            lat: requestURL.searchParams.get("lat"),
            lng: requestURL.searchParams.get("lng")
        };

        const url = `${BASE_URL}${encodeURI(`/textsearch/json?query=${category}&location=${lat},${lng}&radius=${radius}&key=${GOOGLE_API_KEY}`)}`
        const response = await fetch(
            url,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const product = await response.json();
        // console.log(product);
        return NextResponse.json({ product });


    } catch (error) {
        console.error('Error:', error);
    }

}