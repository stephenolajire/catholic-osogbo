/**
 * Date utility functions for formatting dates across the application
 */

/**
 * Format ISO date string to readable format
 * @param dateString - ISO 8601 date string or Date object
 * @param format - Format type: 'short', 'medium', 'long', 'full'
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string | Date,
  format: "short" | "medium" | "long" | "full" = "medium",
): string => {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const options: Record<
      "short" | "medium" | "long" | "full",
      Intl.DateTimeFormatOptions
    > = {
      short: { year: "numeric", month: "short", day: "numeric" },
      medium: { year: "numeric", month: "short", day: "numeric" },
      long: { year: "numeric", month: "long", day: "numeric" },
      full: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    };

    return new Intl.DateTimeFormat("en-US", options[format]).format(date);
  } catch (error) {
    console.error("Date formatting error:", error);
    return "Invalid date";
  }
};

/**
 * Get relative time (e.g., "2 days ago", "3 hours ago")
 * @param dateString - ISO 8601 date string or Date object
 * @returns Relative time string
 */
export const getRelativeTime = (dateString: string | Date): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 604800)} weeks ago`;
    if (seconds < 31536000)
      return `${Math.floor(seconds / 2592000)} months ago`;

    return `${Math.floor(seconds / 31536000)} years ago`;
  } catch (error) {
    console.error("Relative time error:", error);
    return "Unknown";
  }
};

/**
 * Format date with time
 * @param dateString - ISO 8601 date string or Date object
 * @returns Formatted date with time (e.g., "July 16, 2026 at 11:45 PM")
 */
export const formatDateWithTime = (dateString: string | Date): string => {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  } catch (error) {
    console.error("Date formatting error:", error);
    return "Invalid date";
  }
};

/**
 * Format date for newspaper/article style
 * @param dateString - ISO 8601 date string or Date object
 * @returns Formatted date in newspaper style (e.g., "JULY 16, 2026")
 */
export const formatNewspaperDate = (dateString: string | Date): string => {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "INVALID DATE";
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date).toUpperCase();
  } catch (error) {
    console.error("Date formatting error:", error);
    return "INVALID DATE";
  }
};
