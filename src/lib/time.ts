import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseJSON from "date-fns/parseJSON";

export const distanceToNow = (
  input: Parameters<typeof parseJSON>[0]
): string => {
  try {
    const parsed = parseJSON(input);
    return formatDistanceToNow(parsed);
  } catch (error) {
    console.error(error);
    return input.toString();
  }
};

export const formatTimestamp = (
  input: Parameters<typeof parseJSON>[0]
): string => {
  try {
    const parsed = parseJSON(input);
    return format(parsed, "E dd/MM/yyyy hh:mm a");
  } catch (error) {
    console.error(error);
    return input.toString();
  }
};
