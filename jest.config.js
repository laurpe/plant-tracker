export default {
    preset: "ts-jest/presets/js-with-ts",
    testEnvironment: "jsdom",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    testMatch: ["<rootDir>/src/**/*.(test|spec).(ts|tsx|js|jsx)"],
};
