import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { Season } from "../Lookups/Seasons/season.interface";

@Injectable()
export class SeasonService extends ApplicationService {
  saveSeason(season: Season): Observable<any> {
    console.log("saveSeason", season);
    return super.observablePost("Season/Save", season);
  }

  getSeasons(): Observable<any> {
    return super.observableGet("Season/GetAll");
  }

  getSeasonByCode(id: number): Observable<any> {
    return super.observableGet("Season/Get?id=" + id);
  }

  deleteSeason(id: number): Observable<any> {
    return super.observableDelete("Season/Delete?id=" + id);
  }

}
