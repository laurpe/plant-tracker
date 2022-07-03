import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import isTomorrow from "dayjs/plugin/isTomorrow";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(isTomorrow);

const formatNextWatering = (nextWatering: dayjs.Dayjs) => {
    const now = dayjs();

    const daysToNext = dayjs().to(nextWatering);

    if (nextWatering.isBefore(now)) {
        const daysMissed = dayjs().to(nextWatering, true);

        if (nextWatering.diff(now, "hour") <= 24) {
            return "water today";
        }
        return `watering late by ${daysMissed}`;
    }

    if (nextWatering.isTomorrow()) {
        return "water tomorrow";
    }

    return `water ${daysToNext}`;
};

export default formatNextWatering;
