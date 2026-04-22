"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/lib/routes";

// ✅ Schema
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

type FormData = z.infer<typeof schema>;

// ✅ Fake API (replace with your axios)
const loginUser = async (data: FormData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000);
  });
};

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      router.push(ROUTES.USER.DASHBOARD);
    },
    onError: () => {
      setError("root", { message: "Invalid credentials" });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Email */}
        <div className="space-y-2">
          <Label>Email</Label>
          <Input {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label>Password</Label>
          <Input type="password" {...register("password")} />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Global error */}
        {errors.root && (
          <p className="text-sm text-red-500">
            {errors.root.message}
          </p>
        )}

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}