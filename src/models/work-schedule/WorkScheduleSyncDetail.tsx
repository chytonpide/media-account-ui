export interface WorkScheduleSyncDetail {
  id: number;
  shopId: number;
  source: SyncSource | null;
  targets: SyncTarget[];
  schedules: SyncSchedule[];
  availableSources: SyncSource[];
  availableTargets: SyncTarget[];
}

export interface SyncSource {
  mediaId: number;
  mediaName: string;

  shopId: number;
  shopName: string;

  mediaAccountId: number;
  loginId: string;
}

export interface SyncTarget {
  mediaId: number;
  mediaName: String;
  mediaAccountId: number;
}

export interface SyncSchedule {
  dayOfWeek: string;
  hour: number;
  minute: number;
}
