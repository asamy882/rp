import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Season } from "../season.class";
import { SeasonService } from "../seasons.service";
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {

  //saved Object
  seasons: Season[];
  season: Season;
  display: boolean;
  colDefs: any[] = [];
  msgs: Message[] = [];
  canSubmitSeasonForm: boolean;
  @ViewChild("seasonForm") seasonForm: any;

  constructor(private modalService: NgbModal, private seasonService: SeasonService) {
    this.createColDefs()
  }

  ngOnInit(): void {
    this.getALLSeasons();
    this.resetValues();
  }

  createColDefs(): any {
    this.colDefs.push({ 'field': 'SeasonID', 'header': 'Season ID' });
    this.colDefs.push({ 'field': 'Name', 'header': 'Name' });
    this.colDefs.push({ 'field': 'FromDate', 'header': 'From Date' });
    this.colDefs.push({ 'field': 'ToDate', 'header': 'To Date' });
    this.colDefs.push({ 'field': 'SeasonType.Name', 'header': 'Season Type' });
  }

  getALLSeasons() {
    this.seasonService.getSeasons().subscribe((res) => {
      if (res.Success) {
        this.seasons = res.Items;
        this.seasonService.saveObjectOnLocalStorage('Periodes', JSON.stringify(this.seasons));
      }
    }
    )
  }

  onSubmit() {
    this.seasonService
      .saveSeason(this.season)
      .subscribe(res => {
        console.log("saveSeason", res);
        if (res.Success) {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The season saved successfully' });
          this.getALLSeasons();
          this.display = false;
        } else {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Failed to save the season' });
        }
      });

  }

  resetValues() {
    this.season = new Season();
    this.seasonForm.reset();
  }

  addClicked() {
    this.display = true;
    this.resetValues();
  }

  deleteClicked() {
    this.seasonService.deleteSeason(this.season.SeasonID).subscribe((res) => {
      console.log("deleteSeason - res", res);
      if (res.Success) {
        let index = this.seasons.indexOf(this.season);
        this.seasons = this.seasons.filter(
          (val, i) => i != index
        );
        this.seasonService.saveObjectOnLocalStorage('Seasons', JSON.stringify(this.seasons));
        this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The season deleted successfully' });
      } else {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Faild to delete the season' });
      }
    }

    )
  }

  editClicked() {
    this.display = true;
  }

  rowSelected(season) {
    this.season = season;
  }



  valiadteForm() {
    if (this.seasonForm.valid
    )
      this.canSubmitSeasonForm = true;
  }
}
