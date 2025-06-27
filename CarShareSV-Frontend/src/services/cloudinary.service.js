export function sendImageToCloud(imageFormData) {
  // LOG: Mostrar el contenido del FormData
  for (let pair of imageFormData.entries()) {
  }

  return fetch("https://api.cloudinary.com/v1_1/dqntcutk6/image/upload", {
    method: "POST",
    body: imageFormData
  }).then(async res => {
    const data = await res.clone().json().catch(() => ({}));

    if (!res.ok) throw new Error("Error uploading image to cloudinary");
    return data;
  }).then(res => {
    const { secure_url } = res;
    return secure_url;
  });
}