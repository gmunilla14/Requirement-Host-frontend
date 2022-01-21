const Pill = ({ text, color }) => {

  const redString = color.substring(1, 3);
  const greenString = color.substring(3, 5);
  const blueString = color.substring(5, 7);

  let red = parseInt(redString, 16);
  let green = parseInt(greenString, 16);
  let blue = parseInt(blueString, 16);

  var textColor = "#000000";
  /*---------------------USING W3C STANDARDS-------------------

  if ((red / 255.0) <= 0.039287) {
    red = red / (12.92 * 255);
  } else {
    red = ((red / 255.0 + 0.055) / 1.055) ^ 2.4;
  }

  if ((green / 255.0) <= 0.039287) {
    green = green / (12.92 * 255);
  } else {
    green = ((green / 255.0 + 0.055) / 1.055) ^ 2.4;
  }

  if ((blue / 255.0) <= 0.039287) {
    blue = blue / (12.92 * 255);
  } else {
    blue = ((blue / 255.0 + 0.055) / 1.055) ^ 2.4;
  }

  if ((0.2126 * red + 0.7152 * green + 0.0722 * blue) > 0.179) {
    textColor = "#000000";
  } else {
    textColor = "#ffffff";
  }
  */

  if((red*0.299 + green*0.587 + blue*0.114) > 186) {
      textColor = '#000000'
  } else {
      textColor = '#ffffff'
  }

  return (
    <div className="pill-holder" style={{ background: color }}>
      <div className="pill-text" style={{color: textColor}}>{text}</div>
    </div>
  );
};

export default Pill;
