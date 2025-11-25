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
    });
});
