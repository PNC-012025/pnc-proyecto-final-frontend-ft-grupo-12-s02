export function sendImageToCloud(imageFormData) {
  // LOG: Mostrar el contenido del FormData
  for (let pair of imageFormData.entries()) {
    console.log("Cloudinary formData:", pair[0], pair[1]);
  }

  return fetch("https://api.cloudinary.com/v1_1/dqntcutk6/image/upload", {
    method: "POST",
    body: imageFormData
  }).then(async res => {
    // LOG: Mostrar status y respuesta
    const data = await res.clone().json().catch(() => ({}));
    console.log("Cloudinary response status:", res.status);
    console.log("Cloudinary response body:", data);

    if (!res.ok) throw new Error("Error uploading image to cloudinary");
    return data;
  }).then(res => {
    const { secure_url } = res;
    return secure_url;
  });
}