"use client";

import { CheckCircle2, Circle, Clock, XCircle } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardTitle, CardHeader, CardAction } from "@/shared/ui/card";
import { JSX } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

interface DisputeProps {
  title: string;
  description: string;
  status: DisputeStatus;
}

type DisputeStatus = "open" | "resolved" | "rejected" | "pending";

const statusConfig: Record<DisputeStatus, { label: string; icon: JSX.Element; color: string; tooltip: string; }> = {
  open: {
    label: "Открыт",
    icon: <Circle className="w-4 h-4 mr-1 text-blue-500" />,
    color: "bg-blue-100 text-blue-800",
    tooltip: "Спор на этапе обсуждения и вынесения вердикта",
  },
  resolved: {
    label: "Решён",
    icon: <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />,
    color: "bg-green-100 text-green-800",
    tooltip: "Вынесен вердикт по спору",
  },
  rejected: {
    label: "Отклонён",
    icon: <XCircle className="w-4 h-4 mr-1 text-red-500" />,
    color: "bg-red-100 text-red-800",
    tooltip: "Спор отменен",
  },
  pending: {
    label: "В ожидании",
    icon: <Clock className="w-4 h-4 mr-1 text-yellow-500" />,
    color: "bg-yellow-100 text-yellow-800",
    tooltip: "Ждем когда все участники спора добавят свои аргументы",
  },
};

export function Dispute({ title, description, status }: DisputeProps) {
  const {icon, label, color, tooltip} = statusConfig[status];

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardAction>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge className={`flex items-center gap-1 ${color}`} >
                {icon}
                {label}
              </Badge>
            </TooltipTrigger>
            <TooltipContent className="max-w-50 text-center">
              {tooltip}
            </TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>
      <CardContent>{description}</CardContent>
    </Card>
  );
}
