"use client";

import { useState } from "react";

// Icons
import { CreditCard, Plus, PlusIcon } from "lucide-react";

// Shadcn UI components
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog";


interface OrganizationBillingAddMoneyDialogProps {
    addCreditBalanceButton: string;
}

export default function OrganizationBillingAddMoneyDialog({ addCreditBalanceButton }: OrganizationBillingAddMoneyDialogProps) {
  const [amount, setAmount] = useState<string>("10");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const handleAmountChange = (value: string) => {
    if (value === "custom") {
      setIsCustom(true);
      setAmount(customAmount || "");
    } else {
      setIsCustom(false);
      setAmount(value);
      setCustomAmount("");
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (isCustom) {
      setAmount(value);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button variant="outline" size="sm" className="h-7 -ml-0.5 text-xs border-border/70 bg-background/50 text-muted-foreground">
          <PlusIcon className="h-4 w-4" />
          {addCreditBalanceButton}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add to credit balance</DialogTitle>
          <DialogDescription>Add funds to your account to use for future purchases.</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <Label htmlFor="amount" className="text-base font-medium">
              Amount to add
            </Label>
            <RadioGroup value={isCustom ? "custom" : amount} onValueChange={handleAmountChange} className="grid grid-cols-4 gap-2">
              <Label htmlFor="amount-10" className={`flex h-12 cursor-pointer items-center justify-center rounded-md border border-input px-3 py-2 text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${!isCustom && amount === "10" ? "bg-accent text-accent-foreground" : ""}`}>
                <RadioGroupItem value="10" id="amount-10" className="sr-only" />
                $10
              </Label>
              <Label htmlFor="amount-25" className={`flex h-12 cursor-pointer items-center justify-center rounded-md border border-input px-3 py-2 text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${!isCustom && amount === "25" ? "bg-accent text-accent-foreground" : ""}`}>
                <RadioGroupItem value="25" id="amount-25" className="sr-only" />
                $25
              </Label>
              <Label htmlFor="amount-50" className={`flex h-12 cursor-pointer items-center justify-center rounded-md border border-input px-3 py-2 text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${!isCustom && amount === "50" ? "bg-accent text-accent-foreground" : ""}`}>
                <RadioGroupItem value="50" id="amount-50" className="sr-only" />
                $50
              </Label>
              <Label htmlFor="amount-100" className={`flex h-12 cursor-pointer items-center justify-center rounded-md border border-input px-3 py-2 text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${!isCustom && amount === "100" ? "bg-accent text-accent-foreground" : ""}`}>
                <RadioGroupItem value="100" id="amount-100" className="sr-only" />
                $100
              </Label>
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor="custom-amount" className="text-sm font-medium">
                Custom amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input id="custom-amount" type="number" placeholder="Enter custom amount" className="pl-7" value={customAmount} onChange={handleCustomAmountChange} onFocus={() => handleAmountChange("custom")} />
              </div>
              <p className="text-xs text-muted-foreground">Enter an amount between $5 and $199,992</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="payment-method" className="text-base font-medium">
                Payment method
              </Label>
              <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                <Plus className="mr-1 h-3 w-3" />
                Add payment method
              </Button>
            </div>
            <Select defaultValue="card1">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card1">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>•••• 5584</span>
                  </div>
                </SelectItem>
                <SelectItem value="card2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>•••• 1234</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
