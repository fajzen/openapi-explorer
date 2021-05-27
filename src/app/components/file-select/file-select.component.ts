import { Component } from '@angular/core'

import { DEFINITION_FILES } from '@app/config'
import { ApiMapService } from '@services/api-map.service'

@Component({
  selector: 'file-select',
  templateUrl: './file-select.component.html',
  styleUrls: ['./file-select.component.sass'],
})
export class FileSelectComponent {
  readonly DEFINITION_FILES = DEFINITION_FILES

  constructor(private apiMapService: ApiMapService) {}

  onChange(event: Event) {
    const filePath = (event.target as HTMLSelectElement).value

    this.apiMapService.loadFromFile(
      filePath && `/assets/definitions/${filePath}`
    )
  }
}
