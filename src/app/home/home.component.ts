import { Component, OnInit, inject } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { map } from 'rxjs/operators';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private coursesService = inject(CoursesService);

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  ngOnInit(): void {
    this.reloadCourses();
  }

  reloadCourses() {
    const courses$ = this.coursesService.loadAllCourses().pipe(
      map(courses => courses.sort(sortCoursesBySeqNo))
    );

    this.beginnerCourses$ = courses$.pipe(
      map(courses => courses.filter(course => course.category === 'BEGINNER'))
    );

    this.advancedCourses$ = courses$.pipe(
      map(courses => courses.filter(course => course.category === 'ADVANCED'))
    );

  }
}




