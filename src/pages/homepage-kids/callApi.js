const getEmotions = async (encodedImage) => {
    const res = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyD6KhA_iGFTdikjr7Tq43IjwH4bx8JAfXI',
        {
            method: 'POST',
            body: JSON.stringify({
                requests: [
                    {
                        features: [
                            {
                                maxResults: 10,
                                type: 'FACE_DETECTION'
                            }
                        ],
                        image: {
                            content: encodedImage
                        }
                    }
                ]
            }),
            headers: {
                'Content-type': 'application/json'
            }
        }
    );

    const result = await res.json();

    const data = result.responses[0].faceAnnotations[0];

    const emotions = {};

    emotions.joyLikelihood = data.joyLikelihood;
    emotions.sorrowLikelihood = data.sorrowLikelihood;
    emotions.angerLikelihood = data.angerLikelihood;
    emotions.surpriseLikelihood = data.surpriseLikelihood;
    emotions.underExposedLikelihood = data.underExposedLikelihood;
    emotions.detectionConfidence = data.detectionConfidence;
    emotions.base64Img = encodedImage;

    return emotions;
};

export default getEmotions;
