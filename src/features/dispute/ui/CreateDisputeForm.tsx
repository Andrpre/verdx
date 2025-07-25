"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  disputeFormSchema,
  DisputeFormValues,
} from "@/entities/disputes/model/dispute-schema";

import { createDisputeWithArgument } from "@/entities/disputes/";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { Input } from "@/shared/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/shared/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";

export function CreateDisputeForm() {
  const [isPendingAdd, startTransitionAdd] = useTransition();
  const router = useRouter();

  const form = useForm<DisputeFormValues>({
    resolver: zodResolver(disputeFormSchema),
    defaultValues: {
      topicDispute: "",
      descriptionDispute: "",
      argumentDispute: "",
    },
  });

  function onSubmit(values: DisputeFormValues) {
    const { topicDispute, descriptionDispute, argumentDispute } = values;

    startTransitionAdd(async () => {
      try {
        const data = await createDisputeWithArgument(
          topicDispute,
          descriptionDispute,
          argumentDispute
        );
        router.push(`/disputes/${data.id}`);
      } catch {
        toast.error("Не удалось создать спор");
      }
    });
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>
          Опишите свой спор, добавьте участников и выясните кто в конце концов
          прав.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="topicDispute"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Тема спора" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descriptionDispute"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="min-h-30"
                      placeholder="Описание спора"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="argumentDispute"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="min-h-20"
                      placeholder="Аргумент в твою пользу"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPendingAdd}>
              {isPendingAdd ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Создать спор"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
