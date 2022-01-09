let width = 320;
let height = 0;

let streaming = false;

let video = null;
let canvas = null;

let encodedImage = null;

export let startup = async () => {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');

    navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: false
        })
        .then((stream) => {
            video.srcObject = stream;
            video.play();

            setTimeout(() => {
                stream.getTracks().forEach((track) => track.stop());
            }, 4000);
        })
        .catch((err) => {
            console.log('An error occurred: ' + err);
        });

    video.addEventListener(
        'canplay',
        (event) => {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                if (isNaN(height)) {
                    height = width / (4 / 3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        },
        false
    );

    let base64String = await waitForImage();

    return base64String;
};

const waitForImage = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let base64String = takepicture();
            //document.getElementsByClassName('contentarea')[0].classList.add('hide');
            encodedImage = base64String;

            resolve(encodedImage);
        }, 3000);
    });
};
const takepicture = () => {
    let context = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    let data = canvas.toDataURL('image/png');

    const pictureDetails = 'data:image/png;base64,';
    const base64String = data.replace(pictureDetails, '');
    return base64String;
};

export default startup;
