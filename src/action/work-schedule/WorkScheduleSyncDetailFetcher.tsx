import { WorkScheduleSyncDetail } from "../../models/work-schedule/WorkScheduleSyncDetail";

const origin = "http://localhost:9095/automan";

export function getWorkScheduleSyncDetail(
  shopId: number
): Promise<WorkScheduleSyncDetail> {
  const url = origin + "/shops/" + shopId + "/work-schedule-sync-detail";

  return fetch(url, { mode: "cors" }).then((response) => {
    return response.json() as Promise<WorkScheduleSyncDetail>;
  });
}

export function updateWorkScheduleSyncSpecification(
  workScheduleSyncDetail: WorkScheduleSyncDetail
): Promise<Response> {
  const url =
    origin +
    "/shops/" +
    workScheduleSyncDetail.shopId +
    "/work-schedule-sync/" +
    workScheduleSyncDetail.id +
    "/specification";

  const targets: any[] = [];

  workScheduleSyncDetail.targets.forEach((target) => {
    targets.push({
      mediaId: target.mediaId,
      mediaCode: target.mediaCode,
      mediaAccountId: target.mediaAccountId,
    });
  });

  const schedules: any[] = [];

  workScheduleSyncDetail.schedules.forEach((schedule) => {
    schedules.push({
      dayOfWeek: schedule.dayOfWeek,
      hour: schedule.hour,
      minute: schedule.minute,
    });
  });

  const body = {
    sourceMediaId: workScheduleSyncDetail.source?.mediaId,
    sourceMediaCode: workScheduleSyncDetail.source?.mediaCode,
    sourceMediaAccountId: workScheduleSyncDetail.source?.mediaAccountId,
    targets: targets,
    schedules: schedules,
  };

  return fetch(url, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
}
