import MetaTagManager from "@/components/meta-tag-manager";
import { Building2, CreditCard, Download, FileCheck, FileText, Receipt } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الوثائق القانونية - أزالوف",
  description:
    "الوثائق القانونية الرسمية لشركة أزالوف - عقد التأسيس، الوثائق الضريبية، السجل التجاري، والبطاقة الضريبية",
  keywords: "الوثائق القانونية, أزالوف, عقد التأسيس, الوثائق الضريبية, السجل التجاري, البطاقة الضريبية",
  openGraph: {
    type: "website",
    title: "الوثائق القانونية - أزالوف",
    description:
      "الوثائق القانونية الرسمية لشركة أزالوف - عقد التأسيس، الوثائق الضريبية، السجل التجاري، والبطاقة الضريبية",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com"}/legal`,
    siteName: "أزالوف",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "الوثائق القانونية - أزالوف",
    description:
      "الوثائق القانونية الرسمية لشركة أزالوف - عقد التأسيس، الوثائق الضريبية، السجل التجاري، والبطاقة الضريبية",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "أزالوف" }],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com"}/legal`,
  },
};

const legalDocuments = [
  {
    id: 1,
    title: "عقد تأسيس شركة أزالوف",
    description: "الوثيقة الرسمية لتأسيس شركة أزالوف والتي تتضمن جميع التفاصيل القانونية والإدارية للشركة",
    filePath: "/media/pdf/عقد تأسيس  شركة ازلوف.pdf",
    icon: Building2,
    category: "التأسيس"
  },
  {
    id: 2,
    title: "وثيقة الضرائب",
    description: "الوثيقة الرسمية للضرائب التي تثبت التزام شركة أزالوف بجميع المتطلبات الضريبية",
    filePath: "/media/pdf/وثيقة الضرائب.pdf",
    icon: Receipt,
    category: "الضرائب"
  },
  {
    id: 3,
    title: "سجل شركة أزالوف",
    description: "السجل التجاري الرسمي لشركة أزالوف والذي يوثق جميع الأنشطة التجارية للشركة",
    filePath: "/media/pdf/سجل شركة ازلوف.pdf",
    icon: FileCheck,
    category: "السجل التجاري"
  },
  {
    id: 4,
    title: "البطاقة الضريبية",
    description: "البطاقة الضريبية الرسمية لشركة أزالوف والتي تثبت التسجيل في النظام الضريبي",
    filePath: "/media/pdf/البطاقة الضريبية.pdf",
    icon: CreditCard,
    category: "الضرائب"
  }
];

export default function LegalPage() {
  return (
    <>
      <MetaTagManager pageType="other" />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              الوثائق القانونية
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              جميع الوثائق القانونية الرسمية لشركة أزالوف متاحة للتحميل والاطلاع
            </p>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {legalDocuments.map((document) => {
              const IconComponent = document.icon;
              return (
                <div
                  key={document.id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-200"
                >
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-pink-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {document.title}
                        </h3>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                          {document.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {document.description}
                      </p>
                      <a
                        href={document.filePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200 font-medium"
                      >
                        <Download className="w-4 h-4 ml-2" />
                        تحميل الوثيقة
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Info Section */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <div className="text-center">
              <FileText className="w-16 h-16 text-pink-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                معلومات إضافية
              </h2>
              <p className="text-gray-600 leading-relaxed">
                جميع الوثائق المعروضة هنا هي وثائق رسمية ومعتمدة من الجهات المختصة. 
                يمكنك تحميل أي وثيقة بالنقر على زر "تحميل الوثيقة" الموجود أسفل كل وثيقة. 
                هذه الوثائق تثبت الشرعية القانونية لشركة أزالوف والتزامها بجميع المتطلبات القانونية والضريبية.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
