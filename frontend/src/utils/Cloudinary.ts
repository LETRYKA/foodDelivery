export const handleFileUpload = async (
  e: React.ChangeEvent<HTMLInputElement>,
  imageType: string,
  setUserImages: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  setIsLoading: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  const image = e.target.files?.[0];
  if (!image) return;

  const data = new FormData();
  data.append("file", image);
  if (!process.env.NEXT_PUBLIC_UPLOAD_PRESET) {
    throw new Error("Upload preset is not defined");
  }
  data.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);

  try {
    setIsLoading((prev) => ({ ...prev, [imageType]: true }));

    if (!process.env.NEXT_PUBLIC_CLOUDINARY_URL) {
      throw new Error("Cloudinary URL is not defined");
    }

    const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL, {
      method: "POST",
      body: data,
    });

    if (!res.ok) throw new Error("Error uploading image");

    const result = await res.json();

    setUserImages((prev) => ({
      ...prev,
      [imageType]: result.secure_url,
    }));
  } catch (err) {
    console.error("Upload error:", err);
  } finally {
    setIsLoading((prev) => ({ ...prev, [imageType]: false }));
  }
};
