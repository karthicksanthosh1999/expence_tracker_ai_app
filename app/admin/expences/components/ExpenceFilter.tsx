import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { FC } from "react";

type TExpenceFilterProps = {
  modelOpen: boolean;
  modelClose: () => void;
};

const ExpenceFilter: FC<TExpenceFilterProps> = ({ modelClose, modelOpen }) => {
  console.log(modelOpen);
  return (
    <Drawer open={modelOpen} onOpenChange={modelClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ExpenceFilter;
