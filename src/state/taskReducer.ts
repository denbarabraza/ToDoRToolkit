import {addNewTodoAC, removeTodoAC, setTodosAC} from "./todoReducer";
import {ResponseResult, taskAPI, TaskType, UpdateTaskModelType} from "../API/api";
import {Dispatch} from "redux";
import {RootStoreType} from "./store";
import {RequestStatusType, setErrorAppAC, setStatusAppAC} from "./appReducer";
import axios, {AxiosError} from "axios";

//Type
export type FilterValueType = 'All' | 'Active' | 'Completed'

type InTaskType = {
    data: TaskType[]
    filter: FilterValueType
    entityStatus: RequestStatusType
}
export type TaskCommonType = {
    [key: string]: InTaskType
}

//State
const initialState: TaskCommonType = {
    // [todolistId1]: {
    //     data: [
    //         {id: v1(), title: "HTML&CSS", description:' ', status: TaskStatuses.Completed, priority: TaskPriorities.Low, startDate: '', deadline: '',todoListId: todolistId1, order: 0,addedDate: ''},
    //         {id: v1(), title: "JS",description:'', status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',todoListId: todolistId1, order: 0,addedDate: ''}
    //     ],
    //     filter: "All"
    // },
    // [todolistId2]: {
    //     data: [
    //         {id: v1(), title: "Milk",description:' ', status: TaskStatuses.Completed, priority: TaskPriorities.Low, startDate: '', deadline: '',todoListId: todolistId2, order: 0,addedDate: ''},
    //         {id: v1(), title: "Salt",description:'', status: TaskStatuses.Completed, priority: TaskPriorities.Low, startDate: '', deadline: '',todoListId: todolistId2, order: 0,addedDate: ''}
    //     ],
    //     filter: "All"
    // }
}

//Reducer
export const taskReducer = (state = initialState, action: ActionsType): TaskCommonType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.payload.todoID]: {
                    ...state[action.payload.todoID],
                    data: state[action.payload.todoID]
                        .data.filter(e => e.id !== action.payload.taskID)
                }
            };
        }
        case 'UPDATE_TASK': {
            return <TaskCommonType>{
                ...state,
                [action.payload.todoID]: {
                    ...state[action.payload.todoID],
                    data: state[action.payload.todoID].data.map(e => e.id === action.payload.taskID
                        ? {...e, ...action.payload.model}
                        : e
                    )
                }
            }
        }
        case 'CHANGE_FILTER': {
            return {
                ...state,
                [action.payload.todoID]: {
                    ...state[action.payload.todoID],
                    filter: action.payload.filter
                }
            }
        }
        case 'ADD_TASK': {
            return {
                ...state,
                [action.payload.todoID]: {
                    ...state[action.payload.todoID],
                    data: [action.payload.task, ...state[action.payload.todoID].data]
                }
            }
        }
        case 'REMOVE_TODO': {
            let stateCopy = {...state}
            delete stateCopy[action.payload.todoID]
            return stateCopy
        }
        case 'ADD_TODO': {
            return {
                [action.payload.newTodo.id]: {data: [], filter: 'All', entityStatus: 'idle'},
                ...state
            }
        }
        case "SET_TODO_FROM_BACK": {
            return action.payload.todos
                .reduce((res: TaskCommonType, t) => {
                    res[t.id] = {data: [], filter: 'All', entityStatus: 'idle'}
                    return res
                }, {})
            // const copyState = {...state}
            // const todoID = action.payload.todos.map(e => e.id)
            // todoID.forEach((t) => {
            //     copyState[t] = {
            //         data: [],
            //         filter: 'All'
            //     }
            // })
            // return copyState
        }
        case "SET_TASKS_FROM_BACK": {
            return {
                ...state,
                [action.payload.todoID]: {
                    ...state[action.payload.todoID],
                    data: action.payload.tasks,
                    filter: 'All'
                }
            }
        }
        case "CHANGE_ENTITY_STATUS": {
            return {
                ...state,
                [action.payload.todoID]: {...state[action.payload.todoID], entityStatus: action.payload.entityStatus}
            }
        }
        default:
            return state
    }
}

//Action Type
type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeFilterValueAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTodoAC>
    | ReturnType<typeof addNewTodoAC>
    | ReturnType<typeof setTodosAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTasksAC>
    | ReturnType<typeof changeEntityStatusAC>


//Action Creator
export const removeTaskAC = (todoID: string, taskID: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            todoID,
            taskID
        }
    } as const
}
export const changeFilterValueAC = (todoID: string, filter: FilterValueType) => {
    return {
        type: 'CHANGE_FILTER',
        payload: {
            todoID,
            filter
        }
    } as const
}
export const addTaskAC = (todoID: string, task: TaskType) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todoID,
            task
        }
    } as const
}
export const setTasksAC = (todoID: string, tasks: TaskType[]) => {
    return {
        type: 'SET_TASKS_FROM_BACK',
        payload: {
            todoID,
            tasks
        }
    } as const
}
export const updateTasksAC = (todoID: string, taskID: string, model: UpdateDomainTaskModelType) => {
    return {
        type: 'UPDATE_TASK',
        payload: {
            todoID,
            taskID,
            model
        }
    } as const
}
export const changeEntityStatusAC = (todoID: string, entityStatus: RequestStatusType) => {
    return {
        type: 'CHANGE_ENTITY_STATUS',
        payload: {
            todoID,
            entityStatus
        }
    } as const
}

//Thunk Creator
export const setTasksTC = (todoID: string) => async (dispatch: Dispatch) => {
    dispatch(setStatusAppAC({statusApp:'loading'}))
    try {
        let res = await taskAPI.getTask(todoID)
        dispatch(setTasksAC(todoID, res.items))
        dispatch(setStatusAppAC({statusApp:'succeeded'}))
    } catch (e) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
            let err = e.response ? e.response?.data.message : e.message
            dispatch(setErrorAppAC({errorApp:err}))
        }
        dispatch(setStatusAppAC({statusApp:'failed'}))
    }
}
export const createTasksTC = (todoID: string, title: string) => async (dispatch: Dispatch) => {
    debugger
    dispatch(setStatusAppAC({statusApp:'loading'}))
    dispatch(changeEntityStatusAC(todoID, 'loading'))
    try {
        let res = await taskAPI.createTask(todoID, title)
        if (res.resultCode === ResponseResult.OK) {
            dispatch(addTaskAC(todoID, res.data.item))
        } else {
            if (res.messages.length) {
                dispatch(setErrorAppAC({errorApp:res.messages[0]}))
            } else {
                dispatch(setErrorAppAC({errorApp:'Some error'}))
            }
        }
        dispatch(setStatusAppAC({statusApp:'succeeded'}))
        dispatch(changeEntityStatusAC(todoID, 'succeeded'))
    } catch (e) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
            let err = e.response ? e.response?.data.message : e.message
            dispatch(setErrorAppAC({errorApp:err}))
        }
        dispatch(setStatusAppAC({statusApp:'failed'}))
        dispatch(changeEntityStatusAC(todoID, 'failed'))
    }
}
export const removeTasksTC = (todoID: string, taskID: string) => async (dispatch: Dispatch) => {
    dispatch(setStatusAppAC({statusApp:'loading'}))
    dispatch(changeEntityStatusAC(todoID, 'loading'))
    try {
        let res = await taskAPI.deleteTask(todoID, taskID)
        dispatch(removeTaskAC(todoID, taskID))
        dispatch(setStatusAppAC({statusApp:'succeeded'}))
        dispatch(changeEntityStatusAC(todoID, 'succeeded'))
    } catch (e) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
            let err = e.response ? e.response?.data.message : e.message
            dispatch(setErrorAppAC({errorApp:err}))
        }
        dispatch(setStatusAppAC({statusApp:'failed'}))
        dispatch(changeEntityStatusAC(todoID, 'failed'))
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string | null
    deadline?: string | null
}

export const updateTaskTC = (todoID: string, taskID: string, model: UpdateDomainTaskModelType) => async (dispatch: Dispatch, getState: () => RootStoreType) => {
    const task = getState().task[todoID].data.find((t) => t.id === taskID)

    if (task) {
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: task.status,
            ...model
        }

        dispatch(setStatusAppAC({statusApp:'loading'}))
        dispatch(changeEntityStatusAC(todoID, 'loading'))
        try {
            let res = await taskAPI.updateTask(todoID, taskID, apiModel)
            if (res.resultCode === ResponseResult.OK) {
                dispatch(updateTasksAC(todoID, taskID, apiModel))
            } else {
                if (res.messages.length) {
                    dispatch(setErrorAppAC({errorApp:res.messages[0]}))
                } else {
                    dispatch(setErrorAppAC({errorApp:'Some error'}))
                }
            }
            dispatch(setStatusAppAC({statusApp:'succeeded'}))
            dispatch(changeEntityStatusAC(todoID, 'succeeded'))
        } catch (e) {
            if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
                let err = e.response ? e.response?.data.message : e.message
                dispatch(setErrorAppAC({errorApp:err}))
            }
            dispatch(setStatusAppAC({statusApp:'failed'}))
            dispatch(changeEntityStatusAC(todoID, 'failed'))
        }
    }
}
