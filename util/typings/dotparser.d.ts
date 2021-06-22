declare module 'dotparser' {
  export interface Node {
    "type":"node_stmt"
    "node_id": { 
      "type":"node_id"
      "id": number
    }
    "attr_list": {[key: string]: string}[]
  }
  export interface Edge {
    "type":"edge_stmt"
    "edge_list": [{
      'type': string
      'id': number
    }, { 
      'type': string
      'id': number
    }]
    "attr_list": {[key: string]: string}[]
  }
  export interface Graph {
    type: 'digraph'
    children: (Node | Edge)[]
  }
  export default function parse(dot: string): Graph[]
}

