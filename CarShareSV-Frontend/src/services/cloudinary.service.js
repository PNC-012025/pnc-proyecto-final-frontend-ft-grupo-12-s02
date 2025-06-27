export function sendImageToCloud (imageFormData) {
  return fetch("https://api.cloudinary.com/v1_1/dqntcutk6/image/upload", {
    method: "POST",
    body: imageFormData
  }).then(res => {
    if(!res.ok) throw new Error("Error uploading image to cloudinary");

    return res.json();
  }).then(res => {
    const { secure_url } = res;
    //console.log("IMAGE URL:" + secure_url);
    return secure_url;
  });
}