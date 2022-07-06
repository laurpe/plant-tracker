import formatNextWatering from "./formatNextWatering";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { expect } from "@jest/globals";

dayjs.extend(utc);

describe("date is formatted correctly when", () => {
    test("next watering was 30 days ago", () => {
        const monthAgo = dayjs()
            .subtract(30, "day")
            .utcOffset(0)
            .startOf("date");

        const nextWatering = formatNextWatering(monthAgo);

        expect(nextWatering).toBe("watering late by a month");
    });

    test("next watering was 30 days ago", () => {
        const daysAgo = dayjs().subtract(8, "day").utcOffset(0).startOf("date");

        const nextWatering = formatNextWatering(daysAgo);

        expect(nextWatering).toBe("watering late by 8 days");
    });

    test("next watering was 1 day ago", () => {
        const yesterday = dayjs()
            .subtract(1, "day")
            .utcOffset(0)
            .startOf("date");

        const nextWatering = formatNextWatering(yesterday);

        expect(nextWatering).toBe("watering late by a day");
    });

    test("next watering is today", () => {
        const today = dayjs().utcOffset(0).startOf("date");

        const nextWatering = formatNextWatering(today);

        expect(nextWatering).toBe("water today");
    });

    test("next watering is tomorrow", () => {
        const tomorrow = dayjs().add(1, "day").utcOffset(0).startOf("date");

        const nextWatering = formatNextWatering(tomorrow);

        expect(nextWatering).toBe("water tomorrow");
    });

    test("next watering is in 5 days", () => {
        const fiveDaysFromNow = dayjs()
            .add(5, "day")
            .utcOffset(0)
            .startOf("date");

        const nextWatering = formatNextWatering(fiveDaysFromNow);

        expect(nextWatering).toBe("water in 5 days");
    });
});
