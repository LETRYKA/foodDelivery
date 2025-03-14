"use client";

const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
import { CreateFood } from "@/lib/api";
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
import { ChefHat, ImageUp, Loader2, Plus, Sticker } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function CreateDialog(props: any) {
  const { dataRefresh } = props;
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    foodName: "",
    foodPrice: "",
    foodDescription: "",
    foodImage: "",
  });

  console.log(inputData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

  const createFoodData = async () => {
    try {
      await CreateFood({
        foodName: inputData.foodName,
        foodPrice: Number(inputData.foodPrice),
        foodDescription: inputData.foodDescription,
        foodImage: inputData.foodImage,
      });
      dataRefresh();
      toast.success("Successfully Created food!");
    } catch (err) {
      console.error("Error occurred creating food:", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full h-14 my-3 bg-[#090D1B] rounded-[var(--radius)] flex flex-row justify-center items-center gap-3 cursor-pointer">
          <p className="text-sm text-[var(--background)] font-bold">
            Create New Dish
          </p>
          <div className="h-[50%] aspect-square bg-[var(--background)] rounded-sm flex justify-center items-center">
            <Plus className="stroke-[var(--foreground)]" width={15} />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sticker width={20} />
            Create Dish
          </DialogTitle>
          <hr className="my-2" />
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 py-4">
          <div className="flex flex-col justify-start items-start gap-2">
            <Label htmlFor="foodName" className="text-right">
              Dish Name
            </Label>
            <Input
              name="foodName"
              id="foodName"
              className="col-span-3"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-2">
            <Label htmlFor="foodPrice" className="text-right">
              Price
            </Label>
            <Input
              name="foodPrice"
              id="foodPrice"
              className="col-span-3"
              type="number"
              min="2.2"
              max="11"
              step="2.2"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <Textarea
          id="foodDescription"
          name="foodDescription"
          placeholder="Food Description"
          className="-mt-4 max-h-50"
          onChange={handleTextareaChange}
        />
        <div className="w-full h-48 bg-[var(--foreground)]/2 hover:bg-[var(--foreground)]/5 rounded-[var(--radius)] overflow-hidden group cursor-pointer relative border-1 border-dashed transition-all duration-100 ease-in ">
          <div className="flex items-center justify-center w-full h-full absolute inset-0 z-10 opacity-100 p-1">
            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
              {!loading ? (
                inputData.foodImage.length > 0 ? (
                  <div className="bg-[var(--foreground)]/10 rounded-full p-2 opacity-0 group-hover:opacity-100">
                    <ImageUp
                      className="stroke-[var(--background)]"
                      width={17}
                      height={17}
                    />
                  </div>
                ) : (
                  <>
                    <div className="bg-[var(--foreground)]/20 rounded-full p-2">
                      <ImageUp
                        className="stroke-[var(--background)]"
                        width={17}
                        height={17}
                      />
                    </div>
                    <p className="text-xs mt-2">
                      Choose a file or drag & drop it here
                    </p>
                    <p className="text-xs text-[var(--foreground)]/40">
                      5MB max file size
                    </p>
                  </>
                )
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
          {inputData?.foodImage && (
            <img
              src={inputData.foodImage}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-100 ease-in z-0 group-hover:blur-[2px] group-hover:brightness-80"
            />
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={createFoodData}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
