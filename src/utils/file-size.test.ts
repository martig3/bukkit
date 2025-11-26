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

        it("should format exactly 1 GB as 1024.00 MB", () => {
            expect(formatFileSize(1024 * 1024 * 1024)).toBe("1024.00 MB"); // 1 GB
        });
    });

    describe("GB formatting", () => {
        it("should format sizes just above 1 GB as GB with 2 decimal places", () => {
            expect(formatFileSize(1024 * 1024 * 1024 + 1)).toBe("1.00 GB"); // Just over 1 GB
            expect(formatFileSize(1024 * 1024 * 1024 * 1.01)).toBe("1.01 GB"); // 1.01 GB
        });

        it("should format larger sizes as GB with 2 decimal places", () => {
            expect(formatFileSize(1024 * 1024 * 1024 * 2.5)).toBe("2.50 GB"); // 2.5 GB
            expect(formatFileSize(1024 * 1024 * 1024 * 10)).toBe("10.00 GB"); // 10 GB
            expect(formatFileSize(1024 * 1024 * 1024 * 500)).toBe("500.00 GB"); // 500 GB
            expect(formatFileSize(1024 * 1024 * 1024 * 1000)).toBe("1000.00 GB"); // 1000 GB
        });

        it("should handle floating point results for GB correctly", () => {
            expect(formatFileSize(1024 * 1024 * 1024 * 1.234)).toBe("1.23 GB"); // Should round down
            expect(formatFileSize(1024 * 1024 * 1024 * 1.236)).toBe("1.24 GB"); // Should round up
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

        it("should format exactly 1 GB as MB", () => {
            const GB = 1024 * 1024 * 1024;
            expect(formatFileSize(GB)).toBe("1024.00 MB"); // Exactly 1 GB
        });
    });

    describe("GB formatting", () => {
        it("should format sizes slightly above 1 GB as GB", () => {
            const GB = 1024 * 1024 * 1024;
            expect(formatFileSize(GB + 1)).toBe("1.00 GB");
            expect(formatFileSize(GB * 1.01)).toBe("1.01 GB"); // 1.01 GB
        });

        it("should format sizes greater than 1 GB as GB with 2 decimal places", () => {
            const GB = 1024 * 1024 * 1024;
            expect(formatFileSize(GB * 2)).toBe("2.00 GB"); // 2 GB
            expect(formatFileSize(GB * 5.5)).toBe("5.50 GB"); // 5.5 GB
            expect(formatFileSize(GB * 100)).toBe("100.00 GB"); // 100 GB
            expect(formatFileSize(GB * 1023.999)).toBe("1024.00 GB"); // Almost 1 TB
        });
    });
});