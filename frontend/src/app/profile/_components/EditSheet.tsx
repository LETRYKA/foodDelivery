"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { PatchUser } from "@/lib/api";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EditDrawer = (props: any) => {
  const { user } = props;

  const [inputData, setInputData] = useState({
    Username: user?.name || "",
    Phone: user?.phoneNumber || "",
    Email: user?.email || "",
    Password: "",
    Address: user?.address || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user?.data) {
      setInputData({
        Username: user?.name || "",
        Phone: user?.phoneNumber || "",
        Email: user?.email || "",
        Password: "",
        Address: user?.address || "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateUserData = async () => {
    const updatedData: any = {};

    if (inputData.Username) updatedData.Username = inputData.Username;
    if (inputData.Phone) updatedData.Phone = inputData.Phone;
    if (inputData.Email) updatedData.Email = inputData.Email;
    if (inputData.Password) updatedData.Password = inputData.Password;
    if (inputData.Address) updatedData.Address = inputData.Address;

    try {
      await PatchUser({
        ...updatedData,
        userId: user?._id,
      });
      toast.success(`Updated successfully!`);
    } catch (err) {
      console.error("Error updating user", err);
      toast.error("Error updating user.");
    }
  };

  const handlePasswordSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Password not matching.");
      return;
    }

    // try {
    //   await PatchUser({
    //     // userId: user?._id,
    //     // currentPassword: passwordData.currentPassword,
    //     // newPassword: passwordData.newPassword,
    //   });
    //   toast.success("Password updated successfully!");
    // } catch (err) {
    //   console.error("Error updating password", err);
    //   toast.error("Error updating password.");
    // }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="rounded-full py-6 px-8 font-semibold">
          Профайл засах
        </Button>
      </SheetTrigger>
      <SheetContent className="dark">
        <SheetHeader className="px-7 mt-5">
          <SheetTitle className="text-2xl font-bold">Профайл засах</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4 px-8">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Username" className="text-right text-white">
              Нэр
            </Label>
            <Input
              id="Username"
              name="Username"
              value={inputData.Username}
              onChange={handleInputChange}
              className="col-span-3 text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Phone" className="text-right text-white">
              Утас
            </Label>
            <Input
              id="Phone"
              name="Phone"
              value={inputData.Phone}
              onChange={handleInputChange}
              className="col-span-3 text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Email" className="text-right text-white">
              Емэйл
            </Label>
            <Input
              id="Email"
              name="Email"
              value={inputData.Email}
              onChange={handleInputChange}
              className="col-span-3 text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Address" className="text-right text-white">
              Хаяг
            </Label>
            <Input
              id="Address"
              name="Address"
              value={inputData.Address}
              onChange={handleInputChange}
              className="col-span-3 text-white"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-6 bg-[var(--foreground)] hover:bg-[var(--foreground)]/90">
                <Lock />
                Нууц үг солих
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dark">
              <DialogHeader>
                <DialogTitle className="text-white">Нууц үг солих</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-3 mb-2">
                  <Label htmlFor="currentPassword" className="text-white">
                    Одоогийн нууц үг
                  </Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="col-span-3 text-white"
                    type="password"
                  />
                </div>
                <div className="flex flex-col gap-3 mb-2">
                  <Label htmlFor="newPassword" className="text-white">
                    Шинэ нууц үг
                  </Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="col-span-3 text-white"
                    type="password"
                  />
                </div>
                <div className="flex flex-col gap-3 mb-2">
                  <Label htmlFor="confirmPassword" className="text-white">
                    Шинэ нууц үг
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="col-span-3 text-white"
                    type="password"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  className="text-white"
                  onClick={handlePasswordSubmit}
                >
                  Хадгалах
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="button"
              className="text-white py-6"
              onClick={updateUserData}
            >
              Хагалах
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditDrawer;
