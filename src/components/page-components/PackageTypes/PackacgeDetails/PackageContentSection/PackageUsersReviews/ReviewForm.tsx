"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { createPackageReview } from "@/services/PagesData/packageReviewsServices";
import toast from "react-hot-toast";

interface ReviewFormProps {
  packageId: string;
}

interface FormValues {
  authorName: string;
  content: string;
  rate: number;
}

interface FormErrors {
  authorName?: string;
  content?: string;
  rate?: string;
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.authorName.trim()) errors.authorName = "يرجى إدخال الاسم";
  if (!values.content.trim()) errors.content = "يرجى إدخال نص التقييم";
  if (values.rate < 1) errors.rate = "يرجى اختيار التقييم";
  return errors;
}

const initialValues: FormValues = {
  authorName: "",
  content: "",
  rate: 5,
};

export default function ReviewForm({ packageId }: ReviewFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate({ ...values, [name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched: Partial<Record<keyof FormValues, boolean>> = {
      authorName: true,
      content: true,
      rate: true,
    };
    setTouched(allTouched);

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      await createPackageReview({ ...values, package: packageId });
      toast.success("تم إضافة تقييمك بنجاح");
      setValues(initialValues);
      setTouched({});
      setErrors({});
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("حدث خطأ ما");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-3xl shadow-lg border border-gray-100 p-6 mt-6">
      <h2 className="text-xl font-bold text-primary mb-6">أضف تقييمك</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Author Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الاسم
          </label>
          <input
            type="text"
            name="authorName"
            value={values.authorName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 rounded-xl border ${
              touched.authorName && errors.authorName
                ? "border-red-500"
                : "border-gray-200"
            } focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
            placeholder="أدخل اسمك"
          />
          {touched.authorName && errors.authorName && (
            <p className="text-red-500 text-xs mt-1">{errors.authorName}</p>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            التقييم
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setValues((prev) => ({ ...prev, rate: star }))}
                className="focus:outline-none"
              >
                <FaStar
                  className={`w-6 h-6 transition-colors ${
                    star <= values.rate ? "text-yellow-400" : "text-gray-200"
                  }`}
                />
              </button>
            ))}
          </div>
          {touched.rate && errors.rate && (
            <p className="text-red-500 text-xs mt-1">{errors.rate}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            تعليقك
          </label>
          <textarea
            name="content"
            rows={4}
            value={values.content}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 rounded-xl border ${
              touched.content && errors.content
                ? "border-red-500"
                : "border-gray-200"
            } focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none`}
            placeholder="اكتب رأيك في الباقة..."
          />
          {touched.content && errors.content && (
            <p className="text-red-500 text-xs mt-1">{errors.content}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {loading ? "جاري الإرسال..." : "إرسال التقييم"}
        </button>
      </form>
    </div>
  );
}
