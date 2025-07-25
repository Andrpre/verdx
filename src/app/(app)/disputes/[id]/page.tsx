import { createClient } from "@/app/supabase/server";
import { Dispute } from "@/entities/disputes";
import { TitlePage } from "@/shared/ui/title-page";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function DisputePage({ params }: PageProps) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("disputes")
    .select("*")
    .eq("id", parseInt(params.id))
    .single();

  if (error || !data) {
    return <TitlePage>Спор не найден</TitlePage>;
  }

  return (
    <>
      <TitlePage>Спор #{data.id}</TitlePage>
      <Dispute
        title={data.title}
        description={data.description}
        status={data.status}
      />
    </>
  );
}
