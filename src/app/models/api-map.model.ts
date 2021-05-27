export type ApiNode = {
  type?: string | void
  description?: string | void
  children: ApiNodesMap | void
}

export type ApiNodesMap = {
  [name: string]: ApiNode
}
