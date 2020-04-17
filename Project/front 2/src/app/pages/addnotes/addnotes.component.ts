import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NotesService } from "src/app/service/notes.service";
import { AddnotescatService } from "src/app/service/addnotescat.service";
import { NotesdetailService } from "src/app/service/notesdetail.service";
import Swal from "sweetalert2";
import { map } from "rxjs/operators";
import { jsonresponse } from "src/app/pagemodels/jsonresponse";
import { Observable } from "rxjs";

@Component({
  selector: "app-addnotes",
  templateUrl: "./addnotes.component.html",
  styleUrls: ["./addnotes.component.css"],
})
export class AddnotesComponent implements OnInit {
  notes_categories$: Observable<jsonresponse>;
  myForm: FormGroup;
  pdfPath;
  notes_res;
  add_notecategory: FormGroup;
  add_notesres;

  constructor(
    private fb: FormBuilder,
    private notecat: NotesService,
    private addnotecat: AddnotescatService,
    private category_name: NotesdetailService
  ) {}
  notes_d$() {
    this.notes_categories$ = this.category_name
      .notesdetail()
      .pipe(map((x) => x.cdata));
  }

  //for get file path
  ufile(event) {
    if (event.target.files.length > 0) {
      this.pdfPath = event.target.files[0];
      console.log(this.pdfPath);
    }
  }
  addNotes() {
    let fData = this.myForm.getRawValue();
    let formData = new FormData();
    formData.append("cname", fData.cname);
    formData.append("custom", fData.custom);

    formData.append("nname", fData.nname);
    formData.append("description", fData.description);
    formData.append("File", this.pdfPath);
    this.notecat.addNotes(formData).subscribe((res) => {
      console.log(res);
      this.notes_res = res;
      if (this.notes_res.err == 1) {
        Swal.fire({
          title: "Error",
          text: "Please Submit Properly",
          icon: "error",
          footer: "!",
        });
      } else {
        Swal.fire({
          title: "Success",
          text: "Notes Added",
          icon: "success",
          footer: "!",
        });
      }
    });
  }

  add_notecat() {
    const data = this.add_notecategory.getRawValue();
    this.addnotecat.addnotescat(data).subscribe((res) => {
      console.log(res);
      this.add_notesres = res;
      if (this.add_notesres.err == 1) {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "Category Already Found....",
          footer: "!",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "success",
          text: "Category Added....",
          footer: `${data.category}`,
        }).then(() => {
          this.add_notecategory.reset();
        });
      }
    });
  }

  ngOnInit() {
    this.notes_d$();
    this.notes_categories$.subscribe((x) => console.log(x));
    this.validate();
  }
  validate() {
    this.myForm = this.fb.group({
      cname: ["", Validators.required],
      nname: ["", Validators.required],
      custom: ["", Validators.required],
      description: ["", Validators.required],
    });
  }
}
