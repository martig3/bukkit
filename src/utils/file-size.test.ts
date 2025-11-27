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
            expect(formatFileSize(1024 * 1023)).toBe("1.00 MB"); // 1023 KB, almost 1 MB
        });

        it("should format sizes between 1 MB and 1 GB as MB", () => {
            expect(formatFileSize(1024 * 1024)).toBe("1.00 MB"); // 1 MB
            expect(formatFileSize(1024 * 1024 * 5)).toBe("5.00 MB"); // 5 MB
            expect(formatFileSize(1024 * 1024 * 10.5)).toBe("10.50 MB"); // 10.5 MB
            expect(formatFileSize(1024 * 1024 * 100)).toBe("100.00 MB"); // 100 MB
            expect(formatFileSize(1024 * 1024 * 500)).toBe("500.00 MB"); // 500 MB
            expect(formatFileSize(1024 * 1024 * 999)).toBe("999.00 MB"); // 999 MB
            expect(formatFileSize((1024 * 1024 * 1024) - 1)).toBe("1024.00 MB"); // Just under 1 GB, still MB
        });
    });

    describe("GB formatting", () => {
        it("should format sizes greater than 1 GB as GB with 2 decimal places", () => {
            const GB = 1024 * 1024 * 1024;
            expect(formatFileSize(GB + 1)).toBe("1.00 GB"); // Slightly over 1 GB
            expect(formatFileSize(GB * 1.5)).toBe("1.50 GB"); // 1.5 GB
            expect(formatFileSize(GB * 10)).toBe("10.00 GB"); // 10 GB
            expect(formatFileSize(GB * 100.25)).toBe("100.25 GB"); // 100.25 GB
            expect(formatFileSize(GB * 500)).toBe("500.00 GB"); // 500 GB
            expect(formatFileSize(GB * 1023)).toBe("1023.00 GB"); // 1023 GB (just under 1 TB)
            expect(formatFileSize(GB * 2048)).toBe("2048.00 GB"); // 2 TB
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

        it("should format sizes between 1 MB and 1 GB (inclusive) as MB", () => {
            expect(formatFileSize(1024 * 1024)).toBe("1.00 MB");
            expect(formatFileSize(1024 * 1024 * 5)).toBe("5.00 MB");
            expect(formatFileSize(1024 * 1024 * 10.5)).toBe("10.50 MB");
            expect(formatFileSize(1024 * 1024 * 100)).toBe("100.00 MB");
            expect(formatFileSize(1024 * 1024 * 500)).toBe("500.00 MB");
            expect(formatFileSize(1024 * 1024 * 999)).toBe("999.00 MB");
            expect(formatFileSize(1024 * 1024 * 1024)).toBe("1024.00 MB"); // Exactly 1 GB, should be MB as per logic
        });
    });

    describe("GB formatting", () => {
        const GB = 1024 * 1024 * 1024;

        it("should format sizes greater than 1 GB as GB with 2 decimal places", () => {
            expect(formatFileSize(GB + 1)).toBe("1.00 GB");
            expect(formatFileSize(GB * 1.001)).toBe("1.00 GB");
            expect(formatFileSize(GB * 1.01)).toBe("1.01 GB");
            expect(formatFileSize(GB * 1.5)).toBe("1.50 GB");
            expect(formatFileSize(GB * 10)).toBe("10.00 GB");
            expect(formatFileSize(GB * 10.512)).toBe("10.51 GB");
            expect(formatFileSize(GB * 100)).toBe("100.00 GB");
            expect(formatFileSize(GB * 500)).toBe("500.00 GB");
            expect(formatFileSize(GB * 999.99)).toBe("999.99 GB");
        });
    });
});