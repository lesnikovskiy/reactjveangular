import { Component, inject } from '@angular/core';
import { sortCoursesBySeqNo } from '../model/course';
import { map } from 'rxjs/operators';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private coursesService = inject(CoursesService);

  courses$ = this.coursesService.loadAllCourses().pipe(
    map(courses => courses.sort(sortCoursesBySeqNo))
  );

  beginnerCourses$ = this.courses$.pipe(
    map(courses => courses.filter(course => course.category === 'BEGINNER'))
  );

  advancedCourses$ = this.courses$.pipe(
    map(courses => courses.filter(course => course.category === 'ADVANCED'))
  );

}




