import React, { FC } from "react";
import { IMenuItem } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface IMenuItemProps {
  menuItem: IMenuItem;
}

const MenuItem: FC<IMenuItemProps> = ({ menuItem }): React.JSX.Element => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>

      <CardContent className="font-bold">
        Rs {(menuItem.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  );
};

export default MenuItem;
