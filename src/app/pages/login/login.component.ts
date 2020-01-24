import {Component, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ApplicationService} from "../AppCommon/application.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit {
  public form: FormGroup;
  public UserName: AbstractControl;
  public Password: AbstractControl;
  public submitted: boolean = false;
  public companyList: any[];
  public brandList: any;
  public isCompanySelected: boolean = false;
  public selectedCompany: any;
  public selectedBrand: any;

  constructor(fb: FormBuilder, private appService: ApplicationService,private router: Router) {
    this.form = fb.group({
      'UserName': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'Password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });

    this.UserName = this.form.controls['UserName'];
    this.Password = this.form.controls['Password'];

    this.appService.observableGetWitoutToken('Authentication/GetCompanies').subscribe(
      (res: any) => {
        this.companyList = res.Items;
      }
    )
  }

  ngOnInit() {

  }

  onSelectOption(comp: any) {
    this.selectedCompany = this.companyList.find(company => company.CompanyName === comp.target.value);
    this.appService.observableGetWitoutToken('/Authentication/GetCompanyBrands?companyId=' + this.selectedCompany.CompanyId).subscribe(
      (res: any) => {
        this.brandList = res.Items;
        this.isCompanySelected = true;
      }
    )
  }

  onSelectBrand(brandSelected) {
    this.selectedBrand = this.brandList.find(brand => brand.BrandName === brandSelected.target.value);

  }


  public onSubmit(values: any) {
    this.submitted = true;
    if (this.form.valid && this.selectedBrand && this.selectedCompany) {
      values.CompanyId = this.selectedCompany.CompanyId;
      values.BrandId = this.selectedBrand.BrandId;
      this.appService.observablePostWithoutHeaders('Authentication/Authenticate', values).subscribe(
        (res:any) => {
          console.log(res.Item.UserToken);
          localStorage.clear();
          localStorage.setItem('UserToken',res.Item.UserToken);
          localStorage.setItem('BrandId',values.BrandId);
          this.router.navigate(['/pages']);

        }
      )

      // your code goes here
      // console.log(values);
    }
  }
}
