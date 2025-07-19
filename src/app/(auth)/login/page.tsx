import { Metadata } from "next";
import { SignIn } from "@/features/auth";

export const metadata: Metadata = {
  title: "Войти в систему",
  description: "",
};

export default async function Page() {
  return <SignIn />;
}
