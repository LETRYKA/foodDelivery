import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReceiptText, ShoppingBasket } from "lucide-react";

const Orders = () => {
  return (
    <>
      <div className="w-full px-5 mt-10">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">
              <ShoppingBasket /> Orders
            </TabsTrigger>
            <TabsTrigger value="past">
              <ReceiptText />
              Past Orders
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <Card className="h-[calc(100vh-200px)] border-none shadow-none">
              <CardContent className="space-y-2 w-full h-full flex flex-col">
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <img
                    src="https://png.pngtree.com/png-vector/20220520/ourmid/pngtree-shopping-bag-of-different-size-for-purchasing-items-png-image_4654001.png"
                    width={80}
                  />
                  <p className="text-lg font-bold">No orders yet</p>
                  <p className="text-sm text-[var(--foreground)] text-center mt-3 leading-4">
                    You'll able to see your order history here
                  </p>
                  <Button className="text-xs rounded-full mt-3 cursor-pointer">
                    Start an order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="past">
            <Card>
              <CardContent className="space-y-2"></CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Orders;
