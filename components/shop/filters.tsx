import { Accordion, AccordionItem } from "@heroui/accordion";
import { Slider } from "@heroui/slider";
import Image from "next/image";
const accordionSections = [
  {
    id: "section-1",
    items: [
      {
        value: "first-item",
        title: "الفئات",
        lists: Array(10).fill({
          name: "الفئة الأولى",
          count: 1,
        }),
      },
    ],
  },
  {
    id: "section-2",
    items: [
      {
        value: "second-item",
        title: "المؤلفين",
        lists: Array(10).fill({
          name: "الفئة الثانية",
          count: 2,
        }),
      },
    ],
  },
];

const FiltersProducts = () => {
  return (
    <>
      <div className="space-y-4">
        {accordionSections.map((section) => (
          <div
            key={section.id}
            className="px-2 caategory-box border border-[#eae8e4]"
          >
            <Accordion>
              {section.items.map((item) => (
                <AccordionItem
                  key={item.value}
                  aria-label={item.title}
                  title={item.title}
                >
                  <ul className="m-0 p-0 flex flex-col gap-4">
                    {item.lists.map((list, index) => (
                      <li
                        key={`${item.value}-${index}`}
                        className="flex justify-between items-center"
                      >
                        <a href="#">{list.name}</a>
                        <span className="count">({list.count})</span>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
        <div className="px-2 caategory-box border border-[#eae8e4]">
          <Accordion>
            <AccordionItem
              key="1"
              aria-label="تصفية حسب السعر"
              title="تصفية حسب السعر"
            >
              <Slider
                className="max-w-md"
                defaultValue={[100, 500]}
                formatOptions={{ style: "currency", currency: "USD" }}
                label="نطاق السعر"
                maxValue={1000}
                minValue={0}
                step={50}
              />
            </AccordionItem>
          </Accordion>
        </div>
        <div className="px-2 caategory-box border border-[#eae8e4]">
          <Accordion>
            <AccordionItem key="1" aria-label="كتب مميزة" title="كتب مميزة">
              <div className="flex gap-3 py-2">
                <Image
                  src="/media/10-150x200.jpg"
                  className="object-contain"
                  alt="azalove"
                  width={90}
                  height={60}
                />
                <div className="flex flex-col gap-3">
                  <h3 className="font-web text-sm">
                    الجانب الأعمى (مايكل بينيت الكتاب 12)
                  </h3>
                  <span className="font-bold">جنيه 15.99</span>
                </div>
              </div>
              <div className="flex gap-3 py-2">
                <Image
                  src="/media/10-150x200.jpg"
                  className="object-contain"
                  alt="azalove"
                  width={90}
                  height={60}
                />
                <div className="flex flex-col gap-3">
                  <h3 className="font-web text-sm">
                    الجانب الأعمى (مايكل بينيت الكتاب 12)
                  </h3>
                  <span className="font-bold">جنيه 15.99</span>
                </div>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default FiltersProducts;
