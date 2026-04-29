import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyNaira',
  standalone: true
})
export class CurrencyNairaPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) return '₦0.00';
    
    return '₦' + value.toLocaleString('en-NG', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
}
