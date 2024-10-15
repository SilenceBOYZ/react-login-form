function formatDate(date) {
  const format = new Date(date);
  return format.getDate() + "-" + (parseInt(format.getMonth()) + 1) + "-" + format.getFullYear();
}

export { formatDate }