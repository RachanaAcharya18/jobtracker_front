import { useState, useCallback } from "react";

export type JobStatus = "Not Applied" | "Applied" | "Rejected" | "Selected";

export interface StatusChangeRecord {
  jobId: number;
  status: JobStatus;
  date: string; // ISO string
}

const STORAGE_KEY = "jobTrackerStatus";
const CHANGES_KEY = "jobTrackerStatusChanges";

function loadStatuses(): Record<number, JobStatus> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function loadChanges(): StatusChangeRecord[] {
  try {
    const raw = localStorage.getItem(CHANGES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useJobStatus() {
  const [statuses, setStatuses] = useState<Record<number, JobStatus>>(loadStatuses);
  const [changes, setChanges] = useState<StatusChangeRecord[]>(loadChanges);

  const getStatus = useCallback(
    (jobId: number): JobStatus => statuses[jobId] || "Not Applied",
    [statuses]
  );

  const setStatus = useCallback(
    (jobId: number, status: JobStatus) => {
      setStatuses((prev) => {
        const next = { ...prev, [jobId]: status };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });

      if (status !== "Not Applied") {
        const record: StatusChangeRecord = {
          jobId,
          status,
          date: new Date().toISOString(),
        };
        setChanges((prev) => {
          const next = [record, ...prev].slice(0, 50); // keep last 50
          localStorage.setItem(CHANGES_KEY, JSON.stringify(next));
          return next;
        });
      }
    },
    []
  );

  return { getStatus, setStatus, statuses, changes };
}
