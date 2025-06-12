"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Contact() {
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});

  const onSubmit = (e: any) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (data.terms !== "true") {
      setErrors({ terms: "Please accept the terms" });
      return;
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
        <div className="grid md:grid-cols-2 grid-cols-1">
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
              onReset={() => setSubmitted(null)}
              onSubmit={onSubmit}
            >
              <div className="flex flex-col gap-4 md:w-[600px] w-full">
                <div className="grid md:grid-cols-2 md:gap-3 grid-cols-1">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم</Label>
                    <Input
                      required
                      id="name"
                      name="name"
                      placeholder="اكتب الاسم"
                      className="font-web"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الالكتروني</Label>
                    <Input
                      required
                      id="email"
                      name="email"
                      placeholder="البريد الالكتروني"
                      type="email"
                      className="font-web"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="subject">الموضوع</Label>
                    <Input
                      required
                      id="subject"
                      name="subject"
                      placeholder="الموضوع"
                      className="font-web"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">الرساله</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="ادخل الرساله"
                      className="w-full font-web"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="w-[150px] mt-5 font-web" type="submit">
                    ارسال
                  </Button>
                </div>
              </div>

              {submitted && (
                <div className="text-sm text-muted-foreground mt-4">
                  Submitted data:{" "}
                  <pre>{JSON.stringify(submitted, null, 2)}</pre>
                </div>
              )}
            </form>
          </div>
          <div className="hidden md:block">
            <Image
              className="rounded-lg"
              src="/media/contact.jpg"
              alt="logo"
              width={640}
              height={427}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
