import { addMinutes, format, formatDistanceToNow } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export function timeAgoIST(timestamp) {
    const istDate = toZonedTime(timestamp, "Asia/Kolkata");

    const dateInIST = addMinutes(istDate, 330);

    return `${formatDistanceToNow(dateInIST)} ago`;
}

export function formatDateIST(timestamp) {
    const istDate = toZonedTime(timestamp, "Asia/Kolkata");

    const dateInIST = addMinutes(istDate, 330);

    return format(dateInIST, "dd MMMM yyyy, hh:mm a", {
        timeZone: "Asia/Kolkata",
    });
}
