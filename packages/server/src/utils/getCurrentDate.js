module.exports = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getUTCMonth();
  const day = date.getDate();

  const currentDate = `${year}-${month}-${day}`;

  return currentDate;
};
