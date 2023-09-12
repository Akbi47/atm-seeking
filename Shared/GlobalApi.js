import axios from 'axios';

// http://localhost:3000/api/google-place?category=indian&radius=1000&lat=35.0001&lng=-80

const getGooglePlace = async (category, radius, lat, lng) => await axios.get('/api/google-place?' +
    'category=' + category + '&radius=' + radius + '&lat=' + lat + '&lng=' + lng)

const getAddress = async (Location1Str, Location2Str) => await axios.get('/api/google-address?' +
    'Location1Str=' + Location1Str + '&Location2Str=' + Location2Str)

export default {
    getAddress,
    getGooglePlace
}