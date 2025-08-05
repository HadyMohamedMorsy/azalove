"use client";
import { BrandSVG } from "@/components/ui/brand-svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { API_BASE_URL } from "@/config/api";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useState } from "react";

function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/contact/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      const result = await response.json();

      // Show success toast
      toast({
        title: "تم إرسال الرسالة بنجاح!",
        description: result.message || "سنتواصل معك قريباً.",
      });

      // Reset form
      e.target.reset();
    } catch (error: any) {
      // Show error toast
      toast({
        title: "خطأ في إرسال الرسالة",
        description:
          error.message || "حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="container px-6 py-4 border-t border-b border-[#eae8e4]">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                الرئيسيه
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              <span className="text-gray-700">تواصل معنا</span>
            </li>
          </ol>
        </nav>
      </header>
      <section className="container py-10 px-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          <div className="contact">
            <div className="mb-6">
              <h3 className="text-4xl mb-4 font-web">معلومات الاتصال</h3>
              <p className="font-web md:max-w-[75%] w-full">
                سنقوم بالرد على أي أسئلة قد تكون لديكم بخصوص مبيعاتنا عبر
                الإنترنت، أو حقوقنا، أو خدمات الشراكة هنا.
              </p>
            </div>
            <form
              className="w-full"
              onReset={() => {}} // Removed setSubmitted(null)
              onSubmit={onSubmit}
            >
              <div className="flex flex-col gap-4 md:w-[600px] w-full">
                <div className="grid md:grid-cols-2 md:gap-3 grid-cols-1">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-royal-900 font-medium"
                    >
                      الاسم
                    </Label>
                    <Input
                      required
                      id="name"
                      name="name"
                      placeholder="اكتب الاسم"
                      className="font-web border-2 border-cream-200 bg-cream-50 text-royal-900 placeholder:text-royal-500 focus:border-azalove-500 focus:ring-2 focus:ring-azalove-200 focus:bg-white transition-all duration-300 hover:border-azalove-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-royal-900 font-medium"
                    >
                      البريد الالكتروني
                    </Label>
                    <Input
                      required
                      id="email"
                      name="email"
                      placeholder="البريد الالكتروني"
                      type="email"
                      className="font-web border-2 border-cream-200 bg-cream-50 text-royal-900 placeholder:text-royal-500 focus:border-azalove-500 focus:ring-2 focus:ring-azalove-200 focus:bg-white transition-all duration-300 hover:border-azalove-300"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-3 grid-cols-1">
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-royal-900 font-medium"
                    >
                      رقم الهاتف
                    </Label>
                    <Input
                      required
                      id="phone"
                      name="phone"
                      placeholder="رقم الهاتف"
                      type="tel"
                      className="font-web border-2 border-cream-200 bg-cream-50 text-royal-900 placeholder:text-royal-500 focus:border-azalove-500 focus:ring-2 focus:ring-azalove-200 focus:bg-white transition-all duration-300 hover:border-azalove-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-royal-900 font-medium"
                    >
                      الموضوع
                    </Label>
                    <Input
                      required
                      id="subject"
                      name="subject"
                      placeholder="الموضوع"
                      className="font-web border-2 border-cream-200 bg-cream-50 text-royal-900 placeholder:text-royal-500 focus:border-azalove-500 focus:ring-2 focus:ring-azalove-200 focus:bg-white transition-all duration-300 hover:border-azalove-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-royal-900 font-medium"
                    >
                      الرساله
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="ادخل الرساله"
                      className="w-full font-web min-h-[120px] border-2 border-cream-200 bg-cream-50 text-royal-900 placeholder:text-royal-500 focus:border-azalove-500 focus:ring-2 focus:ring-azalove-200 focus:bg-white transition-all duration-300 hover:border-azalove-300 resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    className="w-[150px] mt-5 font-web bg-royal-500 hover:bg-azalove-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-azalove-500 hover:border-azalove-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "جاري الارسال..." : "ارسال"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center">
            {/* Large Brand SVG for Contact Identity */}
            <div className="relative">
              <BrandSVG
                svgName="artboard-45"
                size="2xl"
                animate={true}
                className="mx-auto"
              />
              {/* Decorative elements around the SVG */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-amaranth-100 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-royal-100 rounded-full opacity-50 animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-cream-200 rounded-full opacity-40 animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
