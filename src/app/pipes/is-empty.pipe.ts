import { Pipe, PipeTransform } from '@angular/core'
import * as R from 'ramda'

@Pipe({ name: 'isEmpty' })
export class IsEmptyPipe implements PipeTransform {
  transform(value: any): boolean {
    return R.isEmpty(value)
  }
}
