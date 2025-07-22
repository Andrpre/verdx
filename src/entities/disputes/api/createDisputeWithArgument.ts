import { supabase } from "@/app/supabase/browser";

export async function createDisputeWithArgument(title: string, description: string, argument: string) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("User not authenticated");

  const disputeInsert = await supabase
    .from("disputes")
    .insert({
      title,
      description,
      status: "pending",
      created_by: user.id,
    })
    .select("id")
    .single();

  if (disputeInsert.error) throw disputeInsert.error;

  const disputeId = disputeInsert.data.id;

  const argumentInsert = await supabase
    .from("arguments")
    .insert({
      dispute_id: disputeId,
      user_id: user.id,
      content: argument,
    });

  if (argumentInsert.error) throw argumentInsert.error;

  return { id: disputeId };
}
