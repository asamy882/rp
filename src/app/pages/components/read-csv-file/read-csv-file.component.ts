import { Component, OnInit, ViewChild, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { FileUtil } from './file.util';
import { Constants } from './constants';
import { Message } from 'primeng/primeng';

@Component({
  selector: "csv",
  templateUrl: './read-csv-file.component.html'
})

export class ReadCSVFileComponent implements OnInit {

  @ViewChild('fileImportInput')
  fileImportInput: any;
  @Output() csvRecordsListener: EventEmitter<any> = new EventEmitter<any>();
  csvRecords = [];
  msgs: Message[] = [];

  constructor(private _router: Router,
    private _fileUtil: FileUtil
  ) { }

  ngOnInit() { }

  // METHOD CALLED WHEN CSV FILE IS IMPORTED
  fileChangeListener($event): void {

    var text = [];
    var target = $event.target || $event.srcElement;
    var files = target.files;

    if (Constants.validateHeaderAndRecordLengthFlag) {
      if (!this._fileUtil.isCSVFile(files[0])) {
        //   alert("Please import valid .csv file.");
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Please import valid .csv file.' });
        this.fileReset();
      }
    }

    var input = $event.target;
    var reader = new FileReader();
    reader.readAsText(input.files[0]);

    reader.onload = (data) => {
      let csvData = reader.result;
      let csvRecordsArray = csvData.split(/\r\n|\n/);

      var headerLength = -1;
      if (Constants.isHeaderPresentFlag) {
        let headersRow = this._fileUtil.getHeaderArray(csvRecordsArray, Constants.tokenDelimeter);
        headerLength = headersRow.length;
      }

      this.csvRecords = this._fileUtil.getDataRecordsArrayFromCSVFile(csvRecordsArray,
        headerLength, Constants.validateHeaderAndRecordLengthFlag, Constants.tokenDelimeter, this.msgs);

      if (this.csvRecords == null) {
        //If control reached here it means csv file contains error, reset file.
        this.fileReset();
      }

      this.csvRecordsListener.emit(this.csvRecords);
    }

    reader.onerror = function () {
      alert('Unable to read ' + input.files[0]);
    };
  };

  fileReset() {
    this.fileImportInput.nativeElement.value = "";
    this.csvRecords = [];
  }

  onBasicUpload(file){
    debugger;
    console.log(file);
  }

}
