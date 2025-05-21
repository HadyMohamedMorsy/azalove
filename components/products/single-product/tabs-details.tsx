"use client";
import { Tab, Tabs } from "@heroui/tabs";

export default function TabsDetails() {
  return (
    <Tabs aria-label="Options" className="w-full justify-center">
      <Tab key="description" title="وصف">
        <p className="text-sm text-[#4b4b4b] font-web leading-8">
          نهدف إلى عرض معلومات دقيقة عن المنتج لكم. يقدم المصنعون والموردون
          وغيرهم ما ترونه هنا، ولم نتحقق منه. اطلعوا على إخلاء المسؤولية. الكتاب
          رقم 1 الأكثر مبيعًا في نيويورك تايمز اختيار ريس ويذرسبون ونادي هالو صن
          شاين للكتاب "لا أستطيع التعبير عن مدى حبي لهذا الكتاب! لم أكن أريد
          لهذه القصة أن تنتهي!" - ريس ويذرسبون "جميل بشكل مؤلم." - مراجعة كتب
          نيويورك تايمز "مثالي لعشاق باربرا كينغسولفر." - باستل لسنوات، طاردت
          شائعات "فتاة المستنقع" خليج باركلي، وهي بلدة هادئة على ساحل ولاية
          كارولينا الشمالية. لذلك في أواخر عام ١٩٦٩، عندما عُثر على تشيس أندروز
          الوسيم ميتًا، اشتبه السكان المحليون على الفور في كيا كلارك، المعروفة
          بفتاة المستنقع. لكن كيا ليست كما يقولون. حساسة وذكية، عاشت لسنوات
          وحيدة في المستنقع الذي تعتبره موطنها، تجد أصدقاءً في طيور النورس
          ودروسًا في الرمال. ثم يأتي الوقت الذي تتوق فيه كيا إلى أن تُلمس وتُحب.
          عندما يُفتَن شابان من المدينة بجمالها الجامح، تنفتح كيا على حياة جديدة
          - حتى يحدث ما لا يُصدّق. تُعدّ أغنية "حيث تُغني جراد البحر" مثاليةً
          لعشاق باربرا كينغسولفر وكارين راسل، فهي في آنٍ واحد قصيدةٌ رائعةٌ
          للعالم الطبيعي، وقصةٌ مُفجعةٌ عن بلوغ سن الرشد، وحكايةٌ مُفاجئةٌ عن
          جريمة قتلٍ مُحتملة. تُذكّرنا أوينز بأننا نُشكّل إلى الأبد من خلال
          الأطفال الذين كناهم يومًا ما، وأننا جميعًا عُرضةٌ للأسرار الجميلة
          والعنيفة التي تُخفيها الطبيعة. ألبوم "حيث تُغني جراد البحر"
        </p>
      </Tab>
      <Tab key="Product-details" title="تفاصيل المنتج">
        <ul className="flex flex-col gap-4 md:w-1/2 w-full md:mx-auto">
          <li className="flex justify-between">
            <span className="font-bold">رمز التخزين التعريفي :</span>
            <span> N/A</span>
          </li>
          <li className="flex justify-between">
            <span className="font-bold">فئة :</span>
            <span className="text-red-400"> Thriller & Suspense</span>
          </li>
          <li className="flex justify-between">
            <span className="font-bold">مؤلف الكتاب :</span>
            <span className="text-red-400"> Anna Banks :</span>
          </li>
          <li className="flex justify-between">
            <span className="font-bold">تنسيق الكتاب :</span>
            <span className="text-gray-400">غلاف فني, أضرم, أشرطة الفيديو</span>
          </li>
        </ul>
      </Tab>
      <Tab key="Reviews" title="التعليقات (2)"></Tab>
    </Tabs>
  );
}
