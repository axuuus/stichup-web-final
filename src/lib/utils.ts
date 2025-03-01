import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getIpAddress(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP:', error);
    return 'N/A';
  }
}

export async function recordVisit(path: string) {
  try {
    const storedVisits = localStorage.getItem('recentVisits') || '[]';
    const visits = JSON.parse(storedVisits);
    
    const ip = await getIpAddress();
    
    const newVisit = {
      id: Date.now().toString(),
      path,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ip
    };

    visits.unshift(newVisit);
    
    // Keep only last 100 visits
    const limitedVisits = visits.slice(0, 100);
    
    localStorage.setItem('recentVisits', JSON.stringify(limitedVisits));
  } catch (error) {
    console.error('Error recording visit:', error);
  }
}
