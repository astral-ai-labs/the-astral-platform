"use client";

/* ==========================================================================*/
// register.tsx — Register form component
/* ==========================================================================*/
// Purpose: Renders registration form with email/password and Google OAuth
// Sections: Imports, Animation Variants, Props, Component, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React, { useState } from "react";

// External Packages ---
import { cn } from "@/lib/utils";
import { motion, easeInOut, AnimatePresence } from "motion/react";
import { Info, AlertTriangle } from "lucide-react";

// Local Components ---
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { TextEffect } from "@workspace/ui/components/text-effect";

/* ==========================================================================*/
// Components
/* ==========================================================================*/

/**
 * LabelWithError
 *
 * Label component that displays errors inline with a small red info icon and truncated text.
 */
interface LabelWithErrorProps {
  htmlFor: string;
  children: React.ReactNode;
  error?: string;
}

function LabelWithError({ htmlFor, children, error }: LabelWithErrorProps) {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor={htmlFor}>{children}</Label>
      {error && (
        <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
          <Info className="w-3 h-3 flex-shrink-0" />
          <span className="text-xs truncate max-w-[100px]" title={error}>
            {error}
          </span>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================*/
// Animation Variants
/* ==========================================================================*/

const FORM_CONTAINER_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const FORM_SECTION_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: "blur(2px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easeInOut,
    },
  },
};

const PASSWORD_FIELDS_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(6px)",
    height: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    height: "auto",
    transition: {
      duration: 0.8,
      ease: easeInOut,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(4px)",
    height: 0,
    transition: {
      duration: 0.4,
      ease: easeInOut,
    },
  },
};

const PASSWORD_FIELD_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  },
};

const ERROR_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: "blur(2px)",
    height: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    height: "auto",
    transition: {
      duration: 0.4,
      ease: easeInOut,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(2px)",
    height: 0,
    transition: {
      duration: 0.3,
      ease: easeInOut,
    },
  },
};

/* ==========================================================================*/
// Props Interface
/* ==========================================================================*/

interface RegisterFormProps extends React.ComponentProps<"form"> {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    _form?: string[];
  };
  isPending?: boolean;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * RegisterForm
 *
 * Multi-step registration form that starts with email, then animates in password fields.
 * Features responsive error handling with inline error display.
 */
function RegisterForm({ className, errors, isPending, ...props }: RegisterFormProps) {
  const [currentStep, setCurrentStep] = useState<'email' | 'password'>('email');
  const [email, setEmail] = useState('');

  const handleContinue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentStep === 'email' && email.trim()) {
      setCurrentStep('password');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentStep === 'password') {
      // Handle final form submission
      if (props.onSubmit) {
        props.onSubmit(e);
      }
    }
  };

  return (
    <div className="w-full">
      <form className={cn("flex flex-col", className)} onSubmit={currentStep === 'email' ? handleContinue : handleSubmit} noValidate>
        {/* Global Form Error --- */}
        {errors?._form && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={ERROR_VARIANTS}
            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mb-6"
          >
            <div className="text-sm text-red-600 dark:text-red-400">
              {errors._form.map((error: string, index: number) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={FORM_CONTAINER_VARIANTS}
        >
          {/* Header Section --- */}
          <div className="flex flex-col items-center text-center mb-8">
            <TextEffect
              as="h1"
              per="char"
              preset="fade"
              delay={1.2}
              speedReveal={0.8}
              className="text-2xl font-medium font-mono"
            >
              Automate your work.
            </TextEffect>
          </div>

          {/* Invite Only Alert --- */}
          <motion.div 
            className="p-4 border border-border rounded-lg mb-6 text-center"
            variants={FORM_SECTION_VARIANTS}
          >
            <div className="flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Currently invite only
              </p>
            </div>
          </motion.div>

          {/* Form Fields Container --- */}
          <motion.div className="flex flex-col mb-6" variants={FORM_SECTION_VARIANTS}>
            {/* Desktop Form Fields --- */}
            <div className="hidden md:block space-y-4">
              {/* Email Field --- */}
              <div className="space-y-2">
                <LabelWithError htmlFor="email" error={errors?.email?.[0]}>
                  Email
                </LabelWithError>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="m@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={true}
                  className="opacity-60"
                  required 
                />
              </div>

              {/* Password Fields - Animated Entry */}
              <AnimatePresence mode="wait">
                {currentStep === 'password' && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={PASSWORD_FIELDS_VARIANTS}
                    className="overflow-hidden space-y-4"
                  >
                    {/* Password Field --- */}
                    <motion.div className="space-y-2" variants={PASSWORD_FIELD_VARIANTS}>
                      <LabelWithError htmlFor="password" error={errors?.password?.[0]}>
                        Password
                      </LabelWithError>
                      <Input id="password" name="password" type="password" placeholder="Create a strong password" required />
                    </motion.div>

                    {/* Confirm Password Field --- */}
                    <motion.div className="space-y-2" variants={PASSWORD_FIELD_VARIANTS}>
                      <LabelWithError htmlFor="confirmPassword" error={errors?.confirmPassword?.[0]}>
                        Confirm Password
                      </LabelWithError>
                      <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm your password" required />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Desktop Submit Button --- */}
              <div className="pt-2">
                <Button type="submit" className="w-full" disabled={true}>
                  {isPending ? "Creating account..." : currentStep === 'email' ? "Continue" : "Create account"}
                </Button>
              </div>
            </div>

            {/* Mobile Form Fields --- */}
            <div className="block md:hidden">
              <div className="space-y-6">
                {/* Email Field --- */}
                <div className="space-y-2">
                  <LabelWithError htmlFor="email-mobile" error={errors?.email?.[0]}>
                    Email
                  </LabelWithError>
                  <Input 
                    id="email-mobile" 
                    name="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={true}
                    className="opacity-60"
                    required 
                  />
                </div>

                {/* Password Fields - Animated Entry (Mobile) */}
                <AnimatePresence mode="wait">
                  {currentStep === 'password' && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={PASSWORD_FIELDS_VARIANTS}
                      className="overflow-hidden space-y-6"
                    >
                      {/* Password Field --- */}
                      <motion.div className="space-y-2" variants={PASSWORD_FIELD_VARIANTS}>
                        <LabelWithError htmlFor="password-mobile" error={errors?.password?.[0]}>
                          Password
                        </LabelWithError>
                        <Input id="password-mobile" name="password" type="password" placeholder="Create a strong password" required />
                      </motion.div>

                      {/* Confirm Password Field --- */}
                      <motion.div className="space-y-2" variants={PASSWORD_FIELD_VARIANTS}>
                        <LabelWithError htmlFor="confirmPassword-mobile" error={errors?.confirmPassword?.[0]}>
                          Confirm Password
                        </LabelWithError>
                        <Input id="confirmPassword-mobile" name="confirmPassword" type="password" placeholder="Confirm your password" required />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mobile Submit Button --- */}
                <Button type="submit" className="w-full" disabled={true}>
                  {isPending ? "Creating account..." : currentStep === 'email' ? "Continue" : "Create account"}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* OAuth Section --- */}
          <motion.div className="flex flex-col gap-6" variants={FORM_SECTION_VARIANTS}>
            {/* Divider --- */}
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">Or continue with</span>
            </div>

            {/* Google OAuth Button --- */}
            <Button variant="outline" type="button" className="w-full" disabled={true}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor" />
              </svg>
              Sign up with Google
            </Button>

            {/* Footer Links --- */}
            <div className="text-center text-sm">
              Already building with astral?{" "}
              <a href="/login" className="underline underline-offset-4">
                sign in
              </a>
            </div>
          </motion.div>
        </motion.div>
      </form>
    </div>
  );
}

/* ==========================================================================*/
// Exports
/* ==========================================================================*/

export { RegisterForm };
