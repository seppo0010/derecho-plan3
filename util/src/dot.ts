import parse, {Node, Edge} from 'dotparser'

function isNode(x: Node|Edge): x is Node {
  return x.type === 'node_stmt'
}

function isEdge(x: Node|Edge): x is Edge {
  return x.type === 'edge_stmt'
}

export {isNode, isEdge}
