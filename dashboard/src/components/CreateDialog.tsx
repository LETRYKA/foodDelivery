"use client";

const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { ImageUp, Loader2 } from "lucide-react";
import { useState } from "react";

export function CreateDialog() {
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    foodName: "",
    foodPrice: "",
    foodDescription: "",
    foodImage: "",
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (!image) return;

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", UPLOAD_PRESET);

    try {
      setLoading(true);

      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Error");

      const result = await res.json();
      setInputData((prev) => ({ ...prev, ["foodImage"]: result.secure_url }));
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Dish</DialogTitle>
          <hr className="my-2" />
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 py-4">
          <div className="flex flex-col justify-start items-start gap-2">
            <Label htmlFor="name" className="text-right">
              Dish Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="flex flex-col justify-start items-start gap-2">
            <Label htmlFor="username" className="text-right">
              Price
            </Label>
            <Input id="username" className="col-span-3" />
          </div>
        </div>
        <Textarea
          id="foodDescription"
          name="foodDescription"
          placeholder="Food Description"
          className="-mt-4"
        />
        <div className="w-full h-40 bg-slate-300 rounded-[var(--radius)] border-1 shadow-lg overflow-hidden group cursor-pointer relative">
          <div className="flex items-center justify-center w-full h-full absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-all duration-100 ease-in">
            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
              {!loading ? (
                <ImageUp className="stroke-[var(--background)]" />
              ) : (
                <Loader2 className="stroke-white animate-spin" />
              )}
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => handleFileUpload(e)}
              />
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
