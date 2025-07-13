"use client";

// Separate Auto Recharge Settings Dialog Component
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Icons
import { Plus } from "lucide-react";

// Shadcn UI components
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";

const ORGANIZATION_ENABLE_RECHARGE_CONSTANTS = {
  enableAutoRechargeButton: "Enable auto recharge",
  autoRechargeSettings: "Auto recharge settings",
  autoRechargeInfo:
    "Configure automatic recharge when your credit balance falls below a threshold",
  whenBalanceGoesBelow: "When credit balance goes below",
  bringBalanceBackTo: "Bring credit balance back up to",
  limitAmount: "Limit the amount of automatic recharge per month",
  enterAmountBetween: "Enter an amount between $5 and $199 995",
  enterAmountBetween10: "Enter an amount between $10 and $200 000",
  enterAmountNoLimit:
    "Enter an amount between $10 and $200 000. Leave this field empty for no recharge limit.",
  cancelButton: "Cancel",
  saveButton: "Save settings",
  popular: "Most popular",
  custom: "Custom",
};

interface ThresholdOption {
  value: string;
  label: string;
  isPopular?: boolean;
}
interface TopUpOption {
  value: string;
  label: string;
  isPopular?: boolean;
}

const thresholdOptions: ThresholdOption[] = [
  { value: "25", label: "$25" },
  { value: "50", label: "$50" },
  { value: "100", label: "$100", isPopular: true },
  { value: "custom", label: ORGANIZATION_ENABLE_RECHARGE_CONSTANTS.custom },
];

const topUpOptions: TopUpOption[] = [
  { value: "100", label: "$100" },
  { value: "150", label: "$150" },
  { value: "200", label: "$200", isPopular: true },
  { value: "custom", label: ORGANIZATION_ENABLE_RECHARGE_CONSTANTS.custom },
];

export default function OrganizationEnableRecharge() {
  const [open, setOpen] = useState(false);
  const [thresholdAmount, setThresholdAmount] = useState("100");
  const [topUpAmount, setTopUpAmount] = useState("200");
  const [limitAmount, setLimitAmount] = useState("");
  const [customThreshold, setCustomThreshold] = useState("");
  const [customTopUp, setCustomTopUp] = useState("");
  const [showCustomThreshold, setShowCustomThreshold] = useState(false);
  const [showCustomTopUp, setShowCustomTopUp] = useState(false);

  const handleThresholdChange = (value: string) => {
    if (value === "custom") {
      setShowCustomThreshold(true);
      setThresholdAmount(customThreshold || "");
    } else {
      setShowCustomThreshold(false);
      setThresholdAmount(value);
    }
  };

  const handleTopUpChange = (value: string) => {
    if (value === "custom") {
      setShowCustomTopUp(true);
      setTopUpAmount(customTopUp || "");
    } else {
      setShowCustomTopUp(false);
      setTopUpAmount(value);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-fit"
        >
          <Button
            size="sm"
            className="mt-1 bg-white hover:bg-white text-black h-7 text-xs gap-1.5 border-none"
          >
            <Plus className="h-3 w-3" />
            {ORGANIZATION_ENABLE_RECHARGE_CONSTANTS.enableAutoRechargeButton}
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {ORGANIZATION_ENABLE_RECHARGE_CONSTANTS.autoRechargeSettings}
          </DialogTitle>
          <DialogDescription>
            {ORGANIZATION_ENABLE_RECHARGE_CONSTANTS.autoRechargeInfo}
          </DialogDescription>
        </DialogHeader>

        {/* Threshold block */}
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <Label className="text-base font-medium">
              {ORGANIZATION_ENABLE_RECHARGE_CONSTANTS.whenBalanceGoesBelow}
            </Label>

            <RadioGroup
              value={showCustomThreshold ? "custom" : thresholdAmount}
              onValueChange={handleThresholdChange}
              className="grid grid-cols-4 gap-2"
            >
              {thresholdOptions.map((option) => (
                <Label
                  key={option.value}
                  htmlFor={`threshold-${option.value}`}
                  className={`flex h-12 cursor-pointer items-center justify-center rounded-md border border-input px-3 py-2 text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                    (!showCustomThreshold && thresholdAmount === option.value) ||
                    (showCustomThreshold && option.value === "custom")
                      ? "bg-accent text-accent-foreground"
                      : ""
                  } relative`}
                >
                  <RadioGroupItem
                    value={option.value}
                    id={`threshold-${option.value}`}
                    className="sr-only"
                  />
                  {option.label}
                  {option.isPopular && (
                    <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-green-600 text-white text-[9px] font-medium rounded-sm">
                      {ORGANIZATION_ENABLE_RECHARGE_CONSTANTS.popular}
                    </span>
                  )}
                </Label>
              ))}
            </RadioGroup>

            <AnimatePresence>
              {showCustomThreshold && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1"
                >
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="custom-threshold"
                      type="number"
                      placeholder="Enter custom amount"
                      className="pl-7"
                      value={customThreshold}
                      onChange={(e) => {
                        setCustomThreshold(e.target.value);
                        if (showCustomThreshold) setThresholdAmount(e.target.value);
                      }}
                      onFocus={() => handleThresholdChange("custom")}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {ORGANIZATION_ENABLE_RECHARGE_CONSTANTS.enterAmountBetween}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Top‑up block */}
          <div className="space-y-4">
            <Label className="text-base font-medium">
              {ORGANIZATION_ENABLE_RECHARGE_CONSTANTS.bringBalanceBackTo}
            </Label>

            <RadioGroup
              value={showCustomTopUp ? "custom" : topUpAmount}
              onValueChange={handleTopUpChange}
              className="grid grid-cols-4 gap-2"
            >
              {topUpOptions.map((option) => (
                <Label
                  key={option.value}
                  htmlFor={`topup-${option.value}`}
                  className={`flex h-12 cursor-pointer items-center justify-center rounded-md border border-input px-3 py-2 text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                    (!showCustomTopUp && topUpAmount === option.value) ||
                    (showCustomTopUp && option.value === "custom")
                      ? "bg-accent text-accent-foreground"
                      : ""
                  } relative`}
                >
                  <RadioGroupItem
                    value={option.value}
                    id={`topup-${option.value}`}
                    className="sr-only"
                  />
                  {option.label}
                  {option.isPopular && (
                    <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-green-600 text-white text-[9px] font-medium rounded-sm">
                      {ORGANIZATION_ENABLE_RECHARGE_CONSTANTS.popular}
                    </span>
                  )}
                </Label>
              ))}
            </RadioGroup>

            <AnimatePresence>
              {showCustomTopUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1"
                >
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="custom-topup"
                      type="number"
                      placeholder="Enter custom amount"
                      className="pl-7"
                      value={customTopUp}
                      onChange={(e) => {
                        setCustomTopUp(e.target.value);
                        if (showCustomTopUp) setTopUpAmount(e.target.value);
                      }}
                      onFocus={() => handleTopUpChange("custom")}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {ORGANIZATION_ENABLE_RECHARGE_CONSTANTS.enterAmountBetween10}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Limit block */}
          <div className="space-y-2">
            <Label className="text-base font-medium">
              {ORGANIZATION_ENABLE_RECHARGE_CONSTANTS.limitAmount}
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="limit-amount"
                type="number"
                placeholder="Enter limit"
                className="pl-7"
                value={limitAmount}
                onChange={(e) => setLimitAmount(e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {ORGANIZATION_ENABLE_RECHARGE_CONSTANTS.enterAmountNoLimit}
            </p>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            {ORGANIZATION_ENABLE_RECHARGE_CONSTANTS.cancelButton}
          </Button>
          <Button>{ORGANIZATION_ENABLE_RECHARGE_CONSTANTS.saveButton}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
