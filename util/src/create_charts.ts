import * as fs from 'fs'
import * as child_process from 'child_process'
import * as util from 'util'
import parse, {Graph, Node, Edge} from 'dotparser'
import {isNode, isEdge} from './dot'
import combinations from './combinations'
import {subjectsRect} from '../../dependencyChartData'
import sharp from 'sharp'

const dot = parse(fs.readFileSync('../main.dot', 'utf-8'))
const nodes: Node[] = dot.map((graph: Graph) => {
  return graph.children.filter(isNode)
}).flat()
const edges: Edge[] = dot.map((graph: Graph) => {
  return graph.children.filter(isEdge)
}).flat()
const nodeToIndexMap = Object.fromEntries(nodes.map((n, i) => [n.node_id.id, i]))
const indexToNodeMap = Object.fromEntries(nodes.map((n, i) => [i, n]))

const options: Set<number> = new Set();
combinations(Object.values(nodeToIndexMap), 0, 3).forEach((comb: number[]) => { let numb = 0
  comb.forEach((i) => {
    numb |= 1 << (i)
  })
  options.add(numb)
})

for (let i = 0; i < edges.length; i++) {
  const edge = edges[i]
  const from = nodeToIndexMap[edge.edge_list[0].id]
  const to = nodeToIndexMap[edge.edge_list[1].id]
  combinations(Object.values(nodeToIndexMap)).forEach((comb: number[]) => {
    if (comb.includes(to) && !comb.includes(from)) {
      let numb = 0
      comb.forEach((i) => {
        numb |= 1 << (i)
      })
      options.delete(numb)
    }
  })
}

const tasks: ((resolve: Function, reject: Function) => void)[] = []
const jpg = fs.readFileSync('../acercade_correlatividades.jpg').toString('base64')
options.forEach(async (o: number) => {
  const selectedNodes = []
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if ((1 << i) & o) {
      selectedNodes.push(indexToNodeMap[i])
    }
  }

  const svg = `<svg viewBox="0 0 1406 946" xmlns="http://www.w3.org/2000/svg">
  <image xlink:href="data:image/jpeg;base64,${jpg}" width="1406" height="946"/>` + selectedNodes.map((n) => {
    const r = subjectsRect[n.node_id.id.toString()] || [0,0,0,0]
    return `<rect x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" fill="red" fill-opacity="0.7" rx="22" ry="22" />`
  }).join('') + '</svg>'
  tasks.push((resolve, reject) => {
    const p = child_process.spawn('inkscape', ['-w', '1406', '-h', '946', '-p', '-o', `images/${o}.png`])
    if (!p.stdin) {
      reject('child process failed')
      return
    }
    p.stdin.end(svg, 'utf-8');
    p.on('close', () => resolve(o))
  })
});

(async () => {
  for (let i = 0; i < tasks.length; i++) {
    await new Promise(tasks[i])
  }
})()
