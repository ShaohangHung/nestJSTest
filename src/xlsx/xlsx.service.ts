import { Injectable } from '@nestjs/common';
import * as Xlsx from '../utils/function/XlsxFunction';

@Injectable()
export class XlsxService {
  async do20230520(): Promise<any> {
    const fileFolder = `C:/Users/User/AppData/Roaming/DBeaverData/workspace6/General/Scripts/results/0520/雜魚大群組總數據/`;
    const fileNameArray = [
      `大群組停車場.xlsx`,
      `大群組傳統飲食.xlsx`,
      `大群組公家單位.xlsx`,
      `大群組加油站.xlsx`,
      `大群組咖啡店.xlsx`,
      `大群組房仲類.xlsx`,
      `大群組手搖飲類.xlsx`,
      `大群組早餐店.xlsx`,
      `大群組模板.xlsx`,
      `大群組汽車保養廠.xlsx`,
      `大群組洗衣店.xlsx`,
      `大群組眼鏡類.xlsx`,
      `大群組美容店.xlsx`,
      `大群組藥妝類.xlsx`,
      `大群組藥局.xlsx`,
      `大群組補習班.xlsx`,
      `大群組賣場類.xlsx`,
      `大群組車商.xlsx`,
      `大群組速食類.xlsx`,
      `大群組醫療機構.xlsx`,
      `大群組電信類.xlsx`,
      `大群組電子用品類.xlsx`,
      `大群組鞋類.xlsx`,
    ];
    for (const fileName of fileNameArray) {
      const workbook = await Xlsx.readExcel(fileFolder + fileName);
      const worksheet1 = workbook.getWorksheet(`全桃園統計表格不含外科`);
      let cellB2 = worksheet1.getCell(`B2`);
      cellB2.value = 1163;
      let cellD17 = worksheet1.getCell(`D17`);
      cellD17.value = 1163;
      let cellE17 = worksheet1.getCell(`E17`);
      cellE17.value = 1163;

      const worksheet2 = workbook.getWorksheet(`市區不含外科`);
      cellB2 = worksheet2.getCell(`B2`);
      cellB2.value = 402;
      cellD17 = worksheet2.getCell(`D17`);
      cellD17.value = 402;
      cellE17 = worksheet2.getCell(`E17`);
      cellE17.value = 402;

      const worksheet3 = workbook.getWorksheet(`郊區不含外科`);
      cellB2 = worksheet3.getCell(`B2`);
      cellB2.value = 761;
      cellD17 = worksheet3.getCell(`D17`);
      cellD17.value = 761;
      cellE17 = worksheet3.getCell(`E17`);
      cellE17.value = 761;

      await Xlsx.writeExcelFile(workbook, fileName, {
        folderPathSrc: null,
        needTimeStamp: false,
      });
    }
    return null;
  }
}
