import {v1} from "uuid";
import {combineReducers, legacy_createStore} from "redux";
import {taskReducer} from "../state/taskReducer";
import {RootStoreType} from "../state/store";
import {todolistId1, todolistId2, todoReducer} from "../state/todoReducer";
import {Provider} from "react-redux";
import {TaskPriorities, TaskStatuses} from "../API/api";


const rootReducer=combineReducers({
    task: taskReducer,
    todolist:todoReducer
})

const initialGlobalState = {
    'task':{
        [todolistId1]: {
            data: [
                {id: v1(), title: "HTML&CSS", description:' ', status: TaskStatuses.Completed, priority: TaskPriorities.Low, startDate: '', deadline: '',todoListId: todolistId1, order: 0,addedDate: ''},
                {id: v1(), title: "JS",description:'', status: TaskStatuses.Completed, priority: TaskPriorities.Low, startDate: '', deadline: '',todoListId: todolistId1, order: 0,addedDate: ''}
            ],
            filter: "All"
        },
        [todolistId2]: {
            data: [
                {id: v1(), title: "Milk",description:' ', status: TaskStatuses.Completed, priority: TaskPriorities.Low, startDate: '', deadline: '',todoListId: todolistId2, order: 0,addedDate: ''},
                {id: v1(), title: "Salt",description:'', status: TaskStatuses.Completed, priority: TaskPriorities.Low, startDate: '', deadline: '',todoListId: todolistId2, order: 0,addedDate: ''}
            ],
            filter: "All"
        }
    },
    'todolist':[
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ]
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as RootStoreType);


export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
