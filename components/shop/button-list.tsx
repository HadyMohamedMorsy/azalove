import { faList, faTableList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";

export default function ButtonList() {
  return (
    <div className="flex gap-4 items-center">
      <Tooltip content="List">
        <Button isIconOnly variant="bordered">
          <FontAwesomeIcon icon={faList} />
        </Button>
      </Tooltip>
      <Tooltip content="grid">
        <Button isIconOnly variant="bordered">
          <FontAwesomeIcon icon={faTableList} />
        </Button>
      </Tooltip>
    </div>
  );
}
