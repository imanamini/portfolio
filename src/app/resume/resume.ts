import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RESUME, Experience, Project, Education, Course } from '../data/resume-data';

@Component({
  selector: 'app-resume',
  imports: [NgFor],
  templateUrl: './resume.html',
  styleUrl: './resume.scss'
})
export class ResumeComponent {
  name        = RESUME.name;
  title       = RESUME.title;
  email       = RESUME.email;
  phone       = RESUME.phone;
  linkedinUrl = RESUME.linkedinUrl;
  summary     = RESUME.summary;

  experiences: Experience[] = RESUME.experiences;
  projects:    Project[]    = RESUME.projects;
  education:   Education[]  = RESUME.education;
  courses:     Course[]     = RESUME.courses;
}
