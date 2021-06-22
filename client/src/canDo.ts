import { GraphData } from './plan'

const canDo = (subject: number | string, checked: Set<string>, graphData: GraphData) => {
  subject = subject.toString()
  if (checked.has(subject)) {
    return false;
  }
  const requirements = graphData.edges.filter((e) => e.to.toString() === subject).map((e) => e.from.toString())
  return requirements.every((requirement) => checked.has(requirement))
}
