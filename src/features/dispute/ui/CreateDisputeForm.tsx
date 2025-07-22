"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { createDisputeWithArgument } from "@/entities/disputes/";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { Input } from "@/shared/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/shared/ui/card";
import { Loader2Icon } from "lucide-react";

export function CreateDisputeForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [argument, setArgument] = useState("");

  const router = useRouter();
  const [isPendingAdd, startTransitionAdd] = useTransition();

  const handleCreate = async () => {
    if (!title || !description || !argument) return;

    startTransitionAdd(async () => {
      try {
        const data = await createDisputeWithArgument(title, description, argument);
        router.push(`/disputes/${data.id}`);
      } catch (error) {
        console.error(error);
        alert("Не удалось создать спор");
      }
    });
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>
          Опишите свой спор, добавьте участников и выясните кто в конце концов
          прав.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col items-start gap-4">
          <Input
            placeholder="Тема спора"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            className="min-h-30"
            placeholder="Описание спора"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Textarea
            className="min-h-20"
            placeholder="Аргумент в твою пользу"
            value={argument}
            onChange={(e) => setArgument(e.target.value)}
            required
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" onClick={handleCreate} disabled={isPendingAdd}>
          {isPendingAdd ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Создать спор"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
