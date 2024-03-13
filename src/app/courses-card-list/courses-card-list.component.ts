import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { filter, tap } from "rxjs/operators";
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.css'
})
export class CoursesCardListComponent {
  @Input() courses: Course[] = [];
  @Output() coursesChanged = new EventEmitter();

  private dialog = inject(MatDialog);

  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef.afterClosed().pipe(
      filter(val => !!val),
      tap(() => this.coursesChanged.emit())
    ).subscribe();
  }
}