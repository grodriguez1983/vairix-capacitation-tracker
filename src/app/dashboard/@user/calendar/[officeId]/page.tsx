import { OfficeCalendar } from "@/components/Calendar/OfficeCalendar";
import { fetchOffice } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function CalendarPage({
  params: { officeId },
}: {
  params: { officeId: string };
}) {
  const office = await fetchOffice(officeId);

  if (!office) return redirect("/dashboard/offices");

  return <OfficeCalendar office={office} />;
}
