import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'f-button',
  template: `
    <button
      pButton
      [label]="label"
      [loading]="loading"
      [loadingIcon]="loadingIcon"
    ></button>
  `,
  styles: [],
})
export class ButtonComponent implements OnInit {
  @Input() label!: string;
  @Input() loading = false;
  @Input() loadingIcon!: string;
  constructor() {}

  ngOnInit(): void {}
}
