import React, { useState } from 'react';
import './DependencyChart.css'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store'
import { toggleSubject } from './subjectsStatus'
import { getGraphData, GraphData } from './plan'
import { subjectsRect } from './dependencyChartData'
import { canDo } from './canDo'
import acercade_correlatividades from './acercade_correlatividades.jpg'
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

function DependencyChart() {
  const checked = useSelector((state: RootState) => state.subjectsStatus);
  const dispatch = useDispatch()
  const handleClick = (id: string) => {
    dispatch(toggleSubject(id))
  }
  const [graphData, setGraphData] = useState<null | GraphData>(null)
  useState(() => {
    (async () => {
      setGraphData(await getGraphData())
    })()
  })
  const _canDo = (subject: string) => {
      if (!graphData) {
        return false;
      }
      const defaultEdges = {nodes: [], edges: []}
      return canDo(subject, checked, graphData || defaultEdges)
  }
  return (
      <div>
          <h2>Materias aprobadas</h2>
          <p>Seleccioná qué materias ya aprobaste.</p>
          <svg viewBox="0 0 1406 946" xmlns="http://www.w3.org/2000/svg">
              <image href={acercade_correlatividades} width="1406" height="946"/>
              {Object.entries(subjectsRect).map(([key, value]) => (
                <rect key={key} x={value[0]} y={value[1]} width={value[2]} height={value[3]} fill={checked.has(key) ? 'red' : _canDo(key) ? 'yellow' : 'transparent'} fillOpacity="0.7" rx="22" ry="22" onClick={() => handleClick(key.toString())} cursor="pointer" />
              ))}
          </svg>
          <Link component={Button} to="/">Anterior</Link>
          <Link component={Button} to="/difficulty">Siguiente</Link>
      </div>
  )
}

export default DependencyChart
