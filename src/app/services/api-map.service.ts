import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import SwaggerParser from '@apidevtools/swagger-parser'
import { OpenAPI, OpenAPIV3 } from 'openapi-types'
import * as R from 'ramda'

import { ApiNodesMap } from '@models/api-map.model'

type Parameters = OpenAPI.Parameters
type Property = OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject
type Properties = {
  [name: string]: Property
}

const PARAMS_PATH = ['get', 'parameters']
const PROPERTIES_PATH = [
  'get',
  'responses',
  '200',
  'content',
  'application/json',
  'schema',
  'properties',
]

@Injectable({
  providedIn: 'root',
})
export class ApiMapService {
  private readonly _apiMap$ = new BehaviorSubject<ApiNodesMap | null>(null)

  constructor() {}

  getValue(): ApiNodesMap | null {
    return this._apiMap$.getValue()
  }

  getObservable(): BehaviorSubject<ApiNodesMap | null> {
    return this._apiMap$
  }

  async loadFromFile(sourceFile: string): Promise<void> {
    if (!sourceFile) {
      this._apiMap$.next(null)
      return
    }

    try {
      const parser = new SwaggerParser()

      const apiDoc = await parser.dereference(sourceFile)

      this._apiMap$.next(this._parseApiDoc(apiDoc))
    } catch (err) {
      this._apiMap$.error(err)
    }
  }

  private _parseApiDoc(apiDoc: OpenAPI.Document): ApiNodesMap {
    const nodesMap: ApiNodesMap = {}

    R.forEachObjIndexed((methods, endpoint) => {
      if (
        R.pathSatisfies(
          (p: Parameters | null) => (p?.length ?? 0) > 0,
          PARAMS_PATH,
          methods
        )
      ) {
        return
      }

      const properties: Properties | void = R.path(PROPERTIES_PATH, methods)

      if (!properties) {
        return
      }

      const clearedEndpoint = String(endpoint).replace(/^\//, '')

      nodesMap[clearedEndpoint] = {
        children: this._parseProperties(properties),
      }
    }, apiDoc.paths)

    return nodesMap
  }

  private _parseProperties(data: Properties): ApiNodesMap {
    // @ts-ignore: Incorrect type definitions
    return R.map(
      (prop: Property) =>
        '$ref' in prop
          ? null
          : {
              type: this._parsePropertyType(prop),
              description: prop.description,
              children: prop.properties
                ? this._parseProperties(prop.properties)
                : null,
            },
      data
    )
  }

  private _parsePropertyType(prop: Property): string | null {
    if ('$ref' in prop || prop.properties) {
      return null
    }

    if ('items' in prop) {
      return `${prop.type}<${this._parsePropertyType(prop.items)}>`
    }

    return prop.type ?? null
  }
}
