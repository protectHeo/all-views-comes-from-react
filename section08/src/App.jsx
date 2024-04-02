import './App.css'
import Header from "./components/Header.jsx";
import Editor from "./components/Editor.jsx";
import List from "./components/List.jsx";

function App() {

  return <div className="App">
      <Header></Header>
      <Editor></Editor>
      <List></List>
  </div>;
}

export default App