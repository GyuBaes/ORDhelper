import React from 'react';
import Image from 'next/image';

const myLoader = ({ src, width, quality }) => {
  return `https://next-js-ord-helper.s3.ap-northeast-2.amazonaws.com/images/${src}?w=${width}&q=${
    quality || 50
  }`;
};

const LessUnit = ({ unit }) => {
  if (unit.rating !== 'common' && unit.qty !== 0)
    return (
      <div className={'mx-3 flex items-center my-2'}>
        <Image
          className="shrink-0"
          loader={myLoader}
          alt={unit.urn}
          width={30}
          height={30}
          src={`${unit.urn}.png`}
        />
        <span className="">{unit.qty ? unit.name : ''}</span>
        <span className="">{unit.qty ? ' x ' : ''}</span>
        <span>{unit.qty ? unit.qty : ''}</span>
      </div>
    );
};

export default LessUnit;
