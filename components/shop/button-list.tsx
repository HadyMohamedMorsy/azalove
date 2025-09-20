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
    <div className="flex gap-2 items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => onViewModeChange("list")}
              className={
                viewMode === "list"
                  ? "bg-amaranth-500 hover:bg-amaranth-600 text-white border-amaranth-500"
                  : "text-amaranth-600 border-amaranth-200 hover:bg-amaranth-50 hover:text-amaranth-700"
              }
            >
              <FontAwesomeIcon icon={faList} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>عرض القائمة</p>
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
              className={
                viewMode === "grid"
                  ? "bg-amaranth-900 hover:bg-royal-900 text-white border-amaranth-500"
                  : "text-amaranth-900 border-amaranth-200 hover:bg-amaranth-50 hover:text-amaranth-700"
              }
            >
              <FontAwesomeIcon icon={faTableList} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>عرض الشبكة</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
