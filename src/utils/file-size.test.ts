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
            expect(formatFileSize(1)).toBe("0.00 MB"); // 1 byte
        });

        it("should format sizes between 1 MB and 1 GB as MB", () => {
            expect(formatFileSize(1024 * 1024)).toBe("1.00 MB"); // 1 MB
            expect(formatFileSize(1024 * 1024 * 5)).toBe("5.00 MB"); // 5 MB
            expect(formatFileSize(1024 * 1024 * 10.5)).toBe("10.50 MB"); // 10.5 MB
            expect(formatFileSize(1024 * 1024 * 100)).toBe("100.00 MB"); // 100 MB
            expect(formatFileSize(1024 * 1024 * 500)).toBe("500.00 MB"); // 500 MB
            expect(formatFileSize(1024 * 1024 * 999)).toBe("999.00 MB"); // 999 MB
            expect(formatFileSize(1024 * 1024 * 1023.99)).toBe("1023.99 MB"); // Just under 1 GB
        });
    });

    describe("GB formatting", () => {
        it("should format 1 GB as 1.00 GB", () => {
            expect(formatFileSize(1024 * 1024 * 1024)).toBe("1.00 GB");
        });

        it("should format sizes greater than 1 GB as GB with 2 decimal places", () => {
            expect(formatFileSize(1024 * 1024 * 1024 * 1.5)).toBe("1.50 GB"); // 1.5 GB
            expect(formatFileSize(1024 * 1024 * 1024 * 10)).toBe("10.00 GB"); // 10 GB
            expect(formatFileSize(1024 * 1024 * 1024 * 100.25)).toBe("100.25 GB"); // 100.25 GB
            expect(formatFileSize(1024 * 1024 * 1024 * 999.99)).toBe("999.99 GB"); // 999.99 GB
        });

        it("should handle very large sizes correctly", () => {
            expect(formatFileSize(1024 * 1024 * 1024 * 1000)).toBe("1000.00 GB"); // 1000 GB
            expect(formatFileSize(Number.MAX_SAFE_INTEGER)).toBe("8192.00 GB"); // Maximum safe integer
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
            expect(formatFileSize(1024 * 1024 * 1024)).toBe("1024.00 MB"); // Exactly 1 GB
        });
    });

    describe("GB formatting", () => {
        it("should format sizes greater than 1 GB as GB with 2 decimal places", () => {
            expect(formatFileSize(1024 * 1024 * 1024 + 1)).toBe("1.00 GB"); // Just over 1 GB
            expect(formatFileSize(1024 * 1024 * 1024 * 1.01)).toBe("1.01 GB"); // 1.01 GB
            expect(formatFileSize(1024 * 1024 * 1024 * 5)).toBe("5.00 GB"); // 5 GB
            expect(formatFileSize(1024 * 1024 * 1024 * 10.5)).toBe("10.50 GB"); // 10.5 GB
            expect(formatFileSize(1024 * 1024 * 1024 * 100)).toBe("100.00 GB"); // 100 GB
            expect(formatFileSize(1024 * 1024 * 1024 * 123.456)).toBe("123.46 GB"); // Decimal rounding up
            expect(formatFileSize(1024 * 1024 * 1024 * 123.454)).toBe("123.45 GB"); // Decimal rounding down
            expect(formatFileSize(1024 * 1024 * 1024 * 999.99)).toBe("999.99 GB"); // Close to 1 TB, still GB
        });
    });
});