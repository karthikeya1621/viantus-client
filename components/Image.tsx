import React from "react";

const Image = (props: any) => {
  return (
    <img
      src={props.src}
      className={`${props.objectFit == "contain" && "img-contain"} ${
        props.objectFit == "cover" && "img-cover"
      }`}
      style={{ objectPosition: props.objectPosition }}
      alt={props.alt}
      width={props.width}
      height={props.height}
    />
  );
};

export default Image;
