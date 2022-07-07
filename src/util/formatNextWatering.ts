import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import isTomorrow from "dayjs/plugin/isTomorrow";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(isTomorrow);
dayjs.extend(isToday);

const config = {
    thresholds: [
        { l: "s", r: 1 },
        { l: "m", r: 1 },
        { l: "mm", r: 59, d: "minute" },
        { l: "h", r: 1 },
        { l: "hh", r: 23, d: "hour" },
        { l: "d", r: 1 },
        { l: "dd", r: 29, d: "day" },
        { l: "M", r: 1 },
        { l: "MM", r: 11, d: "month" },
        { l: "y" },
        { l: "yy", d: "year" },
    ],
};

dayjs.extend(relativeTime, config);

const formatNextWatering = (nextWatering: dayjs.Dayjs) => {
    const today = dayjs().utcOffset(0).startOf("date");

    const daysToNext = today.to(nextWatering);

    if (nextWatering.isBefore(today)) {
        const daysMissed = today.to(nextWatering, true);

        return `watering late by ${daysMissed}`;
    }

    if (nextWatering.isToday()) {
        return "water today";
    }

    if (nextWatering.isTomorrow()) {
        return "water tomorrow";
    }

    return `water ${daysToNext}`;
};

export default formatNextWatering;
