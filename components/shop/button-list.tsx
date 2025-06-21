import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { faList, faTableList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonListProps {
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
}

export default function ButtonList({
  viewMode,
  onViewModeChange,
}: ButtonListProps) {
  return (
    <div className="flex gap-4 items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => onViewModeChange("list")}
            >
              <FontAwesomeIcon icon={faList} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>List</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => onViewModeChange("grid")}
            >
              <FontAwesomeIcon icon={faTableList} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Grid</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
