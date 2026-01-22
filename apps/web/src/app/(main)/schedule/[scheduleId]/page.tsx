import { getSchedule } from "@/features/schedule/api/getSchedule";
import SchedulePage from "@/features/schedule/components/SchedulePage";

export const Schedule = async ({
  params,
}: {
  params: { scheduleId: string };
}) => {
  const { scheduleId } = await params;
  const data = await getSchedule(scheduleId);
  return <SchedulePage data={data} />;
};

export default Schedule;
