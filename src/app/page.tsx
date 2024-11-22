'use client'
import { ChangeEvent, useState } from 'react'

export default function TodoApp() {
    const [taskList, setTaskList] = useState<{ name: string; completed: boolean }[]>([])
    const [taskName, setTaskName] = useState("")

    const handleAddTask = () => {
        if (taskName.trim() !== "") {
            setTaskList([...taskList, { name: taskName, completed: false }])
            setTaskName("")
        }
    }

    const handleTaskName = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value)
    }

    const handleDeleteTask = (index: number) => {
        setTaskList(taskList.filter((_, i) => i !== index))
    }

    const toggleTaskCompletion = (index: number) => {
        setTaskList(
            taskList.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            )
        )
    }

    return (
        <div className="grid place-items-center h-screen bg-gradient-to-br from-gray-900 via-blue-800 to-gray-900">

            <div className="bg-white rounded-lg shadow-lg p-10 space-y-8 w-[400px]">

                <h1 className="text-2xl font-bold text-center text-gray-800">To-Do List</h1>

                <div className="flex items-center space-x-3">

                    <input type="text" value={taskName} onChange={handleTaskName} placeholder="Enter a task"
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                    <button
                        onClick={handleAddTask}
                        className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                        Add
                    </button>
                    
                </div>
                <ul className="space-y-4">

                    {taskList.map((task, index) => (

                        <li key={index}
                            className={`flex justify-between items-center px-4 py-3 rounded-lg shadow-sm ${
                                task.completed ? "bg-green-100 line-through" : "bg-gray-100" }`}>

                            <div
                                className={`flex-grow cursor-pointer break-words overflow-hidden text-ellipsis ${
                                    task.completed ? "text-gray-500" : "text-gray-800" }`}

                                style={{ wordBreak: "break-word", whiteSpace: "normal", maxWidth: "calc(100% - 50px)", }}

                                onClick={() => toggleTaskCompletion(index)}>
                                {task.name}
                            </div>

                            <button
                                onClick={() => handleDeleteTask(index)}
                                className="px-2 py-1 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition">
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
