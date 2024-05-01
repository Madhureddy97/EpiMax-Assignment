import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import AssignTask from '../AssignTask'

import './index.css'

class CreateTask extends Component {
  state = {taskItem: '', taskItemsList: [], errMsg: ''}

  onChangeTask = event => {
    this.setState({taskItem: event.target.value})
  }

  onAddTaskItem = event => {
    event.preventDefault()
    const {taskItem} = this.state
    if (taskItem === '') {
      this.setState({errMsg: 'Enter valid task'})
    } else {
      const newTask = {
        id: uuidv4(),
        taskItem,
      }

      this.setState(prevState => ({
        taskItemsList: [...prevState.taskItemsList, newTask],
        taskItem: '',
        errMsg: '',
      }))
    }
  }

  render() {
    const {taskItem, errMsg, taskItemsList} = this.state
    return (
      <div className="bg-container">
        <h1 className="task-list-heading">Task List</h1>
        <div className="create-task-container">
          <form onSubmit={this.onAddTaskItem}>
            <input
              type="text"
              onChange={this.onChangeTask}
              value={taskItem}
              placeholder="Enter the Task"
              className="task-input"
            />
            <button type="submit" className="Add-task-button">
              Add Task
            </button>
          </form>
          {taskItem === '' && <p className="err-msg-text">{errMsg}</p>}
          <ol className="ordered-taskitems-list">
            {taskItemsList.map(eachTask => (
              <li key={eachTask.id}>{eachTask.taskItem}</li>
            ))}
          </ol>
        </div>
        <AssignTask taskItemsList={taskItemsList} />
      </div>
    )
  }
}

export default CreateTask
