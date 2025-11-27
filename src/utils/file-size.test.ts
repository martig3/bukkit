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
            expect(formatFileSize(1024 * 1024 - 1)).toBe("1.00 MB"); // Just under 1 MB, still formats as MB
        });

        it("should format sizes between 1 MB and 1 GB as MB", () => {
            expect(formatFileSize(1024 * 1024)).toBe("1.00 MB"); // 1 MB
            expect(formatFileSize(1024 * 1024 * 5)).toBe("5.00 MB"); // 5 MB
            expect(formatFileSize(1024 * 1024 * 10.5)).toBe("10.50 MB"); // 10.5 MB
            expect(formatFileSize(1024 * 1024 * 100)).toBe("100.00 MB"); // 100 MB
            expect(formatFileSize(1024 * 1024 * 500)).toBe("500.00 MB"); // 500 MB
            expect(formatFileSize(1024 * 1024 * 999)).toBe("999.00 MB"); // 999 MB
            expect(formatFileSize(1024 * 1024 * 1024 - 1)).toBe("1024.00 MB"); // Just under 1 GB, still MB
        });

        it("should format sizes exactly 1 GB as MB", () => {
            const oneGB = 1024 * 1024 * 1024;
            expect(formatFileSize(oneGB)).toBe("1024.00 MB");
        });
    });

    describe("GB formatting", () => {
        it("should format sizes slightly greater than 1 GB as GB", () => {
            const oneGB = 1024 * 1024 * 1024;
            expect(formatFileSize(oneGB + 1)).toBe("1.00 GB"); // 1 GB + 1 byte
            expect(formatFileSize(oneGB * 1.001)).toBe("1.00 GB"); // 1.001 GB
        });

        it("should format larger sizes as GB with 2 decimal places", () => {
            expect(formatFileSize(1024 * 1024 * 1024 * 2)).toBe("2.00 GB"); // 2 GB
            expect(formatFileSize(1024 * 1024 * 1024 * 10.5)).toBe("10.50 GB"); // 10.5 GB
            expect(formatFileSize(1024 * 1024 * 1024 * 500)).toBe("500.00 GB"); // 500 GB
            expect(formatFileSize(1024 * 1024 * 1024 * 1000)).toBe("1000.00 GB"); // 1000 GB
        });
    });
});import { describe, it, expect } from "vitest";
import { formatFileSize } from "./file-size";

describe("formatFileSize", () => {
    const MB = 1024 * 1024;
    const GB = 1024 * 1024 * 1024;

    describe("MB formatting", () => {
        it("should format 0 bytes as 0.00 MB", () => {
            expect(formatFileSize(0)).toBe("0.00 MB");
        });

        it("should format small sizes (< 1 MB) as MB with 2 decimal places", () => {
            expect(formatFileSize(1024)).toBe("0.00 MB");
            expect(formatFileSize(1024 * 512)).toBe("0.50 MB");
            expect(formatFileSize(1024 * 100)).toBe("0.10 MB");
            expect(formatFileSize(10)).toBe("0.00 MB");
        });

        it("should format sizes between 1 MB and 1 GB as MB", () => {
            expect(formatFileSize(MB)).toBe("1.00 MB");
            expect(formatFileSize(MB * 5)).toBe("5.00 MB");
            expect(formatFileSize(MB * 10.5)).toBe("10.50 MB");
            expect(formatFileSize(MB * 100)).toBe("100.00 MB");
            expect(formatFileSize(MB * 500)).toBe("500.00 MB");
            expect(formatFileSize(MB * 999)).toBe("999.00 MB");
            expect(formatFileSize(GB)).toBe("1024.00 MB");
        });
    });

    describe("GB formatting", () => {
        it("should format sizes slightly above 1 GB as GB", () => {
            expect(formatFileSize(GB + 1)).toBe("1.00 GB");
            expect(formatFileSize(GB * 1.01)).toBe("1.01 GB");
        });

        it("should format multiple GB sizes as GB", () => {
            expect(formatFileSize(GB * 2)).toBe("2.00 GB");
            expect(formatFileSize(GB * 10.5)).toBe("10.50 GB");
            expect(formatFileSize(GB * 100)).toBe("100.00 GB");
            expect(formatFileSize(GB * 500.75)).toBe("500.75 GB");
        });
        
        it("should handle large and precise GB values correctly", () => {
            expect(formatFileSize(GB * 123.456)).toBe("123.46 GB");
            expect(formatFileSize(GB * 123.454)).toBe("123.45 GB");
        });
    });

    describe("Negative sizes", () => {
        it("should format negative sizes correctly as MB", () => {
            expect(formatFileSize(-100)).toBe("0.00 MB");
            expect(formatFileSize(-1024 * 512)).toBe("-0.50 MB");
            expect(formatFileSize(-MB)).toBe("-1.00 MB");
            expect(formatFileSize(-MB * 5)).toBe("-5.00 MB");
            expect(formatFileSize(-GB * 2)).toBe("-2048.00 MB");
        });
    });
});