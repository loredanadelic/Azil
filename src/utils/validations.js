const urlPattern =
  /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
export const validateAnimalInput = ({
  name,
  type,
  examination,
  years,
  image,
}) => {
  if (
    name !== "" &&
    type !== "" &&
    examination !== "" &&
    years !== null
  ) {
    if (image !== null && image!=='') {
      if (image.match(urlPattern)) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
};
