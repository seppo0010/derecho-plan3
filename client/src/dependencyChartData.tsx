import { GraphData } from './plan'

const subjectsRect = {
  131: [268, 201, 136, 62],
  144: [266, 358, 136, 62],
  132: [268, 551, 136, 62],
  135: [268, 657, 136, 62],
  138: [479, 775, 133, 59],
  136: [479, 657, 133, 59],
  134: [479, 552, 133, 59],
  142: [718, 774, 133, 59],
  137: [718, 658, 133, 59],
  133: [716, 551, 136, 62],
  141: [718, 316, 133, 59],
  139: [718, 211, 133, 59],
  162: [954, 258, 134, 60],
  145: [954, 434, 133, 59],
  140: [954, 552, 133, 59],
  167: [954, 657, 134, 60],
  163: [952, 831, 134, 60],
  169: [1187, 552, 134, 60],
  168: [1187, 255, 134, 60],
};
const canDo = (subject: number | string, checked: Set<string>, graphData: GraphData) => {
  subject = subject.toString()
  if (checked.has(subject)) {
    return false;
  }
  const requirements = graphData.edges.filter((e) => e.to.toString() === subject).map((e) => e.from.toString())
  return requirements.every((requirement) => checked.has(requirement))
}
export { subjectsRect, canDo };
