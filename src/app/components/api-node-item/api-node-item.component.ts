import {
  Component,
  OnChanges,
  Input,
  EventEmitter,
  SimpleChanges,
} from '@angular/core'
import {
  faAngleDown,
  faAngleUp,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

import { ApiNode } from '@models/api-map.model'

@Component({
  selector: 'api-node',
  templateUrl: './api-node-item.component.html',
  styleUrls: ['./api-node-item.component.sass'],
})
export class ApiNodeItemComponent implements OnChanges {
  @Input() name!: string
  @Input() data!: ApiNode
  @Input() activePath!: string
  @Input() activePathSetter!: EventEmitter<string>
  @Input() parentPath: string = ''

  isExpanded: boolean = false

  ngOnChanges(changes: SimpleChanges): void {
    if (
      'name' in changes ||
      'activePath' in changes ||
      'parentPath' in changes
    ) {
      const isExpanded = changes.isExpanded?.currentValue ?? this.isExpanded
      const name = changes.name?.currentValue ?? this.name
      const activePath = changes.activePath?.currentValue ?? this.activePath
      const parentPath = changes.parentPath?.currentValue ?? this.parentPath

      if (!isExpanded) {
        const nodePath = this.getNodePath(parentPath, name)

        if (activePath === nodePath || activePath.startsWith(`${nodePath}.`)) {
          this.isExpanded = true
        }
      }
    }
  }

  toggle(): void {
    this.isExpanded = !this.isExpanded
  }

  getIcon(): IconDefinition {
    return this.isExpanded ? faAngleUp : faAngleDown
  }

  getNodePath(
    parentPath: string = this.parentPath,
    name: string = this.name
  ): string {
    return `${parentPath}.${name}`
  }

  isSelected(): boolean {
    return this.activePath === this.getNodePath()
  }

  isInPath(): boolean {
    return `${this.activePath}.`.includes(this.getNodePath())
  }

  setActive() {
    this.activePathSetter.emit(this.getNodePath())
  }
}
