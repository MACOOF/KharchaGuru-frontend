"use client"
import React, { useCallback, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import zxcvbn from "zxcvbn";
import { Loader2, Mail } from "lucide-react";
import { useTranslations } from "next-intl"; // Import useTranslation hook

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";
import { CardWrapper } from "./card-wrapper";
import { toast } from 'sonner'
import { Passwordcmp } from "../Passwordcmp";
import { getSchemas  } from "@/lib/index";
import { Register } from "../../actions/auth/signup";

export const RegisterForm = () => {
  const t = useTranslations(); // Initialize translation hook
  const [isPending, startTransition] = useTransition();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: ""
  });
  const { RegisterSchema } = getSchemas(t);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    }
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    if (passwordStrength.score < 3) {
      toast.warning(t("auth.weak-password"));
      return;
    }

    const loading = toast.loading(t("auth.registering"))

    startTransition(() => {
      Register(values)
        .then((data: { success?: string, error?: string }) => {
          if (data.error) {
            toast.error(data.error, {
              closeButton: true,
              id: loading
            })
            console.error(data.error)
          } else {
            toast.success(data.success, {
              closeButton: true,
              id: loading
            });
            form.reset();
          }
        });
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const result = zxcvbn(password);
    setPasswordStrength({
      score: result.score,
      feedback: result.feedback.warning || result.feedback.suggestions[0] || ""
    });
  };

  const getPasswordStrengthColor = useCallback(() => {
    switch (passwordStrength.score) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-blue-500';
      case 4:
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  }, [passwordStrength.score]);

  return (
    <CardWrapper
      headerLabel={t("auth.create-account")}
      backButtonLable={t("auth.already-have-account")}
      backButtonHref="/auth/signin"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.name")}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t("auth.enter-name")} type="text" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.email")}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t("auth.enter-email")} type="email" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.password")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder={t("auth.enter-password")}
                      type={isPasswordVisible ? "text" : "password"}
                      onChange={(e) => {
                        field.onChange(e);
                        handlePasswordChange(e);
                      }}
                      disabled={isPending}
                      className="pr-10"
                    />
                    <Passwordcmp
                      isPasswordVisible={isPasswordVisible}
                      setisPasswordVisible={setIsPasswordVisible}
                    />
                  </div>
                </FormControl>
                {field.value && (
                  <div className="mt-2">
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                      ></div>
                    </div>
                    <p className="text-sm mt-1">{passwordStrength.feedback}</p>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isPending}
            type='submit'
            className="w-full"
          >
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />} {t("auth.register")}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};