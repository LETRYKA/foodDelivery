"use client";

import * as React from "react";
import { fetchFoodById, PatchFoodById } from "@/lib/api";
import { ArrowUpRight, ImageUp, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

interface FoodData {
  description: string;
  foodName: string;
  foodImage: string;
  price: number;
  image: string;
}

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dvswnpwbg/image/upload";
const UPLOAD_PRESET = "updata";

export function EditDrawer({ foodId, dataRefresh }: Props) {
  const [loading, setLoading] = useState(false);
  const [foodData, setFoodData] = useState<FoodData | null>(null);
  const [inputData, setInputData] = useState({
    foodName: "",
    foodPrice: "",
    foodDescription: "",
    foodImage: "",
  });

  const updateFoodData = async () => {
    if (!foodData) return;

    const isChanged =
      inputData.foodName !== foodData.foodName ||
      Number(inputData.foodPrice) !== foodData.price ||
      inputData.foodDescription !== foodData.description ||
      inputData.foodImage !== foodData.image;

    if (!isChanged) {
      toast.info("No changes have been made");
      return;
    }

    try {
      await PatchFoodById({
        foodId,
        foodName: inputData.foodName,
        foodPrice: Number(inputData.foodPrice),
        foodDescription: inputData.foodDescription,
        foodImage: inputData.foodImage,
      });
      dataRefresh();
      toast.success("Successfully updated food!");
    } catch (err) {
      console.error("Error occurred while updating food data:", err);
    }
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFoodById({ foodId });
        setFoodData(response.data);
      } catch (error) {
        console.error("Failed to fetch food data:", error);
      }
    };
    fetchData();
  }, [foodId]);

  useEffect(() => {
    if (foodData) {
      setInputData({
        foodName: foodData.foodName,
        foodPrice: foodData.price.toString(),
        foodDescription: foodData.description,
        foodImage: foodData.image,
      });
    }
  }, [foodData]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="w-full h-12 bg-[var(--foreground)] flex flex-row justify-center items-center gap-2 rounded-[var(--radius)] mt-6 group hover:bg-[var(--background)] border transition-all duration-100 ease-in cursor-pointer mb-2">
          <p className="text-[var(--background)] text-sm flex group-hover:text-[var(--foreground)] transition-all duration-100 ease-in">
            Edit food
          </p>
          <ArrowUpRight
            width={18}
            className="stroke-[var(--background)] group-hover:stroke-[var(--foreground)] transition-all duration-100 ease-in"
          />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader>
            <DrawerTitle>Edit {foodData?.foodName}</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-row w-full h-full gap-4 justify-center">
            <div className="w-60 h-60 bg-slate-300 rounded-[var(--radius)] border-1 shadow-lg overflow-hidden group cursor-pointer relative">
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
              {inputData?.foodImage && (
                <img
                  src={inputData.foodImage}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-100 ease-in z-0 group-hover:blur-[2px] group-hover:brightness-80"
                />
              )}
            </div>
            <div className="flex flex-col w-fit">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateFoodData();
                }}
                className="w-[300px] flex flex-col gap-2"
              >
                {/* NAME */}
                <Input
                  id="foodName"
                  name="foodName"
                  placeholder="Food Name"
                  value={inputData.foodName}
                  onChange={handleInputChange}
                  required
                  className="bg-[var(--background)]"
                />
                {/* PRICE */}
                <Input
                  id="foodPrice"
                  type="number"
                  name="foodPrice"
                  placeholder="Food Price"
                  value={inputData.foodPrice}
                  onChange={handleInputChange}
                  required
                  className="bg-[var(--background)]"
                />
                {/* DESCRIPTION */}
                <Textarea
                  id="foodDescription"
                  name="foodDescription"
                  placeholder="Food Description"
                  value={inputData.foodDescription}
                  onChange={handleTextareaChange}
                  required
                />
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </form>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button onClick={updateFoodData}>Save</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
