import { describe, it, expect } from "vitest";
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
            expect(formatFileSize(1024 * 1024 - 1)).toBe("1.00 MB");
        });

        it("should format sizes between 1 MB and 1 GB as MB", () => {
            expect(formatFileSize(1024 * 1024)).toBe("1.00 MB");
            expect(formatFileSize(1024 * 1024 * 5)).toBe("5.00 MB");
            expect(formatFileSize(1024 * 1024 * 10.5)).toBe("10.50 MB");
            expect(formatFileSize(1024 * 1024 * 100)).toBe("100.00 MB");
            expect(formatFileSize(1024 * 1024 * 500)).toBe("500.00 MB");
            expect(formatFileSize(1024 * 1024 * 999)).toBe("999.00 MB");
            expect(formatFileSize(1024 * 1024 * 1023)).toBe("1023.00 MB");
        });
    });

    describe("GB formatting", () => {
        const GB = 1024 * 1024 * 1024;

        it("should format sizes equal to 1 GB as 1.00 GB", () => {
            expect(formatFileSize(GB)).toBe("1.00 GB");
        });

        it("should format sizes greater than 1 GB as GB with 2 decimal places", () => {
            expect(formatFileSize(GB * 1.5)).toBe("1.50 GB");
            expect(formatFileSize(GB * 10)).toBe("10.00 GB");
            expect(formatFileSize(GB * 100)).toBe("100.00 GB");
            expect(formatFileSize(GB * 10.123)).toBe("10.12 GB");
            expect(formatFileSize(GB * 1024)).toBe("1024.00 GB");
            expect(formatFileSize(GB * 2000)).toBe("2000.00 GB");
        });

        it("should correctly handle values slightly below the GB threshold", () => {
            expect(formatFileSize(GB - 1)).toBe("1023.99 MB");
            expect(formatFileSize(GB * 0.999999)).toBe("1024.00 MB");
        });
    });

    describe("Edge cases and negative values", () => {
        const MB = 1024 * 1024;
        const GB = 1024 * 1024 * 1024;

        it("should handle negative sizes", () => {
            expect(formatFileSize(-1)).toBe("0.00 MB");
            expect(formatFileSize(-1024 * 500)).toBe("-0.49 MB");
            expect(formatFileSize(-MB)).toBe("-1.00 MB");
            expect(formatFileSize(-GB)).toBe("-1.00 GB");
            expect(formatFileSize(-(GB * 2.5))).toBe("-2.50 GB");
        });

        it("should handle NaN, Infinity, and -Infinity", () => {
            expect(formatFileSize(Number.NaN)).toBe("NaN MB");
            expect(formatFileSize(Number.POSITIVE_INFINITY)).toBe("Infinity MB");
            expect(formatFileSize(Number.NEGATIVE_INFINITY)).toBe("-Infinity MB");

            expect(formatFileSize(Number.POSITIVE_INFINITY * 2)).toBe("Infinity GB");
            expect(formatFileSize(Number.NEGATIVE_INFINITY * 2)).toBe("-Infinity GB");
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
    });

    describe("GB formatting", () => {
        it("should format sizes greater than 1 GB as GB with 2 decimal places", () => {
            expect(formatFileSize(1024 * 1024 * 1024)).toBe("1.00 GB"); // Exactly 1 GB (edge case from MB to GB)
            expect(formatFileSize(1024 * 1024 * 1024 * 1.01)).toBe("1.01 GB"); // Just over 1 GB
            expect(formatFileSize(1024 * 1024 * 1024 * 2)).toBe("2.00 GB"); // 2 GB
            expect(formatFileSize(1024 * 1024 * 1024 * 15.75)).toBe("15.75 GB"); // 15.75 GB
            expect(formatFileSize(1024 * 1024 * 1024 * 100)).toBe("100.00 GB"); // 100 GB
            expect(formatFileSize(1024 * 1024 * 1024 * 1023.999)).toBe("1024.00 GB"); // Large GB value, check rounding
        });
    });
});