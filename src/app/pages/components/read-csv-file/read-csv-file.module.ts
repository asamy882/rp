import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { Routes, RouterModule }             from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }                       from '@angular/http';
import { ReadCSVFileComponent }                    from './read-csv-file.component';
import { FileUtil }                         from './file.util';
import { Constants }                        from './constants';
import { GrowlModule,FileUploadModule } from 'primeng/primeng';

@NgModule({
    //put all your modules here
    //The imports key in the context of an @NgModule defines additional modules
    //that will be imported into the current module

    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        GrowlModule,
        FileUploadModule,
        HttpModule
    ],

    // put all your components / directives / pipes here
    declarations:[
      ReadCSVFileComponent
    ],

    // put all your services here
    providers: [
        FileUtil,
        Constants
    ],
    exports: [ReadCSVFileComponent]
})

export class ReadCSVFileModule{}
