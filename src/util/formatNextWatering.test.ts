import formatNextWatering from "./formatNextWatering";
import dayjs from "dayjs";

describe("date is formatted correctly when", () => {
    test("next watering is tomorrow", () => {
        const tomorrow = dayjs().add(1, "day").utcOffset(0).startOf("date");
        console.log("tomorrow", tomorrow);

        const nextWatering = formatNextWatering(tomorrow);

        expect(nextWatering).toBe("water tomorrow");
    });
});
