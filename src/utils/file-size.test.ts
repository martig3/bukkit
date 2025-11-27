import { describe, it, expect } from "vitest";
import { formatFileSize } from "./file-size";

describe("formatFileSize", () => {
    const KILOBYTE = 1024;
    const MEGABYTE = KILOBYTE * KILOBYTE;
    const GIGABYTE = MEGABYTE * KILOBYTE;

    describe("MB formatting", () => {
        it("should format 0 bytes as 0.00 MB", () => {
            expect(formatFileSize(0)).toBe("0.00 MB");
        });

        it("should format small sizes (< 1 MB) as MB with 2 decimal places", () => {
            expect(formatFileSize(KILOBYTE)).toBe("0.00 MB");
            expect(formatFileSize(KILOBYTE * 512)).toBe("0.50 MB");
            expect(formatFileSize(KILOBYTE * 100)).toBe("0.10 MB");
            expect(formatFileSize(KILOBYTE * 10)).toBe("0.01 MB");
        });

        it("should format sizes between 1 MB and 1 GB as MB", () => {
            expect(formatFileSize(MEGABYTE)).toBe("1.00 MB");
            expect(formatFileSize(MEGABYTE * 5)).toBe("5.00 MB");
            expect(formatFileSize(MEGABYTE * 10.5)).toBe("10.50 MB");
            expect(formatFileSize(MEGABYTE * 100)).toBe("100.00 MB");
            expect(formatFileSize(MEGABYTE * 500)).toBe("500.00 MB");
            expect(formatFileSize(MEGABYTE * 999)).toBe("999.00 MB");
        });

        it("should format exactly 1 GB as 1024.00 MB based on current implementation", () => {
            expect(formatFileSize(GIGABYTE)).toBe("1024.00 MB");
        });
    });

    describe("GB formatting", () => {
        it("should format sizes slightly above 1 GB as GB", () => {
            expect(formatFileSize(GIGABYTE + 1)).toBe("1.00 GB");
            expect(formatFileSize(GIGABYTE * 1.005)).toBe("1.01 GB");
            expect(formatFileSize(GIGABYTE * 1.01)).toBe("1.01 GB");
            expect(formatFileSize(GIGABYTE * 1.5)).toBe("1.50 GB");
            expect(formatFileSize(GIGABYTE * 1.99)).toBe("1.99 GB");
        });

        it("should format larger sizes as GB", () => {
            expect(formatFileSize(GIGABYTE * 5)).toBe("5.00 GB");
            expect(formatFileSize(GIGABYTE * 100)).toBe("100.00 GB");
            expect(formatFileSize(GIGABYTE * 10.25)).toBe("10.25 GB");
            expect(formatFileSize(GIGABYTE * 999.999)).toBe("1000.00 GB");
        });

        it("should handle sizes much larger than typical GB values (e.g., TB range)", () => {
            expect(formatFileSize(GIGABYTE * 1024)).toBe("1024.00 GB");
            expect(formatFileSize(GIGABYTE * 2048.123)).toBe("2048.12 GB");
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

        it("should format sizes between 1 MB and less than 1 GB as MB", () => {
            expect(formatFileSize(1024 * 1024)).toBe("1.00 MB"); // 1 MB
            expect(formatFileSize(1024 * 1024 * 5)).toBe("5.00 MB"); // 5 MB
            expect(formatFileSize(1024 * 1024 * 10.5)).toBe("10.50 MB"); // 10.5 MB
            expect(formatFileSize(1024 * 1024 * 100)).toBe("100.00 MB"); // 100 MB
            expect(formatFileSize(1024 * 1024 * 500)).toBe("500.00 MB"); // 500 MB
            expect(formatFileSize(1024 * 1024 * 999)).toBe("999.00 MB"); // 999 MB
        });

        it("should format exactly 1 GB as 1024.00 MB according to current logic", () => {
            const oneGB = 1024 * 1024 * 1024;
            expect(formatFileSize(oneGB)).toBe("1024.00 MB");
        });
    });

    describe("GB formatting", () => {
        it("should format sizes slightly above 1 GB as GB with 2 decimal places", () => {
            const oneGB = 1024 * 1024 * 1024;
            expect(formatFileSize(oneGB + 1)).toBe("1.00 GB"); // Just over 1 GB
            expect(formatFileSize(oneGB * 1.001)).toBe("1.00 GB"); // 1.001 GB
        });

        it("should format larger sizes as GB with 2 decimal places", () => {
            const oneGB = 1024 * 1024 * 1024;
            expect(formatFileSize(oneGB * 2)).toBe("2.00 GB"); // 2 GB
            expect(formatFileSize(oneGB * 5.5)).toBe("5.50 GB"); // 5.5 GB
            expect(formatFileSize(oneGB * 100)).toBe("100.00 GB"); // 100 GB
            expect(formatFileSize(oneGB * 1023.999)).toBe("1024.00 GB"); // Approaching 1 TB, tests rounding
            expect(formatFileSize(oneGB * 1024)).toBe("1024.00 GB"); // Exactly 1 TB
        });
    });
});