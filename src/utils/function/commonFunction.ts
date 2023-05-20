import * as fs from 'fs';
import * as path from 'path';

export const getString = async (obj: any) => {
  return obj ? obj : '';
};

export const getTimeStampFromDate = async (date: Date) => {
  return date ? date.getTime() : '';
};

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export const getFixed2AndRemoveZero = (num) => {
  return Number(num.toFixed(2));
};

export const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const isFolderExists = (filePath) => {
  return fs.existsSync(filePath);
};

export const createFullFolder = (dirname: string) => {
  if (fs.existsSync(dirname)) {
    return true;
  }

  if (createFullFolder(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
};

/**
 * 將數字轉為百分比
 * EX: 0.55 => 55%
 * @param {*} num
 */
export const percentFormat = (num: number) => {
  if (isNaN(num)) {
    return num;
  }
  num = num * 100;
  num = Math.round(num);
  return `${num.toString()}%`;
};

export const parseNumber = (num: any) => {
  if (isNaN(num)) {
    return 0;
  }
  return Number(num);
};
