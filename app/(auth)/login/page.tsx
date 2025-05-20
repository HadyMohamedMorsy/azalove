"use client";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useState } from "react";

function Login() {
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
    <div className="container py-10 px-4">
      <header className="container  px-6 py-4 border-t border-b border-[#eae8e4]">
        <Breadcrumbs>
          <BreadcrumbItem>الرئيسيه</BreadcrumbItem>
          <BreadcrumbItem>تسجيل الدخول</BreadcrumbItem>
        </Breadcrumbs>
      </header>
      <section className="mt-8">
        <Form
          className="md:w-[650px] md:mx-auto w-full bg-white shadow-custom-2  py-8 px-4"
          validationErrors={errors}
          onReset={() => setSubmitted(null)}
          onSubmit={onSubmit}
        >
          <h3 className="mb-5 font-web font-bold text-2xl">تسجيل الدخول</h3>
          <div className="flex flex-col gap-4 md:w-[600px] w-full">
            <div className="grid gap-8 grid-cols-1">
              <Input
                isRequired
                label="اسم المستخدم أو عنوان البريد الإلكتروني*"
                labelPlacement="outside"
                name="name"
                placeholder="اسم المستخدم أو عنوان البريد الإلكتروني*"
                className="font-web"
              />
              <Input
                isRequired
                label="كلمة المرور"
                labelPlacement="outside"
                name="كلمة المرور"
                placeholder="كلمة المرور"
                type="password"
              />
            </div>

            <div className="flex justify-between items-center">
              <Checkbox
                isRequired
                name="terms"
                validationBehavior="aria"
                value="true"
              >
                تذكرنى
              </Checkbox>
              <a className="text-sm text-red-400" href="#">
                هل فقدت كلمة المرور الخاصة بك؟
              </a>
            </div>
            <div className="border-b border-[#eae8e4] py-2"></div>
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
              Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
            </div>
          )}
        </Form>
      </section>
    </div>
  );
}
export default Login;
