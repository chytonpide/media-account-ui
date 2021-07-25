import { WorkScheduleSyncDetail } from "../../models/work-schedule/WorkScheduleSyncDetail";

const origin = "http://localhost:9095/automan";

export function fetchWorkScheduleSyncDetail(
  shopId: number
): Promise<WorkScheduleSyncDetail> {
  const url = origin + "/shops/" + shopId + "/work-schedule-sync-detail";

  return fetch(url, { mode: "cors" }).then((response) => {
    return response.json() as Promise<WorkScheduleSyncDetail>;
  });
}
