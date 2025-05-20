// components/Logo.jsx
import Image from "next/image";

const Logo = () => {
  const logoProps = {
    src: "https://readymadeui.com/readymadeui-short.svg",
    className: "w-8",
  };
  return (
    <a href="#">
      <Image {...logoProps} alt="logo" width={134} height={40} />
    </a>
  );
};

export default Logo;
