const getEmotions = async (encodedImage) => {
    const res = await fetch(
        'http://localhost:5000/postImage',
        {
            method: 'POST',
            body: JSON.stringify({
                encoded_image: encodedImage
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept': '*/*'
            }
        }
    );

    const result = await res.json();
    result.base64Img = encodedImage;

    return result;
};

export default getEmotions;
