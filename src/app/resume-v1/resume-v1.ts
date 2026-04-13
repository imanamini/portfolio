import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RESUME } from '../data/resume-data';

@Component({
  selector: 'app-resume-v1',
  imports: [NgFor],
  templateUrl: './resume-v1.html',
  styleUrl: './resume-v1.scss',
})
export class ResumeV1Component {
  r = RESUME;
}
