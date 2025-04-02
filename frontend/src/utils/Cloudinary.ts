const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

export const handleFileUpload = async (e, setProfileImage, setIsLoading) => {
  setIsLoading(true);
  const image = e.target.files?.[0];
  if (!image) return;

  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: data,
    });
    if (!res.ok) throw new Error("Upload failed");

    const result = await res.json();
    setIsLoading(false);
    setProfileImage(result.secure_url) || setProfileImage;
  } catch (err) {
    console.error("Upload error:", err);
  }
};
