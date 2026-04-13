import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RESUME } from '../data/resume-data';

@Component({
  selector: 'app-resume-v2',
  imports: [NgFor],
  templateUrl: './resume-v2.html',
  styleUrl: './resume-v2.scss',
})
export class ResumeV2Component {
  r = RESUME;
}
