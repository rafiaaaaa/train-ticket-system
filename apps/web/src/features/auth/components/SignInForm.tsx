"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { login, LoginPayload } from "../api/login";
import { toast } from "sonner";

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleSignIn = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      toast.promise(login(data as LoginPayload), {
        loading: "Logging in...",
        success: "Logged in successfully",
        error: (err) => err.message,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  });
  
  return (
    <>
      <form onSubmit={handleSignIn} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signin-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="signin-email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              {...register("email", { required: true })}
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
              placeholder="Enter your password"
              className="pl-10 pr-10"
              required
              {...register("password", { required: true })}
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
        <div className="flex items-center justify-end">
          <button
            type="button"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
