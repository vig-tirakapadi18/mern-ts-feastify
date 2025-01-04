import React, { FC } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const LoadingButton: FC = (): React.JSX.Element => {
  return (
    <Button>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Updating...
    </Button>
  );
};

export default LoadingButton;
