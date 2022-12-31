function formatFileSize(size: number) {
  const GB = 1024 * 1024 * 1024;
  if (size > GB) {
    return (size / GB).toFixed(2) + ' GB';
  }
  const MB = 1024 * 1024;
  return (size / MB).toFixed(2) + ' MB';
}

export { formatFileSize };
