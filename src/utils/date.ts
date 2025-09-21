import moment from "moment";

export const formatDateView = (str_date: string) => {
  if (!str_date) {
    return "-";
  }

  const date = moment(str_date).format("DD-MM-YYYY HH:mm:ss");
  return date;
};
