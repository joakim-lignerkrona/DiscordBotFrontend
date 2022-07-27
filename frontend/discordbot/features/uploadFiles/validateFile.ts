export function validateFile(file) {
  console.log("--filevalidator--");
  console.log(file);
  if (!file) {
    return null;
  }
  if (file.type !== "audio/mpeg") {
    return {
      code: "Not audio",
      message: "The file must be of type .mp3",
    };
  }
  if (file.size > 1000000) {
    return {
      code: "Too lage",
      message: "The file must me under 1Mb",
    };
  }
  return null;
}
