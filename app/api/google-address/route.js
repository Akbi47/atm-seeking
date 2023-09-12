import { NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/distancematrix/json";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const GET = async (req) => {
    try {
        const requestURL = new URL(req.url);
        const { Location1Str, Location2Str } = {
            Location1Str: requestURL.searchParams.get('Location1Str'),
            Location2Str: requestURL.searchParams.get("Location2Str"),
        };

        const url = `${BASE_URL}?${encodeURI(`origins=${Location1Str}&destinations=${Location2Str}&key=${GOOGLE_API_KEY}`)}`
        const response = await fetch(
            url,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const product = await response.json();
        return NextResponse.json({ product });


    } catch (error) {
        console.error('Error:', error);
    }

}