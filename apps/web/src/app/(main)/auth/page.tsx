import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import SignInForm from "@/features/auth/components/SignInForm";
import SignUpForm from "@/features/auth/components/SignUpForm";

export default function Auth() {
  return (
    <>
      {/* Main Content */}
      <Section className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <Image
                src="/assets/railway-logo.png"
                width={24}
                height={24}
                alt="RailWay Logo"
                className="h-16 w-16 rounded-2xl object-cover"
              />
            </div>
            <CardTitle className="text-2xl font-bold">
              Welcome to RailWay
            </CardTitle>
            <CardDescription>
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Sign In Form */}
              <TabsContent value="signin">
                <SignInForm />
              </TabsContent>

              {/* Sign Up Form */}
              <TabsContent value="signup">
                <SignUpForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
