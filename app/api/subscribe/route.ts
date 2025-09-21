import { API_BASE_URL } from '@/config/api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // التحقق من صحة البيانات
    if (!email || !email.trim()) {
      return NextResponse.json(
        { message: 'البريد الإلكتروني مطلوب' },
        { status: 400 }
      );
    }

    // التحقق من صحة تنسيق البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { message: 'تنسيق البريد الإلكتروني غير صحيح' },
        { status: 400 }
      );
    }

    // إرسال البيانات إلى الخادم الخارجي
    const response = await fetch(`${API_BASE_URL}/sub/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
      }),
    });

    if (response.ok) {
      return NextResponse.json(
        { message: 'تم الاشتراك بنجاح!' },
        { status: 200 }
      );
    } else {
      const errorData = await response.json();
      console.log(errorData);
      return NextResponse.json(
        { message: errorData.message || 'حدث خطأ أثناء الاشتراك' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Subscription error:", error);
    console.log(error);
    return NextResponse.json(
      { message: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}
