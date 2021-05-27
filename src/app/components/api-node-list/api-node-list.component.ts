import { Component, Input, EventEmitter } from '@angular/core'

import { ApiNodesMap } from '@models/api-map.model'

@Component({
  selector: 'api-node-list',
  templateUrl: './api-node-list.component.html',
  styleUrls: ['./api-node-list.component.sass'],
})
export class ApiNodeListComponent {
  @Input() nodes!: ApiNodesMap
  @Input() activePath!: string
  @Input() activePathSetter!: EventEmitter<string>
  @Input() parentPath: string = ''
}
