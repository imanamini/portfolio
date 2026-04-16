import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { RESUME } from '../data/resume-data';
import { PrintService } from '../data/print.service';

@Component({
  selector: 'app-resume-v1',
  imports: [NgFor],
  templateUrl: './resume-v1.html',
  styleUrl: './resume-v1.scss',
})
export class ResumeV1Component {
  r = RESUME;
  private print = inject(PrintService);

  onNameClick(): void {
    this.print.registerNameClick(() => this.print.printAsPdf());
  }
}
