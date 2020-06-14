let file = document.querySelector("#grafika");
let canvas = document.querySelector("#canvas");
let negative = document.querySelector("#negative");
let saveImg = document.querySelector('#link')
let blackwhite = document.querySelector("#blackwhite")

let ctx = canvas.getContext('2d');
let img = new Image();

var staticImgData;


let sizeRange = document.getElementById('size')
let size = document.getElementById('sizeValue')

img.src = "img.jpg";
img.addEventListener('load', (e) => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    staticImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
})


let jBtn = document.querySelector("#brightnessId");
let nBtn = document.querySelector("#saturationId");
let jAfter = document.querySelector("#jAfter");
let nAfter = document.querySelector("#nAfter");
let kAfter = document.querySelector("#kAfter");

// brightness

jBtn.addEventListener('input', (e) => {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    jAfter.style.left = (parseFloat(jBtn.value) * 19) + 'px';
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = staticImgData.data[i] + (((255 - staticImgData.data[i]) / 10) * parseFloat(jBtn.value))

        imageData.data[i + 1] = staticImgData.data[i + 1] + (((255 - staticImgData.data[i + 1]) / 10) * parseFloat(jBtn.value))

        imageData.data[i + 2] = staticImgData.data[i + 2] + (((255 - staticImgData.data[i + 2]) / 10) * parseFloat(jBtn.value))
    }
    ctx.putImageData(imageData, 0, 0)
})

// negative

nBtn.addEventListener('input', (e) => {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    kAfter.style.left = (parseFloat(nBtn.value) * 19) + 'px';
    console.log(imageData)
    for (let i = 0; i < imageData.data.length; i += 4) {
        let max2 = Math.max(imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]);
        if (max2 == imageData.data[i]) {
            imageData.data[i] = staticImgData.data[i] + (((255 - staticImgData.data[i]) / 10) * parseFloat(nBtn.value));
            imageData.data[i + 1] = staticImgData.data[i + 1] - (((staticImgData.data[i + 1]) / 10) * parseFloat(nBtn.value));
            imageData.data[i + 2] = staticImgData.data[i + 2] - (((staticImgData.data[i + 2]) / 10) * parseFloat(nBtn.value));
        } else if (max2 == imageData.data[i + 1]) {
            imageData.data[i + 1] = staticImgData.data[i + 1] + (((255 - staticImgData.data[i + 1]) / 10) * parseFloat(nBtn.value));
            imageData.data[i] = staticImgData.data[i] - (((staticImgData.data[i]) / 10) * parseFloat(nBtn.value));
            imageData.data[i + 2] = staticImgData.data[i + 2] - (((staticImgData.data[i + 2]) / 10) * parseFloat(nBtn.value));
        } else {
            imageData.data[i + 2] = staticImgData.data[i + 2] + (((255 - staticImgData.data[i + 2]) / 10) * parseFloat(nBtn.value));
            imageData.data[i + 1] = staticImgData.data[i + 1] - (((staticImgData.data[i + 1]) / 10) * parseFloat(nBtn.value));
            imageData.data[i] = staticImgData.data[i] - (((staticImgData.data[i]) / 10) * parseFloat(nBtn.value));
        }
    }
    ctx.putImageData(imageData, 0, 0)
})



// drawing

canvas.onmousedown = function (e) {
    canvas.onmousemove = function (e) {
        if (document.getElementById('paintCheck').checked) {
            let x = event.offsetX
            let y = event.offsetY
            ctx.fillRect(x - sizeRange.value, y - sizeRange.value, sizeRange.value, sizeRange.value)
            ctx.fillStyle = color.value
        }
    }
    canvas.onmouseup = function (e) {
        canvas.onmousemove = null
    }
}

sizeRange.oninput = function () {
    size.innerHTML = sizeRange.value
}

// black-white

blackwhite.addEventListener('click', (e) => {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < imageData.data.length; i += 4) {

        let val = 0.299 * imageData.data[i + 0] + 0.587 * imageData.data[i + 1] + 0.114 * imageData.data[i + 2]
        imageData.data[i] = val
        imageData.data[i + 1] = val
        imageData.data[i + 2] = val

    }

    ctx.putImageData(imageData, 0, 0)
})

// negative

negative.addEventListener('click', (e) => {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = 255 - imageData.data[i]
        imageData.data[i + 1] = 255 - imageData.data[i + 1]
        imageData.data[i + 2] = 255 - imageData.data[i + 2]
    }
    ctx.putImageData(imageData, 0, 0)
})

// save img

saveImg.addEventListener('click', (e) => {
    let link = document.getElementById('link');
    link.setAttribute('download', 'obrazek.png');
    link.setAttribute('href', canvas.toDataURL("image/png"));
})