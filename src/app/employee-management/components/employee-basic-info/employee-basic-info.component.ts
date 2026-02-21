import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { CustomCommonShared } from '../../../shared/shared.module';
import { EmployeeBasicService } from '../../servies/employee-basic.service';

@Component({
  selector: 'app-employee-basic-info',
  standalone: true,
  imports: [CustomCommonShared],
  templateUrl: './employee-basic-info.component.html',
  styleUrls: ['./employee-basic-info.component.scss'],
})
export class EmployeeBasicInfoComponent implements OnInit {

  blockForm!: FormGroup;
  l_formData: any = {};
  submitted = false;
  roomTypes: any[] = [];
  blockList: any[] = [];
  public l_hbm_hostel_id_hhom: any = []
  public l_hbm_warden_id_hhwm: any = []
  public l_hbm_room_type: any = []
  public l_hbm_mess_id_hhmm: any = []
  public l_hbm_mess_id_hhmm_for_filter: any = []
  public l_loggedInUserData: any = []
  public l_HostelCapasity: any = []
  public l_gridColumns: any = []
  public l_gridDataList: any = []
  public l_gridDataListforfilter: any = []
  public l_gridAction: any = {}; // Action configuration for the grid

  constructor(
    private fb: FormBuilder,
    private l_EmployeeBasicService: EmployeeBasicService,
  ) {
  }
  async ngOnInit(): Promise<void> {
    this.buildForm();
    this.bindReactiveValidation();
    await this.lFN_Prerequisites(); // ✅ wait for API calls to finish
    await this.lFN_GetBlockMstList();

    this.l_gridColumns = [
      {
        field: "hbm_block_cd",
        header: "Block Code",
        dataType: "string"
      },
      {
        field: "hbm_block_desc",
        header: "Block Description",
        dataType: "string"
      },
      {
        field: "l_hbm_hostel_id_hhom_name",
        header: "Hostel Name",
        dataType: "string"
      },
      {
        field: "hbm_noof_floors",
        header: "Number of floors",
        dataType: "string"
      },
      {
        field: "hbm_noof_rooms",
        header: "Number of rooms",
        dataType: "string"
      },
      {
        field: "hbm_isactive",
        header: "Active",
        dataType: "boolean"
      }
    ]

  }


  async lFN_Prerequisites() {

    this.l_EmployeeBasicService.lFN_GetEmployeeListing().subscribe({
      next: (value) => {

        this.l_gridDataList = value.map((item: any) => {
          return {
            hbm_block_cd: item.id,
            hbm_block_desc: item.title,
            l_hbm_hostel_id_hhom_name: item.category?.name,
            hbm_noof_floors: item.price,
            hbm_noof_rooms: item.images?.length,
            hbm_isactive: true
          };
        });

      },
      error: (err) => console.error(err)
    });

    // let l_payload: any = {
    //   l_entitycode: this.l_loggedInUserData.l_entitycode
    // }
    // this.l_hbm_hostel_id_hhom = await this.l_hostelMstService.lFN_GetHostelSelectList(l_payload);

    // let l_payload_warden: any = {
    //   l_entitycode: this.l_loggedInUserData.l_entitycode
    // }
    // this.l_hbm_warden_id_hhwm = await this.l_wardenMstService.lFN_GetWardenSelectList(l_payload_warden);

    // let l_payload_mess: any = {
    //   l_entitycode: this.l_loggedInUserData.l_entitycode
    // }
    // this.l_hbm_mess_id_hhmm_for_filter = await this.l_messMstService.lFN_GetHostelMessSelectList(l_payload_mess);
    // await this.lFN_hstlWiseMessList();

    // let l_payload_room: LCGeneralMasterPayload = { gmst_typeid_gtype: "GTYPA00000000023" }
    // this.l_hbm_room_type = await this.l_generalMasterService?.lFN_GetGeneralMasterSelectList(l_payload_room);
  }

  buildForm() {
    this.blockForm = this.fb.group({
      hbm_block_cd: [this.l_formData.hbm_block_cd || '', Validators.required],
      hbm_block_desc: [this.l_formData.hbm_block_desc || '', Validators.required],
      hbm_hostel_id_hhom: [this.l_formData.hbm_hostel_id_hhom || '', Validators.required],
      hbm_noof_floors: [this.l_formData.hbm_noof_floors || 0, [Validators.required, Validators.min(0)]],
      hbm_noof_rooms: [this.l_formData.hbm_noof_rooms || 0, [Validators.required, Validators.min(0)]],
      hbm_room_type: [this.l_formData.hbm_room_type || '', Validators.required],
      hbm_isactive: [this.l_formData.hbm_isactive || false]
    });
  }

  private bindReactiveValidation() {
    // this.lFN_IsReactiveFormValid = () => {
    //   this.blockForm.markAllAsTouched();
    //   return this.blockForm.valid;
    // };
  }





  // Call this on form submit
  onSubmit(): void {
    this.submitted = true; // ✅ set flag to show errors
  }

  oncancel() {
    this.blockForm.reset(this.l_formData);
  }

  onReset() {
    this.blockForm.reset(this.l_formData); // reset to current data
    this.submitted = false;
  }

  onCancel() {
    this.blockForm.reset(this.l_formData);
    this.submitted = false;
  }

  async lFN_hstlWiseMessList() {
    // if (this.l_formData?.hbm_hostel_id_hhom) {
    //   let l_selectedHstl = this.l_hbm_hostel_id_hhom?.find((row) => {
    //     return row?.code === this.l_formData?.hbm_hostel_id_hhom;
    //   });

    //   if (l_selectedHstl) {
    //     this.l_HostelCapasity = l_selectedHstl?.object?.hhom_total_rooms
    //     let l_hstlWiseMessList = this.l_hbm_mess_id_hhmm_for_filter.filter((l_row) => {
    //       return l_row?.object?.hhmm_hostel_id_hhom === this.l_formData?.hbm_hostel_id_hhom;
    //     });

    //     if (l_hstlWiseMessList?.length > 0) {
    //       this.l_hbm_mess_id_hhmm = l_hstlWiseMessList;
    //     } else {
    //       this.l_hbm_mess_id_hhmm = this.l_hbm_mess_id_hhmm_for_filter; // ✅ Show all messes
    //       // setTimeout(() => {
    //       //   this.lFN_SetSnackBar("❌ No mess found for selected hostel. Showing all mess options.", null, 'red-snack');
    //       // }, 1000);
    //     }
    //   } else {
    //     this.l_hbm_mess_id_hhmm = this.l_hbm_mess_id_hhmm_for_filter; // Fallback if hostel not matched
    //   }
    // }
  }

  async lFN_GetBlockMstList() {
    // let l_list_payload: CLBlockMstListPayload = {
    //   l_entitycode: this.l_loggedInUserData.l_entitycode
    // };

    // this.l_gridDataList = l_gridDataList.map((row) => {
    //   const l_hostel = this.l_hbm_hostel_id_hhom.find((l_row) => l_row?.code === row?.hbm_hostel_id_hhom);
    //   if (l_hostel) {
    //     row.l_hbm_hostel_id_hhom_name = l_hostel?.name;
    //   }

    //   const l_warden = this.l_hbm_warden_id_hhwm.find((l_row) => l_row?.code === row?.hbm_warden_id_hhwm);
    //   if (l_warden) {
    //     row.l_hbm_warden_id_hhwm_name = l_warden?.name;
    //   }

    //   const l_mess = this.l_hbm_mess_id_hhmm_for_filter.find((l_row) => l_row?.code === row?.hbm_mess_id_hhmm);
    //   if (l_mess) {
    //     row.l_hbm_mess_id_hhmm_name = l_mess?.name;
    //   }

    //   return row;
    // });

    //await this.lFN_Filter();
  }

  onEdit(row: any) {

  }
  onDelete(row: any) {

  }

  get f() {
  return this.blockForm.controls;
}
}