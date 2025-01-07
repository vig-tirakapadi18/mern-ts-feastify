import React, { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface ISortOptionDropdownProps {
  onChange: (value: string) => void;
  sortOption: string;
}

const SORT_OPTIONS = [
  {
    label: "Best Match",
    value: "bestMatch",
  },
  {
    label: "Delivery Price",
    value: "deliveryPrice",
  },
  {
    label: "Estimated Delivery Time",
    value: "estimatedDeliveryTime",
  },
];

const SortOptionDropdown: FC<ISortOptionDropdownProps> = ({
  onChange,
  sortOption,
}): React.JSX.Element => {
  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
    SORT_OPTIONS[0].label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button variant="outline" className="w-full">
          Sort By: <span className="text-emerald-500 font-semibold">{selectedSortLabel}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={crypto.randomUUID()}
            className="cursor-pointer"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionDropdown;
