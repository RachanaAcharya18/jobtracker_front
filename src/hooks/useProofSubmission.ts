import { useState, useCallback } from "react";

const STORAGE_KEY = "jobTrackerProofLinks";
const STATUS_KEY = "jobTrackerShipStatus";

export interface ProofLinks {
  lovableUrl: string;
  githubUrl: string;
  deployedUrl: string;
}

export type ShipStatus = "Not Started" | "In Progress" | "Shipped";

function loadLinks(): ProofLinks {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { lovableUrl: "", githubUrl: "", deployedUrl: "" };
  } catch {
    return { lovableUrl: "", githubUrl: "", deployedUrl: "" };
  }
}

function loadStatus(): ShipStatus {
  try {
    const raw = localStorage.getItem(STATUS_KEY);
    return raw ? (JSON.parse(raw) as ShipStatus) : "Not Started";
  } catch {
    return "Not Started";
  }
}

const URL_REGEX = /^https?:\/\/.+\..+/;

export function isValidUrl(url: string): boolean {
  return URL_REGEX.test(url.trim());
}

export function useProofSubmission() {
  const [links, setLinks] = useState<ProofLinks>(loadLinks);
  const [shipStatus, setShipStatus] = useState<ShipStatus>(loadStatus);

  const saveLinks = useCallback((updated: ProofLinks) => {
    setLinks(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const updateStatus = useCallback((status: ShipStatus) => {
    setShipStatus(status);
    localStorage.setItem(STATUS_KEY, JSON.stringify(status));
  }, []);

  const allLinksValid = isValidUrl(links.lovableUrl) && isValidUrl(links.githubUrl) && isValidUrl(links.deployedUrl);

  return { links, saveLinks, shipStatus, updateStatus, allLinksValid };
}
