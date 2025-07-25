import { supabase } from "@/app/supabase/browser";
import type { User, Session } from "@supabase/supabase-js";

export const signUp = async (
  email: string,
  password: string,
  username: string
): Promise<{ user: User | null; session: Session | null }> => {
    // Проверяем, есть ли такой username
  const { data: existingProfiles, error: checkError } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .maybeSingle();

  if (checkError) {
    throw new Error("Ошибка при проверке логина: " + checkError.message);
  }

  if (existingProfiles) {
    throw new Error("Пользователь с таким логином уже существует");
  }

  // Регистрируем пользователя с username в metadata
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (error) throw new Error(`Ошибка регистрации: ${error.message}`);

  return { user: data.user, session: data.session };
};
