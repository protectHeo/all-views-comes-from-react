import './App.css'
import {useReducer, useRef, createContext} from "react";
import {Routes, Route} from "react-router-dom";
import Diary from "./pages/Diary.jsx";
import Home from "./pages/Home.jsx";
import New from "./pages/New.jsx";
import NotFound from "./pages/NotFound.jsx";
import Edit from "./pages/Edit.jsx";

const mockData = [
    {
    id: 1,
    createdDate: new Date("2024-02-19").getTime(),
    emotionId: 1,
    content: "1내용"
    },
    {
        id: 2,
        createdDate: new Date("2024-02-18").getTime(),
        emotionId: 2,
        content: "2내용"
    },
    {
        id: 3,
        createdDate: new Date("2024-01-07").getTime(),
        emotionId: 3,
        content: "3내용"
    }
];

function reducer(state, action){
    switch (action.type){
        case 'CREATE':
            return [action.data, ...state];
        case 'UPDATE':
            return state.map((item)=> item.id === action.data.id ? action.data : item);
        case "DELETE":
            return state.filter((item)=> String(item.id) !== String(action.id));
        default:
            return state;
    }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
    const [data, dispatch] = useReducer(reducer, mockData);
    const idRef = useRef(3);

    const onCreate = (createdDate, emotionId, content) => {
        dispatch({
            type: "CREATE",
            data: {
                id: idRef.current++,
                createdDate,
                emotionId,
                content
            }
        })
    };

    const onUpdate = (id, createdDate, emotionId, content) => {
        dispatch({
            type: "UPDATE",
            data: {
                id,
                createdDate,
                emotionId,
                content
            }
        })
    };

    const onDelete = (id) => {
        dispatch({
            type: "UPDATE",
            id: id
        })
    };

  return (
      <>
          <DiaryStateContext.Provider value={data}>
              <DiaryDispatchContext.Provider value={{
                  onCreate,
                  onUpdate,
                  onDelete
              }}>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/new" element={<New/>}/>
                  <Route path="/edit/:id" element={<Edit/>}/>
                  <Route path="/diary/:id" element={<Diary/>}/>
                  <Route path="*" element={<NotFound/>}></Route>
              </Routes>
              </DiaryDispatchContext.Provider>
          </DiaryStateContext.Provider>

      </>
  )
}

export default App
