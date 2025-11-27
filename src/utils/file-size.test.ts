import { describe, it, expect } from "vitest";
import { formatFileSize } from "./file-size";

describe("formatFileSize", () => {
    describe("MB formatting", () => {
        it("should format 0 bytes as 0.00 MB", () => {
            expect(formatFileSize(0)).toBe("0.00 MB");
        });

        it("should format small sizes (< 1 MB) as MB with 2 decimal places", () => {
            expect(formatFileSize(1024)).toBe("0.00 MB"); // 1 KB
            expect(formatFileSize(1024 * 512)).toBe("0.50 MB"); // 512 KB
            expect(formatFileSize(1024 * 100)).toBe("0.10 MB"); // 100 KB
        });

        it("should format sizes between 1 MB and 1 GB as MB", () => {
            expect(formatFileSize(1024 * 1024)).toBe("1.00 MB"); // 1 MB
            expect(formatFileSize(1024 * 1024 * 5)).toBe("5.00 MB"); // 5 MB
            expect(formatFileSize(1024 * 1024 * 10.5)).toBe("10.50 MB"); // 10.5 MB
            expect(formatFileSize(1024 * 1024 * 100)).toBe("100.00 MB"); // 100 MB
            expect(formatFileSize(1024 * 1024 * 500)).toBe("500.00 MB"); // 500 MB
            expect(formatFileSize(1024 * 1024 * 999)).toBe("999.00 MB"); // 999 MB
        });

        it("should format sizes slightly below 1 GB as MB", () => {
            const oneGBMinusOneByte = (1024 * 1024 * 1024) - 1;
            expect(formatFileSize(oneGBMinusOneByte)).toBe("1023.99 MB"); // Should not trigger GB formatting
        });
    });

    describe("GB formatting", () => {
        it("should format sizes exactly at 1 GB as 1.00 GB", () => {
            const oneGB = 1024 * 1024 * 1024;
            expect(formatFileSize(oneGB)).toBe("1.00 GB");
        });

        it("should format sizes greater than 1 GB as GB with 2 decimal places", () => {
            const twoGB = 1024 * 1024 * 1024 * 2;
            const fivePointFiveGB = 1024 * 1024 * 1024 * 5.5;
            const tenPointSevenFiveGB = 1024 * 1024 * 1024 * 10.75;
            const largeGB = 1024 * 1024 * 1024 * 1000; // 1000 GB

            expect(formatFileSize(twoGB)).toBe("2.00 GB");
            expect(formatFileSize(fivePointFiveGB)).toBe("5.50 GB");
            expect(formatFileSize(tenPointSevenFiveGB)).toBe("10.75 GB");
            expect(formatFileSize(largeGB)).toBe("1000.00 GB");
        });

        it("should handle floating point GB values correctly with rounding", () => {
            // Value that would round up to .01
            const slightlyMoreThanOneGB = (1024 * 1024 * 1024) * 1.005;
            expect(formatFileSize(slightlyMoreThanOneGB)).toBe("1.01 GB");

            // Value that would round down to .00
            const slightlyLessThanOnePointZeroOneGB = (1024 * 1024 * 1024) * 1.004;
            expect(formatFileSize(slightlyLessThanOnePointZeroOneGB)).toBe("1.00 GB");

            // Value ending in 99.5 which should round up to .00
            const valueRoundingUp = (1024 * 1024 * 1024) * 1.23995;
            expect(formatFileSize(valueRoundingUp)).toBe("1.24 GB");
        });
    });
});import { describe, it, expect } from "vitest";
import { formatFileSize } from "./file-size";

describe("formatFileSize", () => {
    describe("MB formatting", () => {
        it("should format 0 bytes as 0.00 MB", () => {
            expect(formatFileSize(0)).toBe("0.00 MB");
        });

        it("should format small sizes (< 1 MB) as MB with 2 decimal places", () => {
            expect(formatFileSize(1024)).toBe("0.00 MB");
            expect(formatFileSize(1024 * 512)).toBe("0.50 MB");
            expect(formatFileSize(1024 * 100)).toBe("0.10 MB");
        });

        it("should format sizes between 1 MB and 1 GB (exclusive) as MB", () => {
            expect(formatFileSize(1024 * 1024)).toBe("1.00 MB");
            expect(formatFileSize(1024 * 1024 * 5)).toBe("5.00 MB");
            expect(formatFileSize(1024 * 1024 * 10.5)).toBe("10.50 MB");
            expect(formatFileSize(1024 * 1024 * 100)).toBe("100.00 MB");
            expect(formatFileSize(1024 * 1024 * 500)).toBe("500.00 MB");
            expect(formatFileSize(1024 * 1024 * 999)).toBe("999.00 MB");
        });

        it("should format exactly 1 GB as 1024.00 MB", () => {
            const ONE_GB_BYTES = 1024 * 1024 * 1024;
            expect(formatFileSize(ONE_GB_BYTES)).toBe("1024.00 MB");
        });
    });

    describe("GB formatting", () => {
        const ONE_GB_BYTES = 1024 * 1024 * 1024;

        it("should format sizes just over 1 GB as GB", () => {
            expect(formatFileSize(ONE_GB_BYTES + 1)).toBe("1.00 GB");
            expect(formatFileSize(ONE_GB_BYTES * 1.001)).toBe("1.00 GB");
            expect(formatFileSize(ONE_GB_BYTES * 1.01)).toBe("1.01 GB");
        });

        it("should format multiple GB sizes as GB", () => {
            expect(formatFileSize(ONE_GB_BYTES * 2)).toBe("2.00 GB");
            expect(formatFileSize(ONE_GB_BYTES * 10)).toBe("10.00 GB");
            expect(formatFileSize(ONE_GB_BYTES * 50.5)).toBe("50.50 GB");
            expect(formatFileSize(ONE_GB_BYTES * 100)).toBe("100.00 GB");
        });

        it("should handle large GB sizes", () => {
            expect(formatFileSize(ONE_GB_BYTES * 1023)).toBe("1023.00 GB");
            expect(formatFileSize(ONE_GB_BYTES * 2000)).toBe("2000.00 GB");
        });

        it("should format sizes requiring rounding to 2 decimal places", () => {
            expect(formatFileSize(ONE_GB_BYTES * 1.235)).toBe("1.24 GB");
            expect(formatFileSize(ONE_GB_BYTES * 4.564)).toBe("4.56 GB");
            expect(formatFileSize(ONE_GB_BYTES * 7.80)).toBe("7.80 GB");
        });
    });
});