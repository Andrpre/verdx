import { TitlePage } from "@/shared/ui/title-page";
import { CreateDisputeForm } from "@/features/dispute";

export default function NewDisputePage() {
  return (
    <>
      <TitlePage>Создание нового спора</TitlePage>
      <CreateDisputeForm />
    </>
  );
}
