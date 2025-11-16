"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

type ContactFormData = {
  fname: string;
  lname?: string;
  email: string;
  message: string;
  phoneNumber?: string;
  recaptchaToken?: string; // Optional if using reCAPTCHA
};

function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        reset()
        toast.success("Message sent successfully! 🎉")
      } else {
        const payload = await response.json().catch(() => ({} as unknown));
        const msg = (payload as { error?: string }).error || `Failed to send (status ${response.status}).`;
        toast.error(msg)
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden flex justify-center items-center">
      <div className="card h-auto w-auto px-7 py-10 flex flex-col flex-wrap">
        <h2 className="text-4xl font-bold pb-6 text-center ">
          {"Get in "}
          <span className="dark:text-transparent bg-clip-text bg-gradient-to-r dark:from-[#FFFFFF] dark:to-[#763AF5]">
            touch
          </span>
          ✨
        </h2>
        <form
          action=""
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-between gap-4 flex-col md:flex-row">
            <input
              type="text"
              placeholder="First Name"
              className="contact-styling"
              {...register("fname", { required: "First name is required" })}
            />
            {errors.fname && (
              <p className="mt-1 text-sm text-red-600">
                {errors.fname.message}
              </p>
            )}
            <input
              type="text"
              placeholder="Last Name"
              className="contact-styling"
              {...register("lname")}
            />
          </div>
          <input
            type="text"
            placeholder="Email"
            className="contact-styling"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid Email Address",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
          <input
            type="text"
            placeholder="Phone Number"
            className="contact-styling"
            {...register("phoneNumber")}
          />
          <textarea
            placeholder="Message"
            rows={4}
            className="contact-styling resize-none"
            {...register("message", { required: "Message is required" })}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-[#763AF5] to-[#A604F2] contact-styling text-white text-lg flex justify-center items-center"
          >
            {isSubmitting ? <Spinner /> : "Send Message"}
          </button>
        </form>
      </div>
      <Image
        src={"/projects_highlight.svg"}
        alt="project highlight background"
        width={558}
        height={558}
        className="absolute left-[283px] top-[140px] -translate-x-1/2 -translate-y-1/2 -z-10"
      />
      <Image
        src={"/projects_highlight.svg"}
        alt="project highlight background"
        width={558}
        height={558}
        className="absolute left-[283px] top-[290px] -translate-x-1/2 -translate-y-1/2 -z-10"
      />
      <Image
        src={"/projects_highlight_mobile.svg"}
        alt="project highlight background"
        width={558}
        height={558}
        className="absolute right-[59px] top-[140px] -z-10"
      />
      <Image
        src={"/projects_highlight_mobile.svg"}
        alt="project highlight background"
        width={558}
        height={558}
        className="absolute right-[59px] top-[20px] -z-10"
      />
    </div>
  );
}

export default Page;
