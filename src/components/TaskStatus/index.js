import {Component} from 'react'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const tabsList = [
  {tabId: 'START', displayText: 'Start'},
  {tabId: 'INPROGRESS', displayText: 'Progress'},
  {tabId: 'END', displayText: 'End'},
]

class TaskStatus extends Component {
  state = {activeTabId: tabsList[0].tabId}

  onClickTabItem = tabId => {
    this.setState({activeTabId: tabId})
  }

  getFilteredList = () => {
    const {assignedTaskList} = this.props
    const {activeTabId} = this.state
    const filteredList = assignedTaskList.filter(
      eachList => eachList.status === activeTabId,
    )
    return filteredList
  }

  getCountData = () => {
    const {assignedTaskList} = this.props

    let startCount = 0
    let inProgressCount = 0
    let endCount = 0

    assignedTaskList.forEach(eachTask => {
      if (eachTask.status === 'START') {
        startCount += 1
      } else if (eachTask.status === 'INPROGRESS') {
        inProgressCount += 1
      } else if (eachTask.status === 'END') {
        endCount += 1
      }
    })
    return {startCount, inProgressCount, endCount}
  }

  render() {
    const filteredList = this.getFilteredList()
    const {activeTabId} = this.state
    const {startCount, inProgressCount, endCount} = this.getCountData()

    const data = [
      {
        count: startCount,
        status: 'start',
      },
      {
        count: inProgressCount,
        status: 'inProgress',
      },
      {
        count: endCount,
        status: 'end',
      },
    ]

    return (
      <div className="task-status-summary-container">
        <div className="task-status-container">
          <h1>Task Status</h1>
          <ul className="tabs-unordered-list">
            {tabsList.map(eachTab => (
              <li key={eachTab.tabId} className="each-tab-list">
                <button
                  type="button"
                  onClick={() => this.onClickTabItem(eachTab.tabId)}
                  className={`tab-button ${
                    eachTab.tabId === activeTabId ? 'active-tab-btn' : ''
                  }`}
                >
                  {eachTab.displayText}
                </button>
              </li>
            ))}
          </ul>

          <ul className="unordered-assigned-tasks">
            <li className="taskstatus-table-headings">
              <h1 className="taskstatus-employeename-heading">Employee Name</h1>
              <h1 className="taskstatus-task-heading">Task</h1>
            </li>
            {filteredList.map(eachAssignedTask => (
              <li key={eachAssignedTask.id} className="each-filtered-task">
                <p className="taskstatus-employeename">
                  {eachAssignedTask.name}
                </p>
                <p className="taskstatus-task">{eachAssignedTask.task}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="task-summary-container">
          <h1>Task Summary</h1>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart margin={{top: 50, right: 100, bottom: 50, left: 100}}>
              <Pie
                cx="70%"
                cy="40%"
                data={data}
                startAngle={0}
                endAngle={360}
                innerRadius="60%"
                outerRadius="90%"
                dataKey="count"
              >
                <Cell name="Start" fill="#63bf74" />
                <Cell name="Progress" fill="#d9d36c" />
                <Cell name="End" fill="#e06441" />
              </Pie>
              <Legend
                iconType="circle"
                layout="vertical"
                verticalAlign="end"
                align="right"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }
}

export default TaskStatus
