import React, { useState, useEffect } from 'react';
import { unitList } from '../unit';
import Unit from '../components/Unit';

const Home = () => {
  const [unitLst, setUnitLst] = useState(unitList);
  const [description, setDescription] = useState(false);
  const [dpSpeed, setDpSpeed] = useState(false);
  const [dpDefense, setDpDefense] = useState(false);
  const [dpBoss, setDpBoss] = useState(false);
  const [attack, setAttack] = useState(false);
  const [dpStun, setDpStun] = useState(false);
  const [burgess, setBurgess] = useState(false);
  const [cautionAura, setCautionAura] = useState(false);
  const [helpCenter, setHelpCenter] = useState(false);
  const [commonExceptPercent, setCommonExceptPercent] = useState(false);
  const [stun, setStun] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [onOffSpeed, setOnOffSpeed] = useState(0);
  const [defense, setDefense] = useState(0);
  const [onOffDefense, setOnOffDefense] = useState(0);
  const [single, setSingle] = useState(0);
  const [tr, setTr] = useState(true);
  const [im, setIm] = useState(true);
  const [et, setEt] = useState(true);
  const [ltd, setLtd] = useState(true);
  const [rltd, setRltd] = useState(true);

  const common = unitLst.filter((unit) => unit?.rating === 'common');
  const uncommon = unitLst.filter((unit) => unit?.rating === 'uncommon');
  const unique = unitLst.filter((unit) => unit?.rating === 'unique');
  const rare = unitLst.filter((unit) => unit?.rating === 'rare');
  const legendary = unitLst.filter((unit) => unit?.rating === 'legendary');
  const hidden = unitLst.filter((unit) => unit?.rating === 'hidden');
  const changed = unitLst.filter((unit) => unit?.rating === 'changed');
  const transcendence = unitLst.filter(
    (unit) => unit?.rating === 'transcendence',
  );
  const immortal = unitLst.filter((unit) => unit?.rating === 'immortal');
  const eternity = unitLst.filter((unit) => unit?.rating === 'eternity');
  const limited = unitLst.filter((unit) => unit?.rating === 'limited');
  const randomltd = unitLst.filter((unit) => unit?.rating === 'randomltd');

  useEffect(() => {
    if (unitLst) {
      const stunTemp = unitLst.reduce((acc, cur) => {
        if (cur?.qty && typeof cur.stun === 'number') acc += cur.qty * cur.stun;
        return acc;
      }, 0);
      let temp = stunTemp?.toString();
      if (temp.length > 3) temp = [...temp[0], ...temp[1], ...temp[2]];
      setStun(temp);

      setSpeed(
        unitLst.reduce((acc, cur) => {
          if (cur?.qty && typeof cur.decreaseSpeed === 'number')
            acc += cur.decreaseSpeed;
          return acc;
        }, 0),
      );
      if (helpCenter) {
        setSpeed((prev) => {
          return prev + 10;
        });
      }

      setOnOffSpeed(
        unitLst.reduce((acc, cur) => {
          if (cur?.qty && typeof cur.onOffDecreaseSpeed === 'number')
            acc += cur.onOffDecreaseSpeed;
          return acc;
        }, 0),
      );

      setDefense(
        unitLst.reduce((acc, cur) => {
          if (cur?.qty && typeof cur.decreaseDefense === 'number')
            acc += cur.decreaseDefense;
          return acc;
        }, 0),
      );

      setOnOffDefense(
        unitLst.reduce((acc, cur) => {
          if (cur?.qty && typeof cur.onOffDecreaseDefense === 'number')
            acc += cur.onOffDecreaseDefense;
          return acc;
        }, 0),
      );
      setSingle(
        unitLst.reduce((acc, cur) => {
          if (cur?.qty && typeof cur?.single === 'number')
            acc += cur.qty * cur?.single;
          return acc;
        }, 0),
      );
    }
  }, [unitLst, helpCenter]);

  const handleDisplay = (text) => {
    if (text === 'description' && description) {
      setDescription(false);
    }
    if (text === 'description' && !description) {
      setDescription(true);
    }
    if (text === 'attack' && attack) {
      setAttack(false);
    }
    if (text === 'attack' && !attack) {
      setAttack(true);
    }
    if (text === 'burgess' && burgess) {
      setBurgess(false);
    }
    if (text === 'burgess' && !burgess) {
      setBurgess(true);
    }
    if (text === 'cautionAura' && cautionAura) {
      setCautionAura(false);
    }
    if (text === 'cautionAura' && !cautionAura) {
      setCautionAura(true);
    }
    if (text === 'helpCenter' && helpCenter) {
      setHelpCenter(false);
    }
    if (text === 'helpCenter' && !helpCenter) {
      setHelpCenter(true);
    }
    if (text === 'dpBoss' && dpBoss) {
      setDpBoss(false);
    }
    if (text === 'dpBoss' && !dpBoss) {
      setDpBoss(true);
    }
    if (text === 'dpDefense' && dpDefense) {
      setDpDefense(false);
    }
    if (text === 'dpDefense' && !dpDefense) {
      setDpDefense(true);
    }
    if (text === 'dpSpeed' && dpSpeed) {
      setDpSpeed(false);
    }
    if (text === 'dpSpeed' && !dpSpeed) {
      setDpSpeed(true);
    }
    if (text === 'dpStun' && dpStun) {
      setDpStun(false);
    }
    if (text === 'dpStun' && !dpStun) {
      setDpStun(true);
    }
    if (text === 'commonExceptPercent' && commonExceptPercent) {
      setCommonExceptPercent(false);
    }
    if (text === 'commonExceptPercent' && !commonExceptPercent) {
      setCommonExceptPercent(true);
    }
  };

  const resetQty = (rating) => {
    const newUnitLst = unitLst.map((u) =>
      u.rating === rating ? { ...u, ...{ qty: 0 } } : u,
    );
    setUnitLst(newUnitLst);
  };

  return (
    <div className="h-full max-h-screen dark:text-zinc-200 font-suit">
      <main className="flex relative  justify-between px-[0.4rem]">
        <section className="flex flex-col  flex-[0.7] mr-2">
          <div className="flex justify-between h-[14px] pc:h-[23px] mb-[2px]  px-[0.1rem]">
            <span className="text-xs font-medium pc:text-base">??????</span>
            <button
              className="text-[0.7rem]"
              onClick={() => {
                resetQty('common');
              }}
            >
              ?????????
            </button>
          </div>
          {common.map((unit) => {
            return (
              <Unit
                unit={unit}
                key={unit.urn}
                setUnitLst={setUnitLst}
                unitLst={unitLst}
                commonExceptPercent={commonExceptPercent}
              />
            );
          })}
          <div className="flex relative pc:h-[23px] mb-[2px] mt-[6px] pc:mt-[5px]  h-[14px] justify-between px-[0.1rem]">
            <span className="text-xs font-medium pc:text-base">?????????</span>
            <button
              className="text-[0.7rem]"
              onClick={() => {
                resetQty('uncommon');
              }}
            >
              ?????????
            </button>
            <section className="absolute z-10 flex flex-col justify-center bottom-[-570px] pc:bottom-[-675px]  ">
              <div>
                <label className="relative flex items-center mb-1 mr-5 cursor-pointer ">
                  <input
                    onClick={() => {
                      handleDisplay('attack');
                    }}
                    type="checkbox"
                    className="sr-only peer"
                    readOnly
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer top-0 left-0   peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500"></div>
                  <span className="ml-1 text-sm ">?????????</span>
                </label>
                <label className="relative flex items-center mb-1 mr-5 cursor-pointer ">
                  <input
                    onClick={() => {
                      handleDisplay('dpStun');
                    }}
                    type="checkbox"
                    className="sr-only peer"
                    readOnly
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer top-0 left-0   peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500"></div>
                  <span className="ml-1 text-sm ">??????</span>
                </label>
                <label className="relative flex items-center mb-1 mr-5 cursor-pointer ">
                  <input
                    onClick={() => {
                      handleDisplay('dpSpeed');
                    }}
                    type="checkbox"
                    className="sr-only peer"
                    readOnly
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer top-0 left-0   peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500"></div>
                  <span className="ml-1 text-sm ">??????</span>
                </label>
                <label className="relative flex items-center mb-1 mr-5 cursor-pointer ">
                  <input
                    onClick={() => {
                      handleDisplay('dpDefense');
                    }}
                    type="checkbox"
                    className="sr-only peer"
                    readOnly
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer top-0 left-0   peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500"></div>
                  <span className="ml-1 text-sm ">???</span>
                </label>
                <label className="relative flex items-center mb-8 mr-5 cursor-pointer ">
                  <input
                    onClick={() => {
                      handleDisplay('dpBoss');
                    }}
                    type="checkbox"
                    className="sr-only peer"
                    readOnly
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer top-0 left-0   peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500"></div>
                  <span className="ml-1 text-sm ">?????????</span>
                </label>
                <label className="relative flex items-center mb-1 mr-5 cursor-pointer ">
                  <input
                    onClick={() => {
                      handleDisplay('commonExceptPercent');
                    }}
                    type="checkbox"
                    className="sr-only peer"
                    readOnly
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer top-0 left-0   peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500"></div>
                  <span className="ml-1 text-sm ">?????????????????????</span>
                </label>
                <label className="relative flex items-center mb-1 mr-5 cursor-pointer ">
                  <input
                    onClick={() => {
                      handleDisplay('description');
                    }}
                    type="checkbox"
                    className="sr-only peer"
                    readOnly
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer top-0 left-0   peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500"></div>
                  <span className="ml-1 text-sm ">????????????</span>
                </label>
                <label className="relative flex items-center mb-1 mr-5 cursor-pointer ">
                  <input
                    onClick={() => {
                      handleDisplay('burgess');
                    }}
                    type="checkbox"
                    className="sr-only peer"
                    readOnly
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer top-0 left-0  peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500"></div>
                  <span className="ml-1 text-sm ">?????????</span>
                </label>
                <label className="relative flex items-center mb-1 mr-5 cursor-pointer ">
                  <input
                    onClick={() => {
                      handleDisplay('cautionAura');
                    }}
                    type="checkbox"
                    className="sr-only peer"
                    readOnly
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer  top-0 left-0  peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500"></div>
                  <span className="ml-1 text-sm ">????????????</span>
                </label>
                <label className="relative flex items-center mb-1 mr-5 cursor-pointer ">
                  <input
                    onClick={() => {
                      handleDisplay('helpCenter');
                    }}
                    type="checkbox"
                    className="sr-only peer"
                    readOnly
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer top-0 left-0  peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500"></div>
                  <span className="ml-1 text-sm ">???????????????</span>
                </label>
              </div>
            </section>
          </div>
          {uncommon.map((unit) => {
            return (
              <Unit
                unit={unit}
                key={unit.urn}
                setUnitLst={setUnitLst}
                unitLst={unitLst}
                commonExceptPercent={commonExceptPercent}
              />
            );
          })}
        </section>
        <section className="flex-[0.8] mr-2">
          <div className="flex h-[14px] pc:h-[23px] mb-[2px]  justify-between px-[0.1rem]">
            <span className="text-xs font-medium pc:text-base">?????????</span>
            <button
              className="text-[0.7rem]"
              onClick={() => {
                resetQty('unique');
              }}
            >
              ?????????
            </button>
          </div>
          {unique.map((unit) => {
            return (
              <Unit
                unit={unit}
                key={unit.urn}
                setUnitLst={setUnitLst}
                unitLst={unitLst}
                description={description}
                cautionAura={cautionAura}
                dpDefense={dpDefense}
                dpSpeed={dpSpeed}
                commonExceptPercent={commonExceptPercent}
              />
            );
          })}
        </section>
        <section className="flex-[0.8] mr-2">
          <div className="flex h-[14px] pc:h-[23px]  mb-[2px] justify-between px-[0.1rem]">
            <span className="text-xs font-medium pc:text-base">?????????</span>
            <button
              className="text-[0.7rem]"
              onClick={() => {
                resetQty('rare');
              }}
            >
              ?????????
            </button>
          </div>
          {rare.map((unit) => {
            return (
              <Unit
                unit={unit}
                key={unit.urn}
                setUnitLst={setUnitLst}
                unitLst={unitLst}
                description={description}
                cautionAura={cautionAura}
                dpStun={dpStun}
                dpDefense={dpDefense}
                dpSpeed={dpSpeed}
                commonExceptPercent={commonExceptPercent}
              />
            );
          })}
        </section>
        <section className="flex-1 mr-2">
          <div className="flex h-[14px] pc:h-[23px] mb-[2px]   justify-between px-[0.1rem]">
            <span className="text-xs text-[#ff453f] font-medium pc:text-base">
              ??????
            </span>
            <button
              className="text-[0.7rem]"
              onClick={() => {
                resetQty('legendary');
              }}
            >
              ?????????
            </button>
          </div>
          {legendary.map((unit) => {
            return (
              <Unit
                unit={unit}
                key={unit.urn}
                setUnitLst={setUnitLst}
                unitLst={unitLst}
                description={description}
                attack={attack}
                burgess={burgess}
                cautionAura={cautionAura}
                dpStun={dpStun}
                dpBoss={dpBoss}
                dpDefense={dpDefense}
                dpSpeed={dpSpeed}
                commonExceptPercent={commonExceptPercent}
              />
            );
          })}
        </section>
        <section className="flex flex-col flex-1 mr-2">
          <div className="flex  pc:h-[23px] mb-[2px]  h-[14px] justify-between px-[0.1rem]">
            <span className="text-xs dark:text-[#EA82A4] text-pink-600 font-medium pc:text-base">
              ??????
            </span>
            <button
              className="text-[0.7rem]"
              onClick={() => {
                resetQty('hidden');
              }}
            >
              ?????????
            </button>
          </div>
          {hidden.map((unit) => {
            return (
              <Unit
                unit={unit}
                key={unit.urn}
                setUnitLst={setUnitLst}
                unitLst={unitLst}
                description={description}
                attack={attack}
                burgess={burgess}
                cautionAura={cautionAura}
                dpStun={dpStun}
                dpBoss={dpBoss}
                dpDefense={dpDefense}
                dpSpeed={dpSpeed}
                commonExceptPercent={commonExceptPercent}
              />
            );
          })}
          <div className="flex  relative pc:h-[23px] mb-[2px] mt-[6px] pc:mt-[5px] h-[14px] justify-between px-[0.1rem]">
            <span className="text-xs text-[#C8007A] font-medium pc:text-base">
              ?????????
            </span>
            <button
              className="text-[0.7rem]"
              onClick={() => {
                resetQty('changed');
              }}
            >
              ?????????
            </button>
            <section className="absolute flex flex-col justify-center text-left -z-10  bottom-[-228px] pc:bottom-[-265px]">
              <span>{stun} ??????</span>
              <span>
                ?????? {speed + onOffSpeed} ({speed} + {onOffSpeed}??????)
              </span>
              <span>
                ??? {defense + onOffDefense} ({defense} + {onOffDefense}??????)
              </span>
              <span className="text-xs">?????????,?????? ?????? ?????? ?????????</span>
              <span className="">{single} ??????</span>
            </section>
          </div>
          {changed.map((unit) => {
            return (
              <Unit
                unit={unit}
                key={unit.urn}
                setUnitLst={setUnitLst}
                unitLst={unitLst}
                description={description}
                attack={attack}
                dpStun={dpStun}
                dpBoss={dpBoss}
                dpDefense={dpDefense}
                dpSpeed={dpSpeed}
                commonExceptPercent={commonExceptPercent}
              />
            );
          })}
        </section>
        <section className="flex-1 mr-2">
          <div className="flex relative pc:h-[23px] mb-[2px] h-[14px] justify-between px-[0.1rem]">
            <span
              className="text-xs dark:text-[#1FF4A7] text-green-600 font-medium pc:text-base"
              onClick={() => {
                setTr(!tr);
              }}
            >
              ?????????
            </span>
            <button
              className="text-[0.7rem]"
              onClick={() => {
                resetQty('transcendence');
              }}
            >
              ?????????
            </button>
          </div>
          <section className="absolute flex-col justify-center text-sm bottom-[268px]  pc:bottom-[395px]  ">
            <div className="flex justify-between">
              <span className="">???</span>
              <div className="flex flex-col">
                <span>????????? 107</span>
                <span>?????? 200</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="mr-2">??????</span>
              <div className="flex flex-col">
                <span>????????? 122</span>
                <span>?????? 210</span>
              </div>
            </div>
          </section>
          {tr &&
            transcendence.map((unit) => {
              return (
                <Unit
                  unit={unit}
                  key={unit.urn}
                  setUnitLst={setUnitLst}
                  unitLst={unitLst}
                  description={description}
                  attack={attack}
                  burgess={burgess}
                  cautionAura={cautionAura}
                  dpStun={dpStun}
                  dpBoss={dpBoss}
                  dpDefense={dpDefense}
                  dpSpeed={dpSpeed}
                  commonExceptPercent={commonExceptPercent}
                />
              );
            })}
        </section>
        <section className="flex flex-col flex-1">
          <div className="flex  justify-between pc:h-[23px] mb-[2px] h-[14px] px-[0.1rem]">
            <span
              className="text-xs text-[#B84244] font-medium pc:text-base"
              onClick={() => {
                setIm(!im);
              }}
            >
              ?????????
            </span>
            <button
              className="text-[0.7rem]"
              onClick={() => {
                resetQty('immortal');
              }}
            >
              ?????????
            </button>
          </div>
          {im &&
            immortal.map((unit) => {
              return (
                <Unit
                  unit={unit}
                  key={unit.urn}
                  setUnitLst={setUnitLst}
                  unitLst={unitLst}
                  description={description}
                  attack={attack}
                  burgess={burgess}
                  dpStun={dpStun}
                  dpBoss={dpBoss}
                  dpDefense={dpDefense}
                  dpSpeed={dpSpeed}
                  commonExceptPercent={commonExceptPercent}
                />
              );
            })}
          <div className="flex h-[14px] pc:h-[23px] mb-[2px] mt-[6px] pc:mt-[5px] justify-between px-[0.1rem]">
            <span
              className="text-xs text-[#C05DEB] font-medium pc:text-base"
              onClick={() => {
                setEt(!et);
              }}
            >
              ?????????
            </span>
            <button
              className="text-[0.7rem]"
              onClick={() => {
                resetQty('eternity');
              }}
            >
              ?????????
            </button>
          </div>
          {et &&
            eternity.map((unit) => {
              return (
                <Unit
                  unit={unit}
                  key={unit.urn}
                  setUnitLst={setUnitLst}
                  unitLst={unitLst}
                  description={description}
                  attack={attack}
                  burgess={burgess}
                  dpStun={dpStun}
                  dpBoss={dpBoss}
                  dpDefense={dpDefense}
                  dpSpeed={dpSpeed}
                  commonExceptPercent={commonExceptPercent}
                />
              );
            })}
          <div className="flex pc:h-[23px] mb-[2px] mt-[6px] pc:mt-[5px] h-[14px] justify-between px-[0.1rem]">
            <span
              className="text-xs dark:text-[#FFE300] text-yellow-600  font-medium pc:text-base"
              onClick={() => {
                setLtd(!ltd);
              }}
            >
              ?????????
            </span>
            <button
              className="text-[0.7rem]"
              onClick={() => {
                resetQty('limited');
              }}
            >
              ?????????
            </button>
          </div>
          {ltd &&
            limited.map((unit) => {
              return (
                <Unit
                  unit={unit}
                  key={unit.urn}
                  setUnitLst={setUnitLst}
                  unitLst={unitLst}
                  description={description}
                  attack={attack}
                  burgess={burgess}
                  cautionAura={cautionAura}
                  dpStun={dpStun}
                  dpBoss={dpBoss}
                  dpDefense={dpDefense}
                  dpSpeed={dpSpeed}
                  commonExceptPercent={commonExceptPercent}
                />
              );
            })}
          <div className="flex pc:h-[23px] mb-[2px] mt-[6px] pc:mt-[5px] h-[14px] justify-between px-[0.1rem]">
            <span
              className="text-xs dark:text-[#FFE300] text-yellow-600  font-medium pc:text-base"
              onClick={() => {
                setRltd(!rltd);
              }}
            >
              ???????????????
            </span>
            <button
              className="text-[0.7rem]"
              onClick={() => {
                resetQty('randomltd');
              }}
            >
              ?????????
            </button>
          </div>
          {rltd &&
            randomltd.map((unit) => {
              return (
                <Unit
                  unit={unit}
                  key={unit.urn}
                  setUnitLst={setUnitLst}
                  unitLst={unitLst}
                  description={description}
                  attack={attack}
                  burgess={burgess}
                  dpStun={dpStun}
                  dpBoss={dpBoss}
                  dpDefense={dpDefense}
                  dpSpeed={dpSpeed}
                  commonExceptPercent={commonExceptPercent}
                />
              );
            })}
        </section>
      </main>
    </div>
  );
};

export default Home;
