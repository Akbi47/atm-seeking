async function checkFileExist(path, filename) {
    try {
        const url = `${path}/${filename}`;
        const response = await fetch(url);
        if (response.ok) {
            return url;
        }
    } catch (error) {
        return 'NaN';
    }
}
export default async function CheckFormatImg(imgName) {
    const imgObj = {
        jpgType: `${imgName}.jpg`,
        jpegType: `${imgName}.jpeg`,
        pngType: `${imgName}.png`,
        gifType: `${imgName}.gif`
    }
    const path = `http://localhost:3000`;
    let filename
    for (const key in imgObj) {
        filename = await checkFileExist(path, imgObj[key])
        if (filename) break;
    }
    return filename;
}

