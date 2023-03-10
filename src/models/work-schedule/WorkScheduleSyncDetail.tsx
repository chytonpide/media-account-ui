export interface WorkScheduleSyncDetail {
  id: number;
  shopId: number;
  source: SyncSource | null;
  targets: SyncTarget[];
  schedules: SyncSchedule[];
  availableSources: SyncSource[];
  availableTargets: SyncTarget[];
  scheduled: boolean;
}

export interface SyncSource {
  mediaId: number;
  mediaName: string;
  mediaCode: String;

  mediaAccountId: number;
  loginId: string;
}

export interface SyncTarget {
  mediaId: number;
  mediaName: String;
  mediaCode: String;
  mediaAccountId: number;
}

export interface SyncSchedule {
  dayOfWeek: string;
  hour: number;
  minute: number;
}

export function compareSyncSchedule(left: SyncSchedule, right: SyncSchedule) {
  if (weightOfDayOfWeek(left.dayOfWeek) < weightOfDayOfWeek(right.dayOfWeek)) {
    return -1;
  }
  if (weightOfDayOfWeek(left.dayOfWeek) > weightOfDayOfWeek(right.dayOfWeek)) {
    return 1;
  }

  if (left.hour < right.hour) {
    return -1;
  }
  if (left.hour > right.hour) {
    return 1;
  }

  if (left.minute < right.minute) {
    return -1;
  }
  if (left.minute > right.minute) {
    return 1;
  }

  return 0;
}

function weightOfDayOfWeek(dayOfWeek: string) {
  let weight = 0;

  switch (dayOfWeek) {
    case "MONDAY":
      weight = 1;
      break;
    case "TUESDAY":
      weight = 2;
      break;
    case "WEDNESDAY":
      weight = 3;
      break;
    case "THURSDAY":
      weight = 4;
      break;
    case "FRIDAY":
      weight = 5;
      break;
    case "SATURDAY":
      weight = 6;
      break;
    case "SUNDAY":
      weight = 7;
      break;
    default:
      weight = 0;
      break;
  }

  return weight;
}
