import { Component, Input } from '@angular/core'

@Component({
  selector: 'layout-block',
  templateUrl: './layout-block.component.html',
  styleUrls: ['./layout-block.component.sass'],
})
export class LayoutBlockComponent {
  @Input() label!: string
}
