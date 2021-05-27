import {
  Component,
  Input,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core'

import { ApiPathService } from '@services/api-path.service'

@Component({
  selector: 'path-input',
  templateUrl: './path-input.component.html',
  styleUrls: ['./path-input.component.sass'],
})
export class PathInputComponent implements OnChanges {
  @Input() activePath!: string
  @Input() activePathSetter!: EventEmitter<string>

  value: string = ''
  isValid: boolean = true
  isExisting: boolean = false

  private _apiPathService: ApiPathService

  constructor(apiPathService: ApiPathService) {
    this._apiPathService = apiPathService
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('activePath' in changes) {
      this.value = this._apiPathService.toHumanForm(
        changes.activePath.currentValue
      )
      this._checkValue()
    }
  }

  handleChangeValue() {
    this.activePathSetter.emit(this._apiPathService.fromHumanForm(this.value))
    this._checkValue()
  }

  hasError(): boolean {
    return Boolean(this.value) && (!this.isValid || !this.isExisting)
  }

  private _checkValue() {
    this.isValid = this._apiPathService.isValid(this.value)
    this.isExisting = this._apiPathService.isExisting(this.value)
  }
}
