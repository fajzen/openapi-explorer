import { Injectable } from '@angular/core'
import * as R from 'ramda'

import { ApiNodesMap } from '@models/api-map.model'
import { ApiMapService } from './api-map.service'

const PATH_PATTERN = /^[\w-]+(:([\w-]+\.)*[\w-]+)?$/i

@Injectable({
  providedIn: 'root',
})
export class ApiPathService {
  private _apiMapService: ApiMapService

  constructor(apiMapService: ApiMapService) {
    this._apiMapService = apiMapService
  }

  isValid(path: string): boolean {
    return PATH_PATTERN.test(this._cleanPathDelimiters(path))
  }

  isExisting(path: string): boolean {
    const pathParts = this._getPathParts(path)

    if (pathParts.length === 0) {
      return false
    }

    const apiMapNodes = this._apiMapService.getValue()

    if (!apiMapNodes) {
      return false
    }

    return R.reduce(
      (
        { node }: { valid: boolean; node: ApiNodesMap | null | void },
        pathPart
      ) => {
        if (!node || !(pathPart in node)) {
          return R.reduced({ valid: false, node: null })
        }

        return { valid: true, node: node[pathPart].children }
      },
      { valid: true, node: apiMapNodes },
      pathParts
    ).valid
  }

  fromHumanForm(path: string): string {
    const joinedPath = this._getPathParts(path).join('.')
    return joinedPath && `.${joinedPath}`
  }

  toHumanForm(path: string): string {
    const [endpoint = '', ...props] = path.split('.').filter(Boolean)
    return `${endpoint}${props.length > 0 ? ':' : ''}${props.join('.')}`
  }

  private _cleanPathDelimiters(path: string): string {
    return path.replace(/[.:]$/, '')
  }

  private _getPathParts(path: string): string[] {
    return path.split(/[.:]/).filter(Boolean)
  }
}
