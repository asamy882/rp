import { Injectable }       from '@angular/core';

@Injectable()
export class FileUtil {

    constructor() {}

    isCSVFile(file) {
        return file.name.endsWith(".csv");
    }

    getHeaderArray(csvRecordsArr, tokenDelimeter) {
        let headers = csvRecordsArr[0].split(tokenDelimeter);
        let headerArray = [];
        for (let j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);
        }
        return headerArray;
    }

    validateHeaders(origHeaders, fileHeaaders) {
        if (origHeaders.length != fileHeaaders.length) {
            return false;
        }

        var fileHeaderMatchFlag = true;
        for (let j = 0; j < origHeaders.length; j++) {
            if (origHeaders[j] != fileHeaaders[j]) {
                fileHeaderMatchFlag = false;
                break;
            }
        }
        return fileHeaderMatchFlag;
    }

    getDataRecordsArrayFromCSVFile(csvRecordsArray, headerLength,
        validateHeaderAndRecordLengthFlag, tokenDelimeter, msgs) {
        var dataArr = []

        for (let i = 0; i < csvRecordsArray.length; i++) {
            let data = csvRecordsArray[i].split(tokenDelimeter);

            if(validateHeaderAndRecordLengthFlag && data.length != headerLength){
                if(data==""){
                    msgs.push({ severity: 'error', summary: 'Error Message', detail: "Extra blank line is present at line number "+i+", please remove it." });
                  //  alert("Extra blank line is present at line number "+i+", please remove it.");
                    return null;
                }else{
                    msgs.push({ severity: 'error', summary: 'Error Message', detail: "Record at line number "+i+" contain "+data.length+" tokens, and is not matching with header length of :"+headerLength });
                  //  alert("Record at line number "+i+" contain "+data.length+" tokens, and is not matching with header length of :"+headerLength);
                    return null;
                }
            }

            let col = [];
            for (let j = 0; j < data.length; j++) {
                col.push(data[j]);
            }
            dataArr.push(col);
        }
        return dataArr;
    }

}
