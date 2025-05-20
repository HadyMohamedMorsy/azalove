import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link"; // Import Next.js Link for client-side navigation

const HeaderTitle = ({ title = "", titleRoute = "", route = "#" }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-web text-3xl">{title}</h2>
      <Link
        href={route}
        className="font-web text-xl flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        <span>{titleRoute}</span>
        <FontAwesomeIcon icon={faArrowRight} size="xs" />
      </Link>
    </div>
  );
};

export default HeaderTitle;
