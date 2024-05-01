import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import TaskStatus from '../TaskStatus'
import './index.css'

const employeesList = [
  {
    id: 1,
    name: 'Madhu',
  },
  {
    id: 2,
    name: 'Kiran',
  },
  {
    id: 3,
    name: 'Ravi',
  },
  {
    id: 4,
    name: 'Raju',
  },
  {
    id: 5,
    name: 'Ramesh',
  },
  {
    id: 6,
    name: 'Bhaskar',
  },
  {
    id: 7,
    name: 'Shyam',
  },
  {
    id: 8,
    name: 'Anand',
  },
  {
    id: 9,
    name: 'Rajesh',
  },
  {
    id: 10,
    name: 'Suresh',
  },
]

class AssignTask extends Component {
  state = {name: '', task: '', assignedTaskList: []}

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeAssignedTask = event => {
    this.setState({task: event.target.value})
  }

  onAssignTask = event => {
    event.preventDefault()
    const {name, task} = this.state
    const newAssignedTask = {
      id: uuidv4(),
      name,
      task,
      status: 'TO START',
    }

    this.setState(prevState => ({
      assignedTaskList: [...prevState.assignedTaskList, newAssignedTask],
      name: '',
      task: '',
    }))
  }

  handleStatusChange = (taskId, newStatus) => {
    this.setState(prevState => ({
      assignedTaskList: prevState.assignedTaskList.map(task => {
        if (task.id === taskId) {
          return {...task, status: newStatus}
        }
        return task
      }),
    }))
  }

  render() {
    const {taskItemsList} = this.props
    const {assignedTaskList} = this.state
    return (
      <>
        <div className="assign-task-container">
          <h1 className="assign-task-heading">Assign Task</h1>
          <form onSubmit={this.onAssignTask} className="form-container">
            <select
              onChange={this.onChangeName}
              className="employees-names-list"
            >
              {employeesList.map(eachEmployee => (
                <option key={eachEmployee.id} value={eachEmployee.name}>
                  {eachEmployee.name}
                </option>
              ))}
            </select>
            <select
              onChange={this.onChangeAssignedTask}
              className="assigned-task-list"
            >
              {taskItemsList.map(eachTask => (
                <option key={eachTask.id} value={eachTask.taskItem}>
                  {eachTask.taskItem}
                </option>
              ))}
            </select>
            <button type="submit" className="assign-task-button">
              Assign Task
            </button>
          </form>
          <ul className="unordered-assigned-task-list">
            <li className="table-headings">
              <h1 className="employee-name-heading">Employee Name</h1>
              <h1 className="assigned-task-heading">Assigned Task</h1>
              <h1 className="task-status-heading">Status</h1>
            </li>
            {assignedTaskList.map(eachAssignedTask => (
              <li key={eachAssignedTask.id} className="each-assigned-task-item">
                <p className="employee-name">{eachAssignedTask.name}</p>
                <p className="assigned-task">{eachAssignedTask.task}</p>
                <p className="task-status">{eachAssignedTask.status}</p>
                <button
                  type="button"
                  className="start-button"
                  onClick={() =>
                    this.handleStatusChange(eachAssignedTask.id, 'START')
                  }
                >
                  START
                </button>
                <button
                  type="button"
                  className="inprogress-button"
                  onClick={() =>
                    this.handleStatusChange(eachAssignedTask.id, 'INPROGRESS')
                  }
                >
                  INPROGRESS
                </button>
                <button
                  type="button"
                  className="end-button"
                  onClick={() =>
                    this.handleStatusChange(eachAssignedTask.id, 'END')
                  }
                >
                  END
                </button>
              </li>
            ))}
          </ul>
        </div>
        <TaskStatus assignedTaskList={assignedTaskList} />
      </>
    )
  }
}

export default AssignTask
