import React from 'react';
import Image from 'next/image';

const myLoader = ({ src, width, quality }) => {
  return `https://next-js-ord-helper.s3.amazonaws.com/images/${src}?w=${width}&q=${
    quality || 85
  }`;
};

const CombinationUnit = ({ unit }) => {
  if (unit.rating !== 'common')
    return (
      <div className="flex items-center mx-3 my-2">
        <Image
          className="shrink-0"
          loader={myLoader}
          alt={unit.urn}
          width={38}
          height={38}
          src={`${unit.urn}.png`}
        />
        <span className="">
          {unit.dpname} x {unit.qty}
        </span>
      </div>
    );
};

export default CombinationUnit;
