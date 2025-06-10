import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { faList, faTableList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ButtonList() {
  return (
    <div className="flex gap-4 items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
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
            <Button variant="outline" size="icon">
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
