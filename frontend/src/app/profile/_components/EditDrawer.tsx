"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PatchUser } from "@/lib/api";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const EditDrawer = (props: any) => {
  const { user, type } = props;
  const [inputData, setInputData] = useState({
    Username: "",
    Phone: "",
    Email: "",
    Password: "",
    Address: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateUserData = async () => {
    const updatedData: any = {};

    if (inputData.Username) updatedData.Username = inputData.Username;
    if (inputData.Phone) updatedData.Phone = inputData.Phone;
    if (inputData.Email) updatedData.Email = inputData.Email;
    if (inputData.Password) updatedData.Password = inputData.Password;
    if (inputData.Address) updatedData.Address = inputData.Address;

    if (Object.keys(updatedData).length === 0) {
      toast.error("No fields to update.");
      return;
    }

    try {
      await PatchUser({
        ...updatedData,
        userId: user.data._id,
      });
      toast.success(`${type} updated successfully!`);
    } catch (err) {
      console.error("Error occurred while updating user", err);
      toast.error("Error updating user.");
    }
  };

  return (
    <div className="dark">
      <Drawer>
        <DrawerTrigger asChild>
          <Pencil width={14} stroke="grey" cursor="pointer" />
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Edit {type}</DrawerTitle>
            </DrawerHeader>
            <div className="w-full px-5">
              <Input onChange={handleInputChange} name={type} />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button onClick={updateUserData}>Update</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default EditDrawer;
