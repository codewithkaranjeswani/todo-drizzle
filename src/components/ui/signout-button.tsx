"use client";
import * as React from "react";
import { ButtonProps, buttonVariants } from "./button";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const SignOutButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={() => signOut()}
      >
        Sign Out
      </Comp>
    );
  },
);
SignOutButton.displayName = "SignOutButton";

export { SignOutButton };
