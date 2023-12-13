export const checkImage = (file) => {
  let err = "";
  if (!file) return (err = "File does not exist.");

  if (file.size > 10240 * 10240)// 10mb
    err = "The largest image size is 10mb.";

  if (
    file.type !== "image/jpeg" &&
    file.type !== "image/png" &&
    file.type !== "image/jpg"
  )
    err = `Incorrect file format.!!(valid format: jpeg, png, jpg)`;

    return err;
};
