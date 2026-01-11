"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { RegisterPayload, signup } from "../api/signup";

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleSignUp = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      console.log(data);
      toast.promise(signup(data as RegisterPayload), {
        loading: "Signing up...",
        success: "Signed up successfully",
        error: (err) => err.message,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="first-name">First Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="first-name"
            type="text"
            placeholder="Enter your First name"
            className="pl-10"
            required
            {...register("firstName")}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="last-name">Last Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="last-name"
            type="text"
            placeholder="Enter your Last Name"
            className="pl-10"
            {...register("lastName")}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10"
            required
            {...register("email")}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            className="pl-10 pr-10"
            required
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-confirm">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="signup-confirm"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="pl-10 pr-10"
            required
            {...register("confirmPassword")}
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        By signing up, you agree to our{" "}
        <button type="button" className="text-bg-primary hover:underline">
          Terms of Service
        </button>{" "}
        and{" "}
        <button type="button" className="text-bg-primary hover:underline">
          Privacy Policy
        </button>
      </p>
    </form>
  );
};

export default SignUpForm;
