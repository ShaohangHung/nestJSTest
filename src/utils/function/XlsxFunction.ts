import * as Exceljs from 'exceljs';
import moment = require('moment');
import * as path from 'path';
import DEFINE from '../../constant/DEFINE';
import { createFullFolder } from '../function/commonFunction';

export const createExcel = (): Exceljs.Workbook => {
  const today = new Date();
  const workbook = new Exceljs.Workbook();
  workbook.creator = 'FlyingWheel System';
  workbook.lastModifiedBy = 'FlyingWheel System';
  workbook.created = today;
  workbook.modified = today;
  return workbook;
};

/**
 * 讀Excel檔案
 */
export const readExcel = async (FilePath) => {
  let workbook = new Exceljs.Workbook();
  workbook = await workbook.xlsx.readFile(FilePath);

  if (workbook && workbook.worksheets.length > 0) {
    return workbook;
  } else {
    console.log(`READ_XLSX_FAILED`);
    throw new Error(`READ_XLSX_FAILED`);
  }
};

export interface IWriteExcelFileOptions {
  folderPathSrc?: string;
  needTimeStamp: boolean;
}

/**
 * 建立Excel檔到指定資料夾
 * return 新檔名 = 時戳+原檔名
 * @param {*} workbook excel
 * @param {*} fileName 輸出檔案
 * @param {*} folderPathSrc 輸出資料夾路徑
 * @param {*} needTimeStamp 檔名是否需要加上時戳
 */
export const writeExcelFile = async (
  workbook: Exceljs.Workbook,
  fileName: string,
  options: IWriteExcelFileOptions = {
    folderPathSrc: null,
    needTimeStamp: true,
  },
) => {
  const time = moment().format(DEFINE.DATE_FORMAT_YYYYMMDDHHMMSS);
  let newFileName = options.needTimeStamp ? time + '_' + fileName : fileName;

  if (newFileName.length > 255) {
    newFileName = newFileName.substr(
      newFileName.length - 255,
      newFileName.length,
    );
  }

  // 資料夾路徑
  const folderPath =
    options.folderPathSrc === null
      ? path.resolve('') + '/' + DEFINE.EXPORT_FILE_PATH
      : options.folderPathSrc;

  // 判斷資料夾Path是否存在
  createFullFolder(folderPath);

  // 建立檔名和路徑
  const filePath = path.join(folderPath, newFileName);
  await workbook.xlsx.writeFile(filePath);

  return newFileName;
};
