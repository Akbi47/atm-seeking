import GlobalApi from "@/shared/GlobalApi";

export default async function CalcDistance(lat1, lng1, lat2, lng2) {
    const Location1Str = lat1 + "," + lng1;
    const Location2Str = lat2 + "," + lng2;
    let dis = 'NaN'
    dis = await GlobalApi.getAddress(Location1Str, Location2Str);
    return dis.data.product.rows[0].elements[0].distance.text;
}
