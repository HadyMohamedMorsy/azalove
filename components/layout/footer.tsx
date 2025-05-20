import { Logo } from "@/components/ui/icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className="border-t border-b border-[#eae8e4] py-[50px]">
        <div className="container px-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
            <div>
              <Logo />
              <p className="mt-3 text-sm font-web">
                1418 ريفر درايف، جناح 35، كوتونهول، كاليفورنيا 9622، الولايات
                المتحدة
              </p>
              <div className="flex flex-col my-6">
                <a className="text-sm"> sale@azalove.com</a>
                <a className="text-sm"> +20 12 71333867</a>
              </div>
              <div className="flex gap-6">
                <a>
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a>
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a>
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4 font-web"> خدمة العملاء</h3>
              <ul className="flex flex-col gap-3 text-gray-600">
                <li>
                  <a> مركز المساعدة</a>
                </li>
                <li>
                  <a> اتصل بنا</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4 font-web"> سياسة</h3>
              <ul className="flex flex-col gap-3 text-gray-600">
                <li>
                  <a> سياسة العائدات</a>
                </li>
                <li>
                  <a> شروط الاستخدام</a>
                </li>
                <li>
                  <a> خصوصية</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4 font-web"> فئات</h3>
              <ul className="flex flex-col gap-3 text-gray-600">
                <li>
                  <a> فعل</a>
                </li>
                <li>
                  <a> كوميديا</a>
                </li>
                <li>
                  <a> دراما</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className="py-[20px]">
        <div className="container  flex justify-between">
          <span className="text-sm"> ©2025 Azalove. All rights reserved</span>
          <Image
            alt="azalove"
            height={32}
            src="/media/credit-cards.png"
            width={328}
          />
        </div>
      </div>
    </>
  );
};

export default Footer;
