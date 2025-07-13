"use client";

/* ==========================================================================*/
// login.tsx — Login form component
/* ==========================================================================*/
// Purpose: Renders login form with email/password and Google OAuth
// Sections: Imports, Animation Variants, Props, Component, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React, { useState, useRef, useEffect } from "react";

// Next.js Core ---
import { redirect } from "next/navigation";

// External Packages ---
import { cn } from "@/lib/utils";
import { motion, easeInOut, AnimatePresence } from "motion/react";
import { Info, Check, AlertTriangle } from "lucide-react";

// Local Components ---
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { TextEffect } from "@workspace/ui/components/text-effect";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@workspace/ui/components/input-otp";

// Local Actions ---
import { sendOtpCode, verifyOtpCode } from "@/actions/auth";

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
    <div className="flex items-center gap-2 h-6">
      <Label htmlFor={htmlFor}>{children}</Label>
      {error && (
        <div className="ml-2 flex items-center gap-1 text-red-600 dark:text-red-400">
          <Info className="w-3 h-3 flex-shrink-0" />
          <span className="text-xs truncate max-w-[150px]" title={error}>
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

const HOVER_ANIMATION_PROPS = {
  whileHover: { scale: 1.01 },
  whileTap: { scale: 0.99 },
  transition: { duration: 0.1, ease: easeInOut },
};

const FORM_CONTAINER_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    duration: 0.4,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const OTP_CONTAINER_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0,
    },
  },
};

const FIELD_ENTRANCE_VARIANTS = {
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
      duration: 0.6,
      ease: easeInOut,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(4px)",
    transition: {
      duration: 0.2,
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

const SHAKE_VARIANTS = {
  shake: {
    x: [-10, 10, -10, 10, -5, 5, 0],
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  },
};

/* ==========================================================================*/
// Props Interface
/* ==========================================================================*/

interface LoginFormProps extends React.ComponentProps<"form"> {
  errors?: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  isPending?: boolean;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * LoginForm
 *
 * Multi-step login form that starts with email, then animates in password field.
 * Features responsive error handling with inline error display.
 */
function LoginForm({ className, errors, isPending, ...props }: LoginFormProps) {
  const otpInputRef = useRef<HTMLInputElement>(null);
  const [currentStep, setCurrentStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [hasOtpError, setHasOtpError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Focus OTP input on error
  useEffect(() => {
    if (hasOtpError && otpInputRef.current) {
      // Wait for shake animation to complete before focusing
      setTimeout(() => {
        otpInputRef.current?.focus();
      }, 500);
    }
  }, [hasOtpError]);

  // Auto-focus OTP input when step changes to OTP
  const handleOtpAnimationComplete = () => {
    if (currentStep === "otp" && otpInputRef.current) {
      // Small delay to ensure DOM is fully ready
      setTimeout(() => {
        otpInputRef.current?.focus();
      }, 100);
    }
  };

  const handleContinue = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentStep === "email" && email.trim()) {
      setIsLoading(true);
      setFormError(null);
      setHasEmailError(false);
      setEmailErrorMessage(null);

      try {
        // Create FormData for server action
        const formData = new FormData();
        formData.append("email", email);

        // Send OTP code
        const result = await sendOtpCode(formData);

        // Handle error response
        if (result && !result.success) {
          setHasEmailError(true);
          setEmailErrorMessage(result.error || "Please try again!");
        } else if (result && result.success) {
          // If successful, move to OTP step
          setCurrentStep("otp");
        }
      } catch (error) {
        console.error("Failed to send OTP:", error);
        setHasEmailError(true);
        setEmailErrorMessage("Please try again!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentStep === "otp" && isOtpComplete) {
      setIsLoading(true);
      setFormError(null);
      setHasOtpError(false);

      try {
        // Create FormData for server action
        const formData = new FormData();
        formData.append("email", email);
        formData.append("token", otpValue);

        // Verify OTP code
        const result = await verifyOtpCode(formData);

        // Handle error response
        if (result && !result.success) {
          setHasOtpError(true);
          setOtpValue(""); // Clear the OTP input
          // Error message will be shown in the UI
        } else if (result && result.success) {
          // Handle success response
          setIsSuccess(true);

          // Wait for success animation, then redirect
          setTimeout(() => {
            redirect("/ai");
          }, 1500);
        }
      } catch (error) {
        console.error("Failed to verify OTP:", error);
        setHasOtpError(true);
        setOtpValue(""); // Clear the OTP input
      } finally {
        if (!isSuccess) {
          setIsLoading(false);
        }
      }
    }
  };

  const isOtpComplete = otpValue.length === 6;
  const isFormLoading = (isLoading || isPending) && !isSuccess;

  return (
    <div className="w-full">
      <form className={cn("flex flex-col", className)} onSubmit={currentStep === "email" ? handleContinue : handleSubmit} noValidate>
        {/* Global Form Error --- */}
        {errors?._form && (
          <motion.div initial="hidden" animate="visible" exit="exit" variants={ERROR_VARIANTS} className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mb-6">
            <div className="text-sm text-red-600 dark:text-red-400">
              {errors._form.map((error: string, index: number) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          </motion.div>
        )}

        {/* Form Error --- */}
        {formError && (
          <motion.div initial="hidden" animate="visible" exit="exit" variants={ERROR_VARIANTS} className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mb-6">
            <div className="text-sm text-red-600 dark:text-red-400">{formError}</div>
          </motion.div>
        )}

        {/* Header Section --- */}
        <motion.div initial="hidden" animate="visible" variants={FORM_CONTAINER_VARIANTS}>
          <div className="flex flex-col items-center text-center mb-12">
            <TextEffect as="h1" per="char" preset="fade" delay={1.8} speedReveal={0.8} className="text-2xl font-medium font-mono">
              Let&apos;s get to work.
            </TextEffect>
          </div>

          {/* Invite Only Alert --- */}
          <motion.div 
            className="p-4 border border-border rounded-lg mb-8 text-center"
            variants={FIELD_ENTRANCE_VARIANTS}
          >
            <div className="flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Currently invite only.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Form Fields Container --- */}
        <div className="h-[300px]">
          <AnimatePresence mode="wait">
            {currentStep === "email" ? (
              <motion.div key="email-form" initial="hidden" animate="visible" exit="exit" variants={FORM_CONTAINER_VARIANTS} style={{ transformOrigin: "top" }}>
                {/* Email Field --- */}
                <motion.div
                  className="space-y-2 mb-4 md:mb-4"
                  variants={FIELD_ENTRANCE_VARIANTS}
                  animate={hasEmailError ? SHAKE_VARIANTS.shake : {}}
                  onAnimationComplete={() => {
                    if (hasEmailError) {
                      // Delay clearing the error state to ensure animation completes
                      setTimeout(() => {
                        setHasEmailError(false);
                        setEmailErrorMessage(null);
                      }, 100);
                    }
                  }}
                >
                  <LabelWithError htmlFor="email" error={hasEmailError ? emailErrorMessage || undefined : errors?.email?.[0]}>
                    Email
                  </LabelWithError>
                  <Input id="email" name="email" type="email" placeholder="chris@useastral.dev" value={email} onChange={(e) => setEmail(e.target.value)} 
                    // disabled={isFormLoading} 
                    disabled={true} 
                    className="transition-all duration-200 focus-visible:ring-0 !text-sm opacity-60" required />
                </motion.div>

                {/* Continue Button --- */}
                <motion.div className="mb-6" variants={FIELD_ENTRANCE_VARIANTS}>
                  <motion.div {...(!(isFormLoading || (currentStep === "email" && !email.trim())) ? HOVER_ANIMATION_PROPS : {})}>
                    <Button type="submit" className="w-full" 
                      // disabled={isFormLoading || (currentStep === "email" && !email.trim())}
                      disabled={true}
                    >
                      {/* {isFormLoading ? "Sending Code..." : "Continue"} */}
                      Continue
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Divider --- */}
                <motion.div className="mb-6" variants={FIELD_ENTRANCE_VARIANTS}>
                  <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-10 px-2">or continue with</span>
                  </div>
                </motion.div>

                {/* Google OAuth Button --- */}
                <motion.div className="mb-4" variants={FIELD_ENTRANCE_VARIANTS}>
                  <motion.div {...HOVER_ANIMATION_PROPS}>
                    <Button variant="outline" type="button" className="w-full" disabled={true}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor" />
                      </svg>
                      Google
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div key="otp-form" initial="hidden" animate="visible" variants={OTP_CONTAINER_VARIANTS} style={{ transformOrigin: "top" }} className="space-y-6">
                <motion.div variants={FIELD_ENTRANCE_VARIANTS} className="text-center">
                  <p className={`text-sm ${hasOtpError ? "text-red-600 dark:text-red-400" : "text-muted-foreground"}`}>
                    {hasOtpError ? (
                      "Incorrect Code. Please try again"
                    ) : (
                      <>
                        We sent a code to <span className="font-medium text-foreground">{email}</span>
                      </>
                    )}
                  </p>
                </motion.div>

                <motion.div
                  className="flex justify-center"
                  variants={FIELD_ENTRANCE_VARIANTS}
                  animate={hasOtpError ? SHAKE_VARIANTS.shake : {}}
                  onAnimationComplete={() => {
                    if (hasOtpError) {
                      // Delay clearing the error state to ensure animation completes
                      setTimeout(() => setHasOtpError(false), 100);
                    } else {
                      // Handle focus after entrance animation completes
                      handleOtpAnimationComplete();
                    }
                  }}
                >
                  <InputOTP ref={otpInputRef} maxLength={6} value={otpValue} onChange={setOtpValue} 
                    // disabled={isFormLoading || isSuccess} 
                    disabled={true} 
                    className="focus-visible:ring-0 focus-visible:ring-offset-0">
                    <InputOTPGroup className="flex items-center justify-center focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:ring-0 focus-within:ring-offset-0">
                      <InputOTPSlot index={0} className="h-12 focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:ring-0 focus-within:ring-offset-0" />
                    </InputOTPGroup>
                    <InputOTPGroup className="flex items-center justify-center focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:ring-0 focus-within:ring-offset-0">
                      <InputOTPSlot index={1} className="h-12 focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:ring-0 focus-within:ring-offset-0" />
                    </InputOTPGroup>
                    <InputOTPGroup className="flex items-center justify-center focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:ring-0 focus-within:ring-offset-0">
                      <InputOTPSlot index={2} className="h-12 focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:ring-0 focus-within:ring-offset-0" />
                    </InputOTPGroup>
                    <InputOTPGroup className="flex items-center justify-center focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:ring-0 focus-within:ring-offset-0">
                      <InputOTPSlot index={3} className="h-12 focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:ring-0 focus-within:ring-offset-0" />
                    </InputOTPGroup>
                    <InputOTPGroup className="flex items-center justify-center focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:ring-0 focus-within:ring-offset-0">
                      <InputOTPSlot index={4} className="h-12 focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:ring-0 focus-within:ring-offset-0" />
                    </InputOTPGroup>
                    <InputOTPGroup className="flex items-center justify-center focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:ring-0 focus-within:ring-offset-0">
                      <InputOTPSlot index={5} className="h-12 focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:ring-0 focus-within:ring-offset-0" />
                    </InputOTPGroup>
                  </InputOTP>
                </motion.div>

                <motion.div variants={FIELD_ENTRANCE_VARIANTS}>
                  <motion.div {...(!(isFormLoading || !isOtpComplete) ? HOVER_ANIMATION_PROPS : {})}>
                    <Button type="submit" className="w-full" 
                      // disabled={isFormLoading || !isOtpComplete || isSuccess}
                      disabled={true}
                    >
                      <AnimatePresence mode="wait">
                        {isSuccess ? (
                          <motion.span key="success" className="flex items-center gap-2" initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
                            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}>
                              Success
                            </motion.span>
                            <motion.div initial={{ scale: 0, opacity: 0, rotate: -180 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1], type: "spring", stiffness: 300, damping: 20 }}>
                              <Check className="h-4 w-4 text-green-500" />
                            </motion.div>
                          </motion.span>
                        ) : (
                          <motion.span key="verify" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}>
                            Verify Code
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>
                </motion.div>

                <input type="hidden" name="email" value={email} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}

/* ==========================================================================*/
// Exports
/* ==========================================================================*/

export { LoginForm };
