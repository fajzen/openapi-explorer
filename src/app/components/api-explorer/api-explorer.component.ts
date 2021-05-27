import { Component, OnDestroy, EventEmitter } from '@angular/core'
import { Subscription } from 'rxjs'
import * as R from 'ramda'

import { ApiMapService } from '@services/api-map.service'
import { ApiNodesMap } from '@models/api-map.model'

@Component({
  selector: 'api-explorer',
  templateUrl: './api-explorer.component.html',
  styleUrls: ['./api-explorer.component.sass'],
})
export class ApiExplorerComponent implements OnDestroy {
  private _apiMapSubscription: Subscription

  apiNodesMap: ApiNodesMap | null = null

  hasError: boolean = false

  activePath: string = ''

  activePathSetter: EventEmitter<string> = new EventEmitter<string>()

  constructor(apiMapService: ApiMapService) {
    this._apiMapSubscription = apiMapService.getObservable().subscribe({
      next: apiNodesMap => {
        this.hasError = false
        this.apiNodesMap = apiNodesMap
        this.activePath = ''
      },
      error: () => {
        this.hasError = true
      },
    })

    this.activePathSetter.subscribe(newActivePath => {
      this.activePath = newActivePath
    })
  }

  ngOnDestroy(): void {
    this._apiMapSubscription.unsubscribe()
  }

  hasData(): boolean {
    return !R.isEmpty(this.apiNodesMap)
  }
}
