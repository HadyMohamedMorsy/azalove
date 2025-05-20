import { Chip } from "@heroui/chip";
import Image from "next/image";

function BlogSlug() {
  return (
    <>
      <section className="container py-10 px-4">
        <div className="blogs">
          <div className="image-wrapper">
            <Image
              className="object-contain rounded-lg"
              src="/media/cover-bog.jpg"
              alt="logo"
              width={1400}
              height={650}
            />
          </div>
          <div className="rounded-lg md:w-[70%] w-full md:mx-auto content relative z-10 bg-white md:-mt-[150px] mb-8 p-[45px] font-web border-b border-[#eae8e4]">
            <div className="content-blog">
              <span className="text-[#f75454] text-xs uppercase">
                كتب الأطفال والعلوم والرياضيات
              </span>
              <h2 className="font-web product__name  mb-1 line-clamp-2">
                <a href="#" className="hover:text-blue-500">
                  «الأوساخ الأمريكية» تدعو القراء إلى رحلة المهاجرين المكسيكيين
                </a>
              </h2>
              <div className="mt-3 flex items-center text-gray-400 gap-3 mb-4">
                {/* <FontAwesomeIcon icon={faClock} size="xs" /> */}
                <span> August 19, 2020 </span>
              </div>

              <h3 className="font-bold">فائدة الكتب وأثرها في حياتنا</h3>
              <p className="text-gray-600 mt-5 font-web leading-8 mb-4">
                الكتب هي من أقدم وسائل المعرفة والتعلم التي سعى الإنسان من
                خلالها إلى حفظ وترسيخ ثقافاته وأفكاره وتجارب الأجيال السابقة.
                ورغم التطور التكنولوجي الكبير الذي نعيشه في العصر الحديث، إلا أن
                الكتب تظل مصدرًا مهمًا وضروريًا في حياة الإنسان. في هذه المقالة،
                سنتناول فوائد الكتب وأثرها العميق في حياة الأفراد والمجتمعات.
              </p>
              <h3 className="font-bold">1. الكتب مصدر للمعرفة</h3>
              <p className="text-gray-600 mt-5 font-web leading-8 mb-4">
                الكتب هي الحاضنة الأولى للمعرفة التي نقلها البشر عبر العصور. من
                خلالها يمكننا استكشاف العلوم، الفنون، الأدب، التاريخ، والفلسفة،
                وغيرها من المجالات التي تساعد على تنمية الوعي الثقافي والقدرة
                على التفكير النقدي. الكتاب هو وسيلة لتوسيع الأفق وزيادة المعرفة
                في مجالات متعددة، مما يعزز قدرة الشخص على فهم العالم من حوله
                بشكل أعمق وأوسع.
              </p>
              <p className="text-gray-600 mt-5 font-web leading-8 mb-4">
                قراءة الكتب تعمل على تحسين مهارات اللغة سواء كانت اللغة الأم أو
                لغة أجنبية. من خلال قراءة الكتب، يتعرف القارئ على مفردات جديدة
                وتركيبات لغوية متنوعة، مما يعزز من قدرته على التعبير الكتابي
                والشفهي. كما أن الكتب تعزز من مهارات الكتابة حيث يكتسب القارئ
                أساليب الكتابة المختلفة ويطور أسلوبه الخاص.
              </p>
              <p className="text-gray-600 mt-5 font-web leading-8 mb-4">
                القراءة ليست مجرد تمرين للذهن، بل هي وسيلة لتطوير مهارات التفكير
                النقدي والتحليلي. عندما يقرأ الشخص كتابًا، خصوصًا في مواضيع
                معقدة أو تتطلب تفكيرًا عميقًا، يتعلم كيفية تحليل المعلومات،
                تقييم المصادر، وفهم وجهات نظر مختلفة. هذا النوع من التفكير يساعد
                الشخص على اتخاذ قرارات مدروسة وموضوعية في حياته اليومية.
              </p>
              <p className="text-gray-600 mt-5 font-web leading-8 mb-4">
                الكتب، وبالأخص الروايات والقصص، تساعد على تنمية الخيال والإبداع.
                عندما يقرأ الشخص قصة أو رواية، يدخل في عالم موازٍ ويعيش أحداثًا
                وشخصيات مبتكرة، مما يوسع خياله ويساعده على التفكير خارج الصندوق.
                هذا يُعد من العوامل الأساسية التي تساهم في نمو الأفكار المبدعة
                وابتكار الحلول الجديدة في الحياة الشخصية والمهنية.
              </p>
              <p className="text-gray-600 mt-5 font-web leading-8 mb-4">
                لا تقتصر فائدة الكتب على العلم والتثقيف فقط، بل إنها توفر أيضًا
                التسلية والترفيه. العديد من الناس يقرؤون الروايات والقصص
                والمقالات لأغراض التسلية والتمتع بالقصص المثيرة. القراءة كوسيلة
                للتسلية تساعد في تخفيف التوتر والضغوط اليومية، وتوفر للقارئ
                تجربة فريدة في عوالم مختلفة من خلال صفحات الكتب.
              </p>
              <p className="text-gray-600 mt-5 font-web leading-8 mb-4">
                الكتب يمكن أن تساعد في تطوير شخصية القارئ وتوسيع أفقه. عندما
                يقرأ الشخص عن ثقافات مختلفة، تجارب حياتية متنوعة، وقيم مختلفة،
                يصبح أكثر انفتاحًا وتفهمًا للآخرين. الكتب تعمل على تقوية التعاطف
                والقدرة على تقدير تنوع البشر وحياتهم. مما يعزز العلاقات
                الإنسانية ويسهم في بناء مجتمعات أكثر تسامحًا وتعاونًا.
              </p>
            </div>
            <div className="flex gap-5 mt-8">
              <Chip>الفنون</Chip>
              <Chip>كتب</Chip>
              <Chip>أطفال</Chip>
              <Chip>الرومانسية</Chip>
            </div>
          </div>
          <div className="md:w-[70%] w-full md:mx-auto">
            <div className="flex items-center gap-3">
              <span className="font-web font-bold text-lg">شارك مع</span>
              <span className="flex gap-3">
                {/* <FontAwesomeIcon icon={faList} />
                <FontAwesomeIcon icon={faXTwitter} size="xs" /> */}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogSlug;
