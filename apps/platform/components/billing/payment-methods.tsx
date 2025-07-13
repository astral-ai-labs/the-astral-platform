/* ==========================================================================*/
// payment-methods.tsx — Payment methods management component
/* ==========================================================================*/
// Purpose: Displays and manages payment methods with add, delete, and set default functionality
// Sections: Imports, Animation Variants, Types, Helpers, Components, Main Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React, { useState, useRef } from "react";

// External Packages ---
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { CreditCard, PlusIcon, CheckIcon, InfoIcon, MoreVertical, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, easeInOut, useReducedMotion } from "motion/react";

/* ==========================================================================*/
// Animation Variants
/* ==========================================================================*/

const DROPDOWN_ANIMATION_VARIANTS = {
  icon: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      x: 8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
    },
  },
  arrow: {
    hidden: {
      opacity: 0,
      scaleX: 0,
    },
    visible: {
      opacity: 1,
      scaleX: 1,
    },
  },
};

const DROPDOWN_TRANSITIONS = {
  icon: {
    duration: 0.15,
    ease: easeInOut,
  },
  arrow: {
    duration: 0.1,
    ease: easeInOut,
  },
};

const PAYMENT_METHOD_ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.6, // Start after overview is mostly complete
      },
    },
  },
  header: {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: easeInOut,
      },
    },
  },
  card: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: easeInOut,
      },
    },
    exit: { opacity: 0, y: -10 },
  },
  shaking: {
    x: [0, -3, 3, -2, 2, 0],
    transition: { 
      duration: 0.4,
      ease: easeInOut,
    },
  },
  badge: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.2, 
        ease: easeInOut,
      },
    },
    exit: { opacity: 0, scale: 0.8 },
  },
  message: {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2, ease: easeInOut },
    },
    exit: { opacity: 0, y: -10 },
  },
};

/* ==========================================================================*/
// Types and Interfaces
/* ==========================================================================*/

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  isDefault?: boolean;
}

interface OrganizationPaymentMethodsContentProps {
  paymentMethods?: PaymentMethod[];
}

interface PaymentMethodCardProps {
  method: PaymentMethod;
  onDelete: (id: string, action?: string) => void;
  onSetDefault: (id: string) => void;
  isDefault: boolean;
  isOnlyCard: boolean;
}

/* ==========================================================================*/
// Components
/* ==========================================================================*/

/**
 * PaymentMethodActionsDropdown
 *
 * Dropdown menu for payment method actions (Set Default, Delete).
 */
function PaymentMethodActionsDropdown({ 
  isVisible, 
  isDefault, 
  isOnlyCard, 
  onSetDefault, 
  onDelete 
}: { 
  isVisible: boolean; 
  isDefault: boolean; 
  isOnlyCard: boolean; 
  onSetDefault: () => void; 
  onDelete: () => void; 
}) {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);

  // Show icon if item is hovered OR dropdown is open
  const showIcon = isVisible || isOpen;
  // Choose icon based on dropdown state
  const IconComponent = isOpen ? ChevronDown : MoreVertical;

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild className="hover:bg-transparent">
        <motion.div
          variants={DROPDOWN_ANIMATION_VARIANTS.icon}
          initial="hidden"
          animate={showIcon ? "visible" : "hidden"}
          transition={shouldReduceMotion ? {} : DROPDOWN_TRANSITIONS.icon}
          className="cursor-pointer mr-1"
        >
          <IconComponent className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuLabel className="text-sm sr-only">Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem 
            className={`text-xs group cursor-pointer ${isDefault ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={isDefault ? undefined : onSetDefault}
            disabled={isDefault}
          >
            Set Default
            {!shouldReduceMotion && !isDefault && (
              <motion.div 
                className="ml-auto origin-left" 
                variants={DROPDOWN_ANIMATION_VARIANTS.arrow}
                initial="hidden"
                whileHover="visible"
                transition={DROPDOWN_TRANSITIONS.arrow}
              >
                <ArrowRight className="size-3 text-muted-foreground group-hover:text-foreground" />
              </motion.div>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={`text-xs group cursor-pointer text-red-500 hover:text-red-600 ${
              isDefault && !isOnlyCard ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={isDefault && !isOnlyCard ? undefined : onDelete}
            disabled={isDefault && !isOnlyCard}
          >
            Delete
            {!shouldReduceMotion && !(isDefault && !isOnlyCard) && (
              <motion.div 
                className="ml-auto origin-left" 
                variants={DROPDOWN_ANIMATION_VARIANTS.arrow}
                initial="hidden"
                whileHover="visible"
                transition={DROPDOWN_TRANSITIONS.arrow}
              >
                <ArrowRight className="size-3 text-red-500 group-hover:text-red-600" />
              </motion.div>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * PaymentMethodCard
 *
 * Individual payment method card with dropdown actions for delete and set default functionality.
 */
function PaymentMethodCard({ 
  method, 
  onDelete, 
  onSetDefault, 
  isDefault, 
  isOnlyCard 
}: PaymentMethodCardProps) {
  const [isShaking, setIsShaking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDeleteClick = () => {
    if (isDefault) {
      if (isOnlyCard) {
        // Show confirmation dialog for deleting the only card
        onDelete(method.id, 'confirm-delete');
      } else {
        // Cannot delete default card when multiple cards exist
        setIsShaking(true);
        onDelete(method.id, 'show-error');
        
        setTimeout(() => {
          setIsShaking(false);
        }, 500);
      }
    } else {
      // Regular delete for non-default cards
      onDelete(method.id, 'delete');
    }
  };

  const handleSetDefaultClick = () => {
    onSetDefault(method.id);
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      layoutId={`card-${method.id}`}
      variants={PAYMENT_METHOD_ANIMATION_VARIANTS.card}
      {...(isShaking 
        ? { 
            initial: "visible", 
            animate: PAYMENT_METHOD_ANIMATION_VARIANTS.shaking 
          } 
        : {}
      )}
      className={`group border border-border scrollbar-hide rounded-lg pt-2.5 py-6 pb-3 pl-4 ${isDefault ? "pr-3" : "pr-1"} flex flex-col relative ${
        isDefault ? "min-w-[300px]" : "min-w-[250px]"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Start of Card Header --- */}
      <div className="flex justify-between items-start w-full">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-md border border-border bg-background/80">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium font-mono">•••• {method.last4}</p>
            <p className="text-[12px] pt-0.5 tracking-wide text-muted-foreground text-nowrap">
              Expires {method.exp_month}/{method.exp_year}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AnimatePresence>
            {isDefault && (
              <motion.div 
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={PAYMENT_METHOD_ANIMATION_VARIANTS.badge}
              >
                <Badge variant="outline" className="text-[11px] px-2 py-0 h-5 gap-1 font-mono tracking-tighter">
                  <CheckIcon className="h-3 w-3 text-green-500" />
                  Default
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Only render dropdown if there are actions available */}
          {(!isDefault || isOnlyCard) && (
            <div className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <PaymentMethodActionsDropdown
                isVisible={isHovered}
                isDefault={isDefault}
                isOnlyCard={isOnlyCard}
                onSetDefault={handleSetDefaultClick}
                onDelete={handleDeleteClick}
              />
            </div>
          )}
        </div>
      </div>
      {/* End of Card Header ---- */}
    </motion.div>
  );
}

/* ==========================================================================*/
// Main Component
/* ==========================================================================*/

/**
 * OrganizationPaymentMethodsContent
 *
 * Payment methods management interface with add, delete, and set default functionality.
 *
 * @param paymentMethods - Array of payment methods to display
 */
function OrganizationPaymentMethodsContent({ paymentMethods = [] }: OrganizationPaymentMethodsContentProps) {
  const [methods, setMethods] = useState(paymentMethods);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("You cannot delete your default payment method.");

  const handleDelete = (id: string, action = 'delete') => {
    if (action === 'show-error') {
      setErrorMessage("You cannot delete your default payment method until you set another one as default.");
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
      return;
    }
    
    if (action === 'confirm-delete') {
      setCardToDelete(id);
      setShowConfirmation(true);
      return;
    }
    
    if (action === 'delete') {
      console.log(`Deleting payment method with id: ${id}`);
      setMethods((prev) => prev.filter((method) => method.id !== id));
    }
  };

  const confirmDelete = () => {
    if (cardToDelete) {
      console.log(`Confirming deletion of payment method with id: ${cardToDelete}`);
      setShowConfirmation(false);
      setTimeout(() => {
        setMethods((prev) => prev.filter((method) => method.id !== cardToDelete));
        setCardToDelete(null);
      }, 300);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setTimeout(() => {
      setCardToDelete(null);
    }, 300);
  };

  const handleSetDefault = (id: string) => {
    console.log(`Setting payment method with id: ${id} as default`);
    setMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const isOnlyOneCard = methods.length === 1;

  return (
    <motion.div
      variants={PAYMENT_METHOD_ANIMATION_VARIANTS.container}
      initial="hidden"
      animate="visible"
      className="pt-12"
    >
      <div className="max-w-4xl p-6 space-y-6 mx-auto">
        <div className="flex flex-col space-y-4">
          {/* Start of Header Section --- */}
          <motion.div 
            variants={PAYMENT_METHOD_ANIMATION_VARIANTS.header}
            className="flex items-center justify-between"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-medium">Payment methods</h2>
              <p className="text-muted-foreground">Add or manage your payment methods.</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 text-xs border-border/70 bg-background/50 text-muted-foreground hover:bg-background/80"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add payment method
            </Button>
          </motion.div>
          {/* End of Header Section ---- */}

          <div className="mt-6 space-y-4">
            {methods.length > 0 ? (
              <>
                {/* Start of Payment Methods List --- */}
                <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-2">
                  <AnimatePresence>
                    {methods.map((method) => (
                      <motion.div
                        key={method.id}
                        variants={PAYMENT_METHOD_ANIMATION_VARIANTS.card}
                      >
                        <PaymentMethodCard 
                          method={method} 
                          onDelete={handleDelete} 
                          onSetDefault={handleSetDefault} 
                          isDefault={!!method.isDefault}
                          isOnlyCard={isOnlyOneCard}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                {/* End of Payment Methods List ---- */}
                
                {/* Start of Status Messages --- */}
                <AnimatePresence>
                  {showErrorMessage && (
                    <motion.div 
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={PAYMENT_METHOD_ANIMATION_VARIANTS.message}
                      className="flex items-center gap-2 text-xs text-red-500 mt-2"
                    >
                      <InfoIcon className="h-3.5 w-3.5" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}
                  
                  {showConfirmation && (
                    <motion.div 
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={PAYMENT_METHOD_ANIMATION_VARIANTS.message}
                      className="flex flex-col gap-2 text-xs mt-2 p-3 border border-border rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <InfoIcon className="h-3.5 w-3.5 text-red-500" />
                        <span className="text-red-800">
                          Deleting your default payment method will require you to input a new one to add credits in the future.
                        </span>
                      </div>
                      <div className="flex gap-3 mt-1">
                        <Button 
                          onClick={confirmDelete} 
                          variant="link" 
                          size="sm" 
                          className="p-0 h-5 text-xs text-red-700 hover:text-red-900"
                        >
                          Yes, continue
                        </Button>
                        <Button 
                          onClick={cancelDelete} 
                          variant="link" 
                          size="sm" 
                          className="p-0 h-5 text-xs text-muted-foreground hover:text-muted-foreground"
                        >
                          Nevermind
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* End of Status Messages ---- */}
              </>
            ) : (
              /* Start of Empty State --- */
              <motion.div 
                variants={PAYMENT_METHOD_ANIMATION_VARIANTS.card}
                className="border border-border rounded-lg p-6 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-md border border-border bg-background/80">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">No payment methods</p>
                    <p className="text-sm text-muted-foreground">
                      Add a payment method to enable automatic recharges
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 text-xs border-border/70 bg-background/50 text-muted-foreground"
                >
                  <PlusIcon className="h-4 w-4" />
                  Add payment method
                </Button>
              </motion.div>
              /* End of Empty State ---- */
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export { OrganizationPaymentMethodsContent };
