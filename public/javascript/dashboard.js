const cloudName = "dlpy4wqdo";
const uploadPreset = "vja8jfpu";

const recipeURL = "";

var myWidget = cloudinary.createUploadWidget(
    {
        cloudName: cloudName, 
        uploadPreset: uploadPreset,
        multiple: false,
        folder: 'recipes',
        clientAllowFormats: ["images"],
        theme: "orange",
    },
    (error, result) => { 
        if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
        recipeURL = result.info.secure_url;
        }
    }
);

document.getElementById("upload_widget").addEventListener("click", function() {
    myWidget.open();
    },
    false
);