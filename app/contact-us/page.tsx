"use client";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import Image from "next/image";
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
      <header className="container  px-6 py-4 border-t border-b border-[#eae8e4]">
        <Breadcrumbs>
          <BreadcrumbItem>الرئيسيه</BreadcrumbItem>
          <BreadcrumbItem>تواصل معنا</BreadcrumbItem>
        </Breadcrumbs>
      </header>
      <section className="container py-10 px-4">
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div className="contact">
            <div className="mb-6">
              <h3 className="text-4xl mb-4 font-web"> معلومات الاتصال</h3>
              <p className="font-web md:max-w-[75%] w-full">
                سنقوم بالرد على أي أسئلة قد تكون لديكم بخصوص مبيعاتنا عبر
                الإنترنت، أو حقوقنا، أو خدمات الشراكة هنا.
              </p>
            </div>
            <Form
              className="w-full"
              validationErrors={errors}
              onReset={() => setSubmitted(null)}
              onSubmit={onSubmit}
            >
              <div className="flex flex-col gap-4 md:w-[600px] w-full">
                <div className="grid md:grid-cols-2 md:gap-3 grid-cols-1">
                  <Input
                    isRequired
                    label="الاسم"
                    labelPlacement="outside"
                    name="name"
                    placeholder="اكتب الاسم"
                    className="font-web"
                  />

                  <Input
                    isRequired
                    errorMessage={({ validationDetails }) => {
                      if (validationDetails.valueMissing) {
                        return "Please enter your email";
                      }
                      if (validationDetails.typeMismatch) {
                        return "Please enter a valid email address";
                      }
                    }}
                    label="البريد الالكتروني"
                    labelPlacement="outside"
                    name="email"
                    placeholder="البريد الالكتروني"
                    type="email"
                    className="font-web"
                  />
                </div>
                <div className="grid grid-cols-1 gap-5">
                  <Input
                    isRequired
                    label="الموضوع"
                    labelPlacement="outside"
                    name="name"
                    placeholder="الموضوع"
                    className="font-web"
                  />

                  <Textarea
                    className="w-full font-web"
                    label="الرساله"
                    placeholder="ادخل الرساله"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    className="w-[150px] mt-5 font-web"
                    color="primary"
                    type="submit"
                  >
                    ارسال
                  </Button>
                </div>
              </div>

              {submitted && (
                <div className="text-small text-default-500 mt-4">
                  Submitted data:{" "}
                  <pre>{JSON.stringify(submitted, null, 2)}</pre>
                </div>
              )}
            </Form>
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
