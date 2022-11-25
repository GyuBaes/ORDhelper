import React, { useRef } from 'react';
import Image from 'next/image';
import LessUnit from './LessUnit';
import CombinationUnit from './CombinationUnit';

import {
  getCombination,
  getPercent2,
  getPercent3,
  getLessUnit2,
  setCombination,
} from '../calculator';

const myLoader = ({ src, width, quality }) => {
  return `https://next-js-ord-helper.s3.ap-northeast-2.amazonaws.com/images/${src}?w=${width}&q=${
    quality || 100
  }`;
};

const Unit = ({
  unit,
  unitLst,
  setUnitLst,
  description,
  attack,
  burgess,
  cautionAura,
  dpStun,
  dpSpeed,
  dpDefense,
  dpBoss,
  commonExceptPercent,
}) => {
  const getindex = () => {
    let index = 0;
    unitLst.forEach((u, i) => {
      if (u.name === unit.name) {
        index = i;
      }
    });
    return index;
  };
  const nowIndex = getindex();

  const handleQty = (e) => {
    const ckeckNum = /^[0-9]+$/;
    if (!ckeckNum.test(e.target.value)) e.target.value = unit.qty;
    const temp = { qty: +e.target.value };
    const newUnitLst = unitLst.map((u) =>
      u.urn === unit.urn ? { ...u, ...temp } : u,
    );
    setUnitLst(newUnitLst);
  };

  const addQty = (e) => {
    // if (e.shiftKey === false && e.altKey === false) {
    //   const temp = { qty: Number(unit.qty + 1) };
    //   const newUnitLst = unitLst.map((u) =>
    //     u.urn === unit.urn ? { ...u, ...temp } : u,
    //   );
    //   setUnitLst(newUnitLst);
    //   return;
    // }
    if (e.shiftKey === false && e.altKey === false) {
      unitLst[nowIndex].qty += 1;
      setUnitLst([...unitLst]);
      return;
    }
    // if (e.shiftKey === true) {
    //   const temp = { qty: unit.qty === 0 ? 0 : Number(unit.qty - 1) };
    //   const newUnitLst = unitLst.map((u) =>
    //     u.urn === unit.urn ? { ...u, ...temp } : u,
    //   );
    //   setUnitLst(newUnitLst);
    //   return;
    // }
    if (e.shiftKey === true) {
      unitLst[nowIndex].qty > 0
        ? (unitLst[nowIndex].qty -= 1)
        : (unitLst[nowIndex].qty = 0);
      setUnitLst([...unitLst]);
      return;
    }
    if (
      (e.altKey && unit.rating === 'limited') ||
      unit.rating === 'eternity' ||
      unit.rating === 'immortal' ||
      unit.rating === 'transcendence'
    ) {
      const newUnitLst = unitLst.filter((u) => u.name !== unit.name);
      setUnitLst(newUnitLst);
      return;
    }
  };

  const qtyInput = useRef();
  const focus = () => {
    qtyInput.current.select();
  };

  const inputRightClick = (e) => {
    e.preventDefault();
  };

  const handleSetCombi = (e) => {
    e.preventDefault();
    if (percent >= 100) {
      const newUnitLst = setCombination(unitLst, unitLst[nowIndex]).map(
        (u) => u,
      );
      setUnitLst(newUnitLst);
    }
  };
  // console.log(getLessUnit2(unitLst, unitLst[nowIndex]));
  const combination = getCombination(unitLst[nowIndex]);
  const lessUnitList = getLessUnit2(unitLst, unitLst[nowIndex]);
  const percent = getPercent3(unitLst, unitLst[nowIndex]);
  const exceptCommonPercent = getPercent2(unitLst, unitLst[nowIndex]);

  let dpPercent = '';
  if (!commonExceptPercent) {
    dpPercent = percent.toString();
    if (percent % 1 !== 0) {
      dpPercent = percent.toString().split('.')[0];
    }
  }
  if (commonExceptPercent) {
    dpPercent = exceptCommonPercent.toString();
    if (percent % 1 !== 0) {
      dpPercent = exceptCommonPercent.toString().split('.')[0];
    }
  }

  const progressPercent = dpPercent >= 100 ? 100 : dpPercent.substring(0, 2);
  return (
    <div className="flex items-center mb-[1px]  pc:mb-[2px] ">
      <div className="relative flex h-[21px] w-[24.5px] pc:h-[28px] pc:w-[33px] items-center group ">
        <Image
          className="z-30 rounded-l-sm shrink-0"
          loader={myLoader}
          alt={unit.urn}
          layout="fill"
          src={`${unit.urn}.png`}
        />
        <div className="fixed z-50  bottom-10 right-5 bg-zinc-100 text-black dark:text-zinc-100 dark:bg-zinc-600 rounded-sm  animate-[opacity] hidden group-hover:flex">
          {lessUnitList?.map((unit) => {
            return <LessUnit unit={unit} key={unit.urn} />;
          })}
        </div>
      </div>
      <div className="relative flex items-center w-full bg-neutral-50 hover:dark:bg-zinc-600 hover:bg-zinc-100 dark:text-zinc-200 dark:bg-zinc-700 group ">
        <div
          className="relative h-[21px] pc:h-[28px]  flex-1   whitespace-nowrap"
          onClick={addQty}
          onContextMenu={handleSetCombi}
        >
          <div
            className={
              progressPercent === 100
                ? 'absolute top-0 left-0  w-full h-full flex items-center bg-yellow-200 dark:bg-yellow-800 opacity-100'
                : 'absolute top-0 left-0  w-full h-full flex items-center bg-sky-200 dark:bg-sky-800  opacity-100'
            }
            style={{ width: progressPercent + '%' }}
          >
            <span className="pl-[0.15rem] text-[0.5rem]">
              {dpPercent === '0' || unit.name === '위습'
                ? ''
                : dpPercent?.length === 1
                ? `${dpPercent}%\u00A0`
                : dpPercent?.length === 2
                ? `${dpPercent}%\u00A0`
                : dpPercent?.length === 3
                ? `(${dpPercent[0]})\u00A0`
                : dpPercent?.length === 4
                ? `(${dpPercent[0]}${dpPercent[1]})`
                : dpPercent?.length === 5
                ? `(${dpPercent[0]}${dpPercent[1]})`
                : ''}
            </span>
            <span
              className={
                attack === true
                  ? unit.attack === 'ad'
                    ? 'text-[0.8rem] pr-[3px] dark:text-rose-400 text-red-600'
                    : unit.attack === 'ap'
                    ? 'text-[0.8rem] pr-[3px]  dark:text-indigo-400 text-blue-600'
                    : 'text-[0.8rem] pr-[3px]'
                  : 'text-[0.8rem] pr-[3px]'
              }
            >
              {unit.dpname}
            </span>

            <span className={burgess ? 'text-xs' : 'hidden pr-0'}>
              {unit?.burgess && '🅥\u00A0'}
            </span>
            <span className={cautionAura ? 'text-xs' : 'hidden pr-0'}>
              {unit?.cautionAura && '※중복오라\u00A0'}
            </span>
            <span className={dpStun ? 'text-xs' : 'hidden pr-0'}>
              {unit?.stun && unit?.stun + '스턴\u00A0'}
            </span>
            <span className={dpStun ? 'text-xs' : 'hidden pr-0'}>
              {dpStun && unit?.singleStun}
            </span>
            <span className={dpDefense ? 'text-xs ' : 'hidden'}>
              {unit?.decreaseDefense && '깍' + unit?.decreaseDefense}
            </span>
            <span className={dpDefense ? 'text-xs ' : 'hidden'}>
              {unit?.onOffDecreaseDefense &&
                '\u00A0발동깍' + unit?.onOffDecreaseDefense}
            </span>
            <span className={dpDefense ? 'text-xs ' : 'hidden'}>
              {unit?.armorBreak && '\u00A0' + unit?.armorBreak}
            </span>
            <span className={dpSpeed ? 'text-xs ' : 'hidden'}>
              {unit?.decreaseSpeed && '\u00A0이감' + unit?.decreaseSpeed}
            </span>
            <span className={dpSpeed ? 'text-xs ' : 'hidden'}>
              {unit?.onOffDecreaseSpeed &&
                '\u00A0발동이감' + unit?.onOffDecreaseSpeed}
            </span>
            <span className={dpBoss ? 'text-xs ' : 'hidden'}>
              {unit?.boss && '\u00A0' + unit?.boss}
            </span>
            <span className={description ? 'text-xs ' : 'hidden'}>
              {unit?.description && '\u00A0' + unit?.description}
            </span>
          </div>
        </div>
        <div className="fixed z-50  bottom-[100px]   right-5 rounded-sm  bg-zinc-100 text-black dark:text-zinc-100 dark:bg-zinc-600 animate-[opacity] hidden group-hover:flex">
          <span className={unit.etc !== undefined ? 'mx-2 my-1' : 'hidden'}>
            {unit?.etc}
          </span>
        </div>
        <div className="fixed z-50  bottom-10 right-5 rounded-sm  bg-zinc-100 text-black dark:text-zinc-100 dark:bg-zinc-600 animate-[opacity] hidden group-hover:flex">
          {combination?.map((unit) => {
            return <CombinationUnit unit={unit} key={unit.urn} />;
          })}
        </div>
      </div>

      <input
        className="flex-none w-[1.2rem] h-[21px] pc:h-[28px] bg-zinc-100 dark:bg-zinc-600 font-light text-sm text-center  rounded-r-sm "
        type="text"
        value={unit.qty}
        onChange={handleQty}
        ref={qtyInput}
        onClick={focus}
        onContextMenu={() => {
          inputRightClick(e);
        }}
      />
    </div>
  );
};

export default Unit;
