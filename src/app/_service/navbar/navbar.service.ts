import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor() { }

  loadIt = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  reload() {
    this.loadIt = true;
    this.change.emit(this.loadIt);
  }
}
