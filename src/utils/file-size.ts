function formatFileSize(size: number) {
  return (size / 1_000_000).toFixed(2) + ' MB';
}

export { formatFileSize };
