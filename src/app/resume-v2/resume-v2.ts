import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { RESUME } from '../data/resume-data';
import { PrintService } from '../data/print.service';

@Component({
  selector: 'app-resume-v2',
  imports: [NgFor],
  templateUrl: './resume-v2.html',
  styleUrl: './resume-v2.scss',
})
export class ResumeV2Component {
  r = RESUME;
  private print = inject(PrintService);

  onNameClick(): void {
    this.print.registerNameClick(() => this.print.printAsPdf());
  }
}
