// to convert a File type to base64 string to be saved in the database
export function getBase64(file, func) {
  var reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => func(reader.result)
  reader.onerror = function (error) {
    console.log("Error: ", error)
  }
}
