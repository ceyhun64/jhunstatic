"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ShootingStars } from "@/components/ui/shadcn-io/shooting-stars";
import { GradientText } from "../ui/shadcn-io/gradient-text";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ContactForm {
  firstName: string;
  firstNamePlaceholder: string;
  lastName: string;
  lastNamePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  subject: string;
  subjectPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
}

interface ContactDict {
  title: string;
  description: string;
  infoTitle: string;
  phoneLabel: string;
  emailLabel: string;
  webLabel: string;
  success: string;
  emailError: string;
  error: string;
  form: ContactForm;
}

interface ContactClientProps {
  dict: ContactDict;
  email?: string;
}

const contactSchema = z.object({
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  email: z.string().email(),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(5000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.6 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export default function ContactClient({
  dict,
  email = "jhuntechofficial@gmail.com",
}: ContactClientProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? (resolvedTheme ?? theme) === "dark" : false;

  const starColors = isDark
    ? {
        star1: "#9E00FF",
        trail1: "#2EB9DF",
        star2: "#FF0099",
        trail2: "#FFB800",
        star3: "#00FF9E",
        trail3: "#00B8FF",
      }
    : {
        star1: "#4C1D95",
        trail1: "#164E63",
        star2: "#831843",
        trail2: "#92400E",
        star3: "#064E3B",
        trail3: "#1E3A8A",
      };

  const gradientColor = isDark
    ? "linear-gradient(90deg,#fbbf24 0%,#fef3c7 50%,#fbbf24 100%)"
    : "linear-gradient(90deg,#d97706 0%,#f59e0b 50%,#d97706 100%)";

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: data.subject,
          message: `Ad: ${data.firstname}\nSoyad: ${data.lastname}\nEmail: ${data.email}\nKonu: ${data.subject}\nMesaj: ${data.message}`,
        }),
      });

      const result = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(result.error ?? dict.emailError);

      toast.success(dict.success);
      reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : dict.error;
      toast.error(message);
    }
  };

  const fieldClass =
    "w-full bg-background/50 dark:bg-white/10 border border-input dark:border-white/20 placeholder:text-muted-foreground dark:placeholder:text-white/40 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:focus:shadow-[0_0_15px_#fbbf24] transition-all rounded-lg px-3 py-2 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base";
  const errorClass = "text-xs text-red-500 mt-1";

  return (
    <motion.section
      className="relative py-20 md:py-36 overflow-hidden font-mono bg-linear-to-b from-gray-200 to-gray-200 dark:from-slate-950 dark:to-black px-4 md:px-32 text-foreground"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {mounted && (
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          <ShootingStars
            starColor={starColors.star1}
            trailColor={starColors.trail1}
            minSpeed={15}
            maxSpeed={35}
            minDelay={1200}
            maxDelay={4200}
          />
          <ShootingStars
            starColor={starColors.star2}
            trailColor={starColors.trail2}
            minSpeed={10}
            maxSpeed={25}
            minDelay={2000}
            maxDelay={4000}
          />
          <ShootingStars
            starColor={starColors.star3}
            trailColor={starColors.trail3}
            minSpeed={20}
            maxSpeed={40}
            minDelay={1500}
            maxDelay={3500}
          />
        </div>
      )}

      <motion.div
        className="relative z-10 mx-auto flex flex-col lg:flex-row gap-6 md:gap-12"
        variants={containerVariants}
      >
        {/* Left side */}
        <motion.div
          className="flex flex-col md:gap-10 lg:max-w-sm w-full"
          variants={itemVariants}
        >
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight font-mono mb-3">
              {mounted && (
                <GradientText
                  gradient={gradientColor}
                  text={dict.title}
                  className="inline font-mono drop-shadow-[0_0_15px_rgba(217,119,6,0.7)] dark:drop-shadow-[0_0_15px_rgba(255,220,120,0.7)] hover:drop-shadow-[0_0_30px_rgba(217,119,6,0.9)] dark:hover:drop-shadow-[0_0_30px_rgba(255,200,100,0.9)] transition-all duration-500"
                />
              )}
            </h1>
            <p className="text-muted-foreground text-xs md:text-base leading-relaxed">
              {dict.description}
            </p>
          </div>

          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            className="mt-4 md:mt-8 w-full lg:w-fit mx-auto text-center lg:mx-0 lg:text-left backdrop-blur-md bg-linear-to-br from-slate-200 via-slate-50 to-slate-200 dark:from-white/5 dark:via-white/5 dark:to-white/5 rounded-xl p-6 border border-border dark:border-white/10 shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-500"
          >
            <h2 className="mb-6 text-lg md:text-2xl font-semibold text-black dark:text-amber-400">
              {dict.infoTitle}
            </h2>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-base">
              <li className="text-xs md:text-sm">
                <span className="font-bold">{dict.phoneLabel}: </span>+90 554
                149 6377
              </li>
              <li className="text-xs md:text-sm">
                <span className="font-bold">{dict.emailLabel}: </span>
                <a
                  href={`mailto:${email}`}
                  className="underline hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
                >
                  {email}
                </a>
              </li>
              <li className="text-xs md:text-sm">
                <span className="font-bold">{dict.webLabel}: </span>
                <a
                  href="https://jhun.com.tr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
                >
                  jhun.com.tr
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Right side form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2 md:gap-4 rounded-2xl border border-border dark:border-white/10 p-6 sm:p-8 md:p-14 bg-linear-to-br from-zinc-400 via-zinc-50 to-zinc-400 dark:from-white/5 dark:via-white/5 dark:to-white/5 backdrop-blur-xl shadow-xl dark:shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:shadow-2xl dark:hover:shadow-[0_0_40px_rgba(255,180,0,0.3)] transition-all duration-500"
          variants={itemVariants}
          noValidate
        >
          {/* Name fields */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 grid items-center gap-1.5">
              <Label
                htmlFor="firstname"
                className="text-black dark:text-amber-300 text-xs sm:text-sm md:text-base font-medium"
              >
                {dict.form.firstName}
              </Label>
              <Input
                type="text"
                id="firstname"
                placeholder={dict.form.firstNamePlaceholder}
                className={fieldClass}
                aria-invalid={!!errors.firstname}
                {...register("firstname")}
              />
              {errors.firstname && (
                <p className={errorClass}>{errors.firstname.message}</p>
              )}
            </div>

            <div className="flex-1 grid items-center gap-1.5">
              <Label
                htmlFor="lastname"
                className="text-black dark:text-amber-300 text-xs sm:text-sm md:text-base font-medium"
              >
                {dict.form.lastName}
              </Label>
              <Input
                type="text"
                id="lastname"
                placeholder={dict.form.lastNamePlaceholder}
                className={fieldClass}
                aria-invalid={!!errors.lastname}
                {...register("lastname")}
              />
              {errors.lastname && (
                <p className={errorClass}>{errors.lastname.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="grid gap-1.5 mt-2">
            <Label
              htmlFor="email"
              className="text-black dark:text-amber-300 text-xs sm:text-sm md:text-base font-medium"
            >
              {dict.form.email}
            </Label>
            <Input
              type="email"
              id="email"
              placeholder={dict.form.emailPlaceholder}
              className={fieldClass}
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p className={errorClass}>{errors.email.message}</p>
            )}
          </div>

          {/* Subject */}
          <div className="grid gap-1.5 mt-2">
            <Label
              htmlFor="subject"
              className="text-black dark:text-amber-300 text-xs sm:text-sm md:text-base font-medium"
            >
              {dict.form.subject}
            </Label>
            <Input
              type="text"
              id="subject"
              placeholder={dict.form.subjectPlaceholder}
              className={fieldClass}
              aria-invalid={!!errors.subject}
              {...register("subject")}
            />
            {errors.subject && (
              <p className={errorClass}>{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div className="grid gap-1.5 mt-2">
            <Label
              htmlFor="message"
              className="text-black dark:text-amber-300 text-xs sm:text-sm md:text-base font-medium"
            >
              {dict.form.message}
            </Label>
            <Textarea
              id="message"
              placeholder={dict.form.messagePlaceholder}
              className={`${fieldClass} text-black dark:text-white min-h-35 sm:min-h-40 resize-none`}
              aria-invalid={!!errors.message}
              {...register("message")}
            />
            {errors.message && (
              <p className={errorClass}>{errors.message.message}</p>
            )}
          </div>

          {/* Submit */}
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            className="mt-4"
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full justify-center bg-linear-to-r from-amber-600 via-orange-500 to-yellow-400 hover:from-amber-500 hover:via-orange-400 hover:to-yellow-300 text-white font-semibold shadow-lg hover:shadow-xl dark:shadow-[0_0_20px_rgba(255,200,100,0.6)] transition-all rounded-lg py-3 text-sm sm:text-base disabled:opacity-60"
            >
              {isSubmitting ? dict.form.sending : dict.form.submit}
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.section>
  );
}
