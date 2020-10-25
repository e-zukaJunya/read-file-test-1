const readFile = document.getElementById("readFile");
const multiFile = document.getElementById("multiFile");
readFile.addEventListener("change", e => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const separateByDot = file.name.split(".");
    const type = separateByDot[separateByDot.length - 1].toLowerCase();
    const reader = new FileReader();
    switch (type) {
        case "txt": {
            reader.readAsText(file);
            reader.addEventListener("load", () => {
                console.log(reader.result);
            });
            break;
        }
        case "csv": {
            reader.readAsText(file);
            reader.addEventListener("load", () => {
                console.log(reader.result.split("\n"));
            });
            break;
        }
        case "json": {
            reader.readAsText(file);
            reader.addEventListener("load", () => {
                const json = JSON.parse(reader.result);
                console.log(json);
            });
            break;
        }
        case "jpg":
        case "jpeg":
        case "png":
        case "svg":
        case "bmp": {
            reader.readAsDataURL(file);
            reader.addEventListener("load", () => {
                const img = new Image();
                const dataUrl = reader.result;
                img.src = dataUrl;
                document.body.appendChild(img);
            });

            // canvas
            // var canvas = document.getElementById('canvas');
            // if (canvas.getContext) {
            //     var context = canvas.getContext('2d');
            //     var image = new Image();
            //     image.src = dataUrl;
            //     canvas.width = image.width;
            //     canvas.height = image.height;
            //     context.drawImage(image, 0, 0);
            // }
            break;
        }
        default: {
            break;
        }
    }
});

multiFile.addEventListener("change", e => {
    console.log(e.target.files);
    const files = e.target.files;
    const res = files.map((item, idx, ary) => {
        console.log(item);
        return item;
    });
    console.log(res);
});

const output = document.getElementById("output");
const textForOutput = document.getElementById("textForOutput");
const download = document.getElementById("download");
output.addEventListener("click", () => {
    var blob = new Blob([textForOutput.value], { type: "text/plain" });
    window.URL = window.URL || window.webkitURL;
    download.setAttribute("href", window.URL.createObjectURL(blob));
    download.setAttribute("download", "tmp.txt");
});
