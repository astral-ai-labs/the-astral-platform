/* ==========================================================================*/
// page.tsx — Get started page with contact form
/* ==========================================================================*/
// Purpose: Contact form page for potential clients to reach out
// Sections: Imports, Animation Variants, Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React, { useActionState, useState, useEffect } from "react";

// External Packages ---
import { motion, useReducedMotion, easeInOut } from "motion/react";
import { ArrowRightIcon } from "lucide-react";

// Local Components ---
import { TextEffect } from "@workspace/ui/components/text-effect";
import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Button } from "@workspace/ui/components/button";

// Actions ---
import { submitGetStartedForm } from "../../actions/get-started";
import { type FormState } from "../../lib/get-started-schema";

/* ==========================================================================*/
// Animation Variants
/* ==========================================================================*/

const ENTRY_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

const SUCCESS_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

const ERROR_VARIANTS = {
  hidden: {
    opacity: 0,
    y: -10,
    scaleY: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
  },
};

const ANIMATION_TRANSITIONS = {
  form: {
    duration: 0.5,
    delay: 0.4,
    ease: easeInOut,
  },
  content: {
    duration: 0.5,
    delay: 0.6,
    ease: easeInOut,
  },
  hover: {
    duration: 0.15,
    ease: easeInOut,
  },
  success: {
    duration: 0.5,
    delay: 0.2,
    ease: easeInOut,
  },
  error: {
    duration: 0.3,
    ease: easeInOut,
  },
};

const TEXT_EFFECT_CONFIG = {
  title: {
    preset: "fade-in-blur" as const,
    speedReveal: 3,
    segmentTransition: { duration: 0.4, ease: easeInOut },
  },
  success: {
    preset: "fade-in-blur" as const,
    speedReveal: 4,
    segmentTransition: { duration: 0.3, ease: easeInOut },
  },
};

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * GetStartedPage
 *
 * Professional contact form page with animated header and form fields.
 * Features clean typography and refined layout with server-side form handling.
 */
export default function GetStartedPage() {
  const shouldReduceMotion = useReducedMotion();

  // Initialize server action state
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    submitGetStartedForm,
    { success: false }
  );

  // Form persistence state
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    linkedin: "",
    message: "",
  });

  // Update form values on error (retain data) or clear on success
  useEffect(() => {
    if (state.success) {
      // Clear form on success
      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        linkedin: "",
        message: "",
      });
    }
  }, [state.success]);

  // Handle form submission to preserve values
  const handleFormAction = (formData: FormData) => {
    // Preserve form values before submission
    setFormValues({
      firstName: formData.get("firstName") as string || "",
      lastName: formData.get("lastName") as string || "",
      email: formData.get("email") as string || "",
      linkedin: formData.get("linkedin") as string || "",
      message: formData.get("message") as string || "",
    });
    
    // Submit the form
    formAction(formData);
  };

  // Check if there are any field errors
  const hasFieldErrors = state.errors && (
    state.errors.firstName || 
    state.errors.lastName || 
    state.errors.email || 
    state.errors.linkedin || 
    state.errors.message
  );

  // Get first field error for mobile display
  const getFirstFieldError = () => {
    if (!state.errors) return null;
    
    if (state.errors.firstName) return state.errors.firstName[0];
    if (state.errors.lastName) return state.errors.lastName[0];
    if (state.errors.email) return state.errors.email[0];
    if (state.errors.linkedin) return state.errors.linkedin[0];
    if (state.errors.message) return state.errors.message[0];
    
    return null;
  };

  // Hover animation props for submit button
  const submitHoverProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: ANIMATION_TRANSITIONS.hover,
      };

  // Success animation props
  const successAnimationProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        animate: "visible",
        variants: SUCCESS_VARIANTS,
        transition: ANIMATION_TRANSITIONS.success,
      };

  // Error animation props
  const errorAnimationProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        animate: "visible",
        exit: "hidden",
        variants: ERROR_VARIANTS,
        transition: ANIMATION_TRANSITIONS.error,
      };

  // Show success state
  if (state.success) {
    return (
      <div className="isolate px-6 py-16 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="text-center space-y-12"
            {...successAnimationProps}
          >
            <div className="space-y-8">
              <TextEffect 
                className="text-4xl sm:text-5xl md:text-[49px] lg:text-[50px] xl:text-[56px] text-balance tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight" 
                preset={TEXT_EFFECT_CONFIG.success.preset} 
                as="h1" 
                per="char" 
                speedReveal={TEXT_EFFECT_CONFIG.success.speedReveal} 
                segmentTransition={TEXT_EFFECT_CONFIG.success.segmentTransition}
              >
                Partnership application submitted.
              </TextEffect>
              
              <motion.div 
                className="space-y-6 text-lg leading-normal"
                variants={ENTRY_VARIANTS}
                initial="hidden"
                animate="visible"
                transition={ANIMATION_TRANSITIONS.content}
              >
                <p className="text-foreground/80 max-w-2xl mx-auto">
                  We're reviewing your application and will be in touch within 48 hours to discuss 
                  how we can engineer your competitive advantage together.
                </p>
                <p className="font-semibold text-foreground/80">
                  In the meantime, explore our latest <a href="/blog" className="text-zinc-900 hover:scale-[1.02] cursor-pointer dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-zinc-300 font-medium underline underline-offset-4 transition-colors">thinking on AI infrastructure</a> 
                  <ArrowRightIcon className="size-3.5 inline-block ml-2" />
                </p>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="isolate px-6 py-16 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Header Section - Left Side --- */}
          <div className="lg:pr-8">
            <div className="space-y-8">
              <TextEffect className="text-4xl sm:text-5xl md:text-[49px] lg:text-[50px] xl:text-[56px] text-balance lg:text-wrap tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight" preset={TEXT_EFFECT_CONFIG.title.preset} as="h1" per="char" speedReveal={TEXT_EFFECT_CONFIG.title.speedReveal} segmentTransition={TEXT_EFFECT_CONFIG.title.segmentTransition}>
                Let's engineer your competitive advantage.
              </TextEffect>

              <motion.div className="space-y-10 text-lg leading-normal" variants={ENTRY_VARIANTS} initial="hidden" animate="visible" transition={ANIMATION_TRANSITIONS.content}>
                <p className="text-foreground/80">
                  We're deploying AI infrastructure that systematically eliminates operational limitations. 
                  We partner with a select group of companies ready to pioneer the future of work.
                </p>
                <p className="font-semibold text-foreground/80">
                  We're looking for strong pilot partners who want to lead their industries <ArrowRightIcon className="size-3.5 inline-block ml-2" />
                </p>
              </motion.div>
            </div>
          </div>

          {/* Form Section - Right Side --- */}
          <div className="mt-4">
            {/* Desktop Form */}
            <motion.form 
              className="hidden md:block space-y-2" 
              variants={ENTRY_VARIANTS} 
              initial="hidden" 
              animate="visible" 
              transition={ANIMATION_TRANSITIONS.form} 
              action={handleFormAction} 
              noValidate
            >
              {/* Global Form Error --- */}
              {state.errors?._form && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="text-sm text-red-600 dark:text-red-400">
                    {state.errors._form.map((error: string, index: number) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Name Fields Row --- */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-zinc-900 dark:text-zinc-100 font-medium">
                    First Name
                  </Label>
                  <Input 
                    id="firstName" 
                    name="firstName" 
                    type="text" 
                    placeholder="Chris" 
                    className="h-12"
                    defaultValue={formValues.firstName}
                  />
                  <div className="h-5 flex items-start">
                    {state.errors?.firstName && (
                      <motion.p 
                        className="text-xs text-red-600 dark:text-red-400"
                        {...errorAnimationProps}
                      >
                        {state.errors.firstName[0]}
                      </motion.p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-zinc-900 dark:text-zinc-100 font-medium">
                    Last Name
                  </Label>
                  <Input 
                    id="lastName" 
                    name="lastName" 
                    type="text" 
                    placeholder="Maresca" 
                    className="h-12"
                    defaultValue={formValues.lastName}
                  />
                  <div className="h-5 flex items-start">
                    {state.errors?.lastName && (
                      <motion.p 
                        className="text-xs text-red-600 dark:text-red-400"
                        {...errorAnimationProps}
                      >
                        {state.errors.lastName[0]}
                      </motion.p>
                    )}
                  </div>
                </div>
              </div>

              {/* Email and LinkedIn Fields Row --- */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-900 dark:text-zinc-100 font-medium">
                    Work Email
                  </Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="chris@usearstal.dev" 
                    className="h-12"
                    defaultValue={formValues.email}
                  />
                  <div className="h-5 flex items-start">
                    {state.errors?.email && (
                      <motion.p 
                        className="text-xs text-red-600 dark:text-red-400"
                        {...errorAnimationProps}
                      >
                        {state.errors.email[0]}
                      </motion.p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-zinc-900 dark:text-zinc-100 font-medium">
                    LinkedIn Profile
                  </Label>
                  <Input 
                    id="linkedin" 
                    name="linkedin" 
                    type="url" 
                    placeholder="LinkedIn Profile URL" 
                    className="h-12"
                    defaultValue={formValues.linkedin}
                  />
                  <div className="h-5 flex items-start">
                    {state.errors?.linkedin && (
                      <motion.p 
                        className="text-xs text-red-600 dark:text-red-400"
                        {...errorAnimationProps}
                      >
                        {state.errors.linkedin[0]}
                      </motion.p>
                    )}
                  </div>
                </div>
              </div>

              {/* Message Field --- */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-zinc-900 dark:text-zinc-100 font-medium">
                  AI Aspirations
                </Label>
                <Textarea 
                  className="min-h-28" 
                  id="message" 
                  name="message" 
                  placeholder="Tell us about your operational challenges and transformation goals..." 
                  rows={5}
                  defaultValue={formValues.message}
                />
                <div className="h-5 flex items-start">
                  {state.errors?.message && (
                    <motion.p 
                      className="text-xs text-red-600 dark:text-red-400"
                      {...errorAnimationProps}
                    >
                      {state.errors.message[0]}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Submit Button --- */}
              <div className="pt-4">
                <motion.div {...submitHoverProps}>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 font-medium cursor-pointer disabled:opacity-50" 
                    size="lg"
                    disabled={isPending}
                  >
                    {isPending ? "Submitting..." : "Apply for Partnership"}
                  </Button>
                </motion.div>
              </div>
            </motion.form>

            {/* Mobile Form */}
            <motion.form 
              className="block md:hidden space-y-6" 
              variants={ENTRY_VARIANTS} 
              initial="hidden" 
              animate="visible" 
              transition={ANIMATION_TRANSITIONS.form} 
              action={handleFormAction} 
              noValidate
            >
              {/* Global Form Error --- */}
              {state.errors?._form && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="text-sm text-red-600 dark:text-red-400">
                    {state.errors._form.map((error: string, index: number) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* First Name Field --- */}
              <div className="space-y-2">
                <Label htmlFor="firstName-mobile" className="text-zinc-900 dark:text-zinc-100 font-medium">
                  First Name
                </Label>
                <Input 
                  id="firstName-mobile" 
                  name="firstName" 
                  type="text" 
                  placeholder="Chris" 
                  className="h-12"
                  defaultValue={formValues.firstName}
                />
              </div>

              {/* Last Name Field --- */}
              <div className="space-y-2">
                <Label htmlFor="lastName-mobile" className="text-zinc-900 dark:text-zinc-100 font-medium">
                  Last Name
                </Label>
                <Input 
                  id="lastName-mobile" 
                  name="lastName" 
                  type="text" 
                  placeholder="Maresca" 
                  className="h-12"
                  defaultValue={formValues.lastName}
                />
              </div>

              {/* Email Field --- */}
              <div className="space-y-2">
                <Label htmlFor="email-mobile" className="text-zinc-900 dark:text-zinc-100 font-medium">
                  Work Email
                </Label>
                <Input 
                  id="email-mobile" 
                  name="email" 
                  type="email" 
                  placeholder="chris@usearstal.dev" 
                  className="h-12"
                  defaultValue={formValues.email}
                />
              </div>

              {/* LinkedIn Field --- */}
              <div className="space-y-2">
                <Label htmlFor="linkedin-mobile" className="text-zinc-900 dark:text-zinc-100 font-medium">
                  LinkedIn Profile
                </Label>
                <Input 
                  id="linkedin-mobile" 
                  name="linkedin" 
                  type="url" 
                  placeholder="LinkedIn Profile URL" 
                  className="h-12"
                  defaultValue={formValues.linkedin}
                />
              </div>

              {/* Message Field --- */}
              <div className="space-y-2">
                <Label htmlFor="message-mobile" className="text-zinc-900 dark:text-zinc-100 font-medium">
                  AI Aspirations
                </Label>
                <Textarea 
                  className="min-h-28" 
                  id="message-mobile" 
                  name="message" 
                  placeholder="Tell us about your operational challenges and transformation goals..." 
                  rows={5}
                  defaultValue={formValues.message}
                />
              </div>

              {/* Submit Button --- */}
              <div className="pt-4">
                <motion.div {...submitHoverProps}>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 font-medium cursor-pointer disabled:opacity-50" 
                    size="lg"
                    disabled={isPending}
                  >
                    {isPending ? "Submitting..." : "Apply for Partnership"}
                  </Button>
                </motion.div>

                {/* Mobile Error Bullets --- */}
                <div className="mt-3 h-20 overflow-y-auto">
                  {hasFieldErrors && (
                    <motion.ul 
                      className="text-xs text-red-600 dark:text-red-400 space-y-1"
                      {...errorAnimationProps}
                    >
                      {state.errors?.firstName && (
                        <li className="flex items-start">
                          <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                          <span>{state.errors.firstName[0]}</span>
                        </li>
                      )}
                      {state.errors?.lastName && (
                        <li className="flex items-start">
                          <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                          <span>{state.errors.lastName[0]}</span>
                        </li>
                      )}
                      {state.errors?.email && (
                        <li className="flex items-start">
                          <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                          <span>{state.errors.email[0]}</span>
                        </li>
                      )}
                      {state.errors?.linkedin && (
                        <li className="flex items-start">
                          <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                          <span>{state.errors.linkedin[0]}</span>
                        </li>
                      )}
                      {state.errors?.message && (
                        <li className="flex items-start">
                          <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                          <span>{state.errors.message[0]}</span>
                        </li>
                      )}
                    </motion.ul>
                  )}
                </div>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================*/
// Exports
/* ==========================================================================*/
