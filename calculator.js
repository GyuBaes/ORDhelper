import * as _ from 'lodash';
import { combinationList } from './unit';

export const getCombination = (unit) => {
  let index = 0;
  combinationList.forEach((value, i) => {
    if (value.name === unit.name) {
      index = i;
    }
  });
  return combinationList[index].material;
};

const getLowestCombination = (unit) => {
  let index = 0;
  combinationList.forEach((value, i) => {
    if (value.name === unit.name) {
      index = i;
    }
  });
  return combinationList[index].lowestMaterial
    ? combinationList[index].lowestMaterial
    : combinationList[index].material;
};

const getAllCombination = (unit) => {
  let combiMemory = [];
  combiMemory[0] = unit;

  for (let i = 1; i <= 10; i++) {
    if (combiMemory[i - 1].length === 0) break;
    combiMemory[i] = getArrayCombination(combiMemory[i - 1]);
  }

  combiMemory = combiMemory.flat().filter((data) => data !== undefined);
  combiMemory = appendQty(groupBy(combiMemory, 'name'));

  return [...combiMemory];
};

const getArrayCombination = (unit) => {
  if (unit.length === 0) return;
  let cfMemory = [];
  for (let i of unit) {
    if (i.name !== '위습') {
      for (let j = 1; j <= i.qty; j++)
        cfMemory = [...cfMemory, ...getCombination(i)];
    }
  }
  return cfMemory;
};

export const appendQty = (unit) => {
  let arr = Object.keys(unit);
  let obj = {};
  let arr2 = [];
  for (let i = 0; i < arr.length; i++) {
    unit[arr[i]] = unit[arr[i]].reduce((a, b) => a + b);
    obj['name'] = arr[i];
    obj['qty'] = Object.values(unit)[i];
    arr2 = [{ ...obj }, ...arr2];
  }
  return arr2;
};

const groupBy = (data, key) => {
  return data.reduce((acc, cur) => {
    (acc[cur[key]] = acc[cur[key]] || []).push(cur.qty);
    return acc;
  }, []);
};

const getSumCombinationQty = (arr) => {
  let i = 0;
  arr.forEach((unit) => {
    i = i + unit.qty;
  });

  return i;
};

export const getPercent = (curr, combi) => {
  const allQty = getSumCombinationQty(getLowestCombination(combi));
  const allcombi = getAllCombination(getCombination(combi));

  let haveValue = 0;
  let percent = 0;

  for (let currUnit of curr) {
    for (let combiUnit of allcombi) {
      haveValue = haveValue + isHaveOrNotPer(currUnit, combiUnit);
    }
  }

  percent = (haveValue / allQty) * 100;
  return percent;
};

const isHaveOrNotPer = (curr, combi) => {
  if (curr.qty === 0) return 0;
  if (curr.name !== combi.name) return 0;

  if (curr.name === combi.name) {
    if (curr.name === '위습') {
      return curr.qty;
    }

    if (curr.qty >= combi.qty) {
      return combi.qty * getSumCombinationQty(getLowestCombination(curr));
    }

    if (curr.qty <= combi.qty) {
      return curr.qty * getSumCombinationQty(getLowestCombination(curr));
    }
  }
};

export const getLessUnit = (curr, combi) => {
  const lowestCombiList = _.cloneDeep(getLowestCombination(combi));

  const allcombi = getAllCombination(getCombination(combi));
  let haveUnitList = [];
  let trueOffalse = false;

  for (let currUnit of curr) {
    for (let combiUnit of allcombi) {
      if (currUnit.name === combiUnit.name) {
        for (let i = 0; i < currUnit.qty; i++) {
          haveUnitList = [...haveUnitList, { ...currUnit, ...{ qty: 1 } }];
        }
      }
    }
  }

  if (haveUnitList.length === 0) return lowestCombiList;

  haveUnitList = appendQty(
    groupBy(getArrayLowestCombination(haveUnitList), 'name'),
  );

  for (let lowestUnit of lowestCombiList) {
    for (let haveUnit of haveUnitList) {
      if (lowestUnit.name === haveUnit.name) {
        if (lowestUnit.qty > haveUnit.qty) {
          lowestUnit.qty -= haveUnit.qty;
          trueOffalse = true;
        }
        if (lowestUnit.qty <= haveUnit.qty && trueOffalse === false) {
          lowestUnit.qty -= lowestUnit.qty;
        }
      }
      trueOffalse = false;
    }
  }
  return lowestCombiList;
};

const getArrayLowestCombination = (unit) => {
  if (unit.length === 0) return;
  let cfMemory = [];
  for (let i of unit) {
    if (i.rating !== 'common') {
      for (let j = 1; j <= i.qty; j++)
        cfMemory = [...cfMemory, ...getLowestCombination(i)];
    }
    if (i.rating === 'common') {
      for (let j = 1; j <= i.qty; j++) cfMemory = [...cfMemory, ...[i]];
    }
  }
  return cfMemory;
};

export const setCombination = (curr, combi) => {
  const allQty = getSumCombinationQty(getLowestCombination(combi));

  let combiList = getCombination(combi);
  let lessList = [];
  let memo = {};
  let haveValue = 0;

  while (haveValue !== allQty) {
    for (let currUnit of curr) {
      for (let combiUnit of combiList) {
        if (currUnit.name === combiUnit.name) {
          if (currUnit.qty === 0) {
            lessList.push(combiUnit);
          }
          if (currUnit.qty !== 0 && currUnit.qty < combiUnit.qty) {
            haveValue +=
              currUnit.qty *
              getSumCombinationQty(getLowestCombination(combiUnit));
            memo = { ...combiUnit };
            memo.qty -= currUnit.qty;
            currUnit.qty -= currUnit.qty;
            lessList.push(memo);
          }
          if (currUnit.qty >= combiUnit.qty) {
            currUnit.qty -= combiUnit.qty;
            haveValue +=
              combiUnit.qty *
              getSumCombinationQty(getLowestCombination(combiUnit));
          }
        }
      }
    }

    combiList = getArrayCombination(lessList);

    lessList = [];
    memo = {};
  }
  combi.qty += 1;
  return curr;
};

export const getPercent3 = (curr, combi) => {
  const copyCurr = _.cloneDeep(curr);
  const allQty = getSumCombinationQty(getLowestCombination(combi));
  let combiList = getCombination(combi);
  let lessList = [];
  let memo = {};
  let allLessList = [];
  let haveValue = 0;
  let percent = 0;
  let isTrueOrFalse = false;

  while (combiList !== undefined) {
    for (let currUnit of copyCurr) {
      for (let combiUnit of combiList) {
        if (currUnit.name === combiUnit.name) {
          if (currUnit.qty === 0) {
            lessList.push(combiUnit);
          }
          if (currUnit.qty !== 0 && currUnit.qty < combiUnit.qty) {
            memo = { ...combiUnit };
            memo.qty -= currUnit.qty;
            currUnit.qty -= currUnit.qty;
            lessList.push(memo);
          }
          if (currUnit.qty !== 0 && currUnit.qty >= combiUnit.qty) {
            currUnit.qty -= combiUnit.qty;
          }
        }
      }
    }

    combiList = getArrayCombination(lessList);
    allLessList = [...allLessList, ...lessList];

    lessList = [];
    memo = {};
  }

  allLessList = appendQty(groupBy(allLessList, 'name'));

  for (let unit of allLessList) {
    if (unit.name === '위습') {
      haveValue += allQty - unit.qty;
      isTrueOrFalse = true;
    }
  }
  if (!isTrueOrFalse) haveValue = +allQty;
  percent = (haveValue / allQty) * 100;

  return percent;
};

export const getLessUnit2 = (curr, combi) => {
  const copyCurr = _.cloneDeep(curr);
  const lowestCombiList = _.cloneDeep(getLowestCombination(combi));
  let combiList = getCombination(combi);
  let haveUnitList = [];
  let lessList = [];
  let memo = {};

  while (combiList !== undefined) {
    for (let currUnit of copyCurr) {
      for (let combiUnit of combiList) {
        if (currUnit.name === combiUnit.name) {
          if (currUnit.qty === 0) {
            lessList.push(combiUnit);
          }
          if (currUnit.qty !== 0 && currUnit.qty < combiUnit.qty) {
            memo = { ...combiUnit };
            memo.qty -= currUnit.qty;
            lessList.push(memo);
            for (let i = 0; i < currUnit.qty; i++) {
              haveUnitList = [...haveUnitList, { ...currUnit, ...{ qty: 1 } }];
            }
            currUnit.qty -= currUnit.qty;
          }
          if (currUnit.qty !== 0 && currUnit.qty >= combiUnit.qty) {
            for (let i = 0; i < combiUnit.qty; i++) {
              haveUnitList = [...haveUnitList, { ...currUnit, ...{ qty: 1 } }];
            }
            currUnit.qty -= combiUnit.qty;
          }
        }
      }
    }

    combiList = getArrayCombination(lessList);

    lessList = [];
    memo = {};
  }

  if (haveUnitList.length === 0) return lowestCombiList;

  haveUnitList = appendQty(
    groupBy(getArrayLowestCombination(haveUnitList), 'name'),
  );

  for (let lowestUnit of lowestCombiList) {
    for (let haveUnit of haveUnitList) {
      if (lowestUnit.name === haveUnit.name) {
        if (lowestUnit.qty <= haveUnit.qty) {
          lowestUnit.qty -= lowestUnit.qty;
        }
        if (lowestUnit.qty > haveUnit.qty) {
          lowestUnit.qty -= haveUnit.qty;
        }
      }
    }
  }
  return lowestCombiList;
};
