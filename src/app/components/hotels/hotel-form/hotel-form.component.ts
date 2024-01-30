import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Hotel } from "../../../models/hotel.model";
import { LoadingService } from "../../../services/loading.service";
import { HotelFirebaseService } from "../../../services/hotel-firebase.service";
import { HotelService } from "../../../services/hotel.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-hotel-form",
  templateUrl: "./hotel-form.component.html",
  styleUrls: ["./hotel-form.component.css"],
})
export class HotelFormComponent implements OnInit {
  editMode = false;
  reactiveForm: FormGroup;
  id: string;

  constructor(
    private l: LoadingService,
    private hFirebase: HotelFirebaseService,
    private hService: HotelService,
    private router: Router,
    private aroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      amenities: new FormControl(null, Validators.required),
      url: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    });

    this.aroute.params.subscribe((params: Params) => {
      if (params["id"] != null) {
        this.editMode = true;
        this.hFirebase.getHotels().subscribe(() => {
          let editHotel = this.hService.getHotels()[+params["id"]];
          this.reactiveForm.setValue({
            name: editHotel.name,
            location: editHotel.location,
            description: editHotel.description,
            amenities: editHotel.amenities,
            url: editHotel.url,
            price: editHotel.price,
          });
          this.id = editHotel.id;
        });
      }
    });
  }

  onSubmit(rf: FormGroup) {
    let value = rf.value;
    let hotel = new Hotel(
      value.name,
      value.location,
      value.description,
      value.amenities,
      value.url,
      value.price
    );

    rf.reset();
    this.l.isLoading.next(true);

    // console.log(hotel);

    if (this.editMode) {
      this.hFirebase.updateHotel(this.id, hotel).subscribe(() => {
        this.l.isLoading.next(false);
        this.router.navigate(["hotels"]);
      });
    } else {
      this.hFirebase.addHotel(hotel).subscribe((res) => {
        hotel.id = res.name;
        this.hService.addHotel(hotel);
        this.l.isLoading.next(false);
        this.router.navigate(["hotels"]);
      });
    }
  }
}
