import { InjectionToken } from '@angular/core';
import { Notyf } from 'notyf';

export const NOTYF = new InjectionToken<Notyf>('NotyfToken');

export function notyfFactory(): Notyf {
  return new Notyf({
    duration: 5000, // Set your global Notyf configuration here
    types:[
      {
        type: 'success',
        className: 'notyf__toast--success',
        backgroundColor: '#f78c00',
        icon: {
          className: 'notyf__icon--success',
          tagName: 'i',
        }
      }
    ]
  });
}
