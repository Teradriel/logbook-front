import { Component, OnInit } from '@angular/core';
import { faPlus, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Activity } from 'src/app/interfaces/activity';
import { LogService } from 'src/app/services/log.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  faEdit = faEdit;
  faPlus = faPlus;
  faTimes = faTimes;

  newForm: FormGroup;
  editForm: FormGroup;
  deleteForm: FormGroup;

  activities: Activity[] = [];

  constructor(
    private logService: LogService,
    private formBuilder: FormBuilder
  ) {
    this.newForm = this.formBuilder.group({
      date: '',
      notes: '',
      activity: '',
    });

    this.editForm = this.formBuilder.group({
      date: '',
      notes: '',
      activity: '',
    });

    this.deleteForm = this.formBuilder.group({
      id: 0,
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.logService.getAll().subscribe((activities) => {
      sessionStorage.setItem('activities', JSON.stringify(activities));
      this.activities = JSON.parse(
        sessionStorage.getItem('activities') || '{}'
      );
    });
  }

  newActivity() {
    this.logService.addActivity(this.newForm.value).subscribe(() => {
      this.getAll();
    });
    this.newForm.reset();
  }

  changeActivity(event: Event, id: Number) {
    this.logService.editActivity(id, this.editForm.value).subscribe(() => {
      this.getAll();
    });
    this.editForm.reset();
  }

  removeActivity(id: Number) {
    this.logService.deleteActivity(id).subscribe(() => {
      this.getAll();
    });
    this.deleteForm.reset();
  }
}
