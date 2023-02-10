import './App.css';
import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import ErrorMessage from './errorMessage';
import Dashboard from './Dashboard';
import Projects from './projectList';

function App() {
  useEffect (() => {
    document.title = '50 Projects';
  });

  return (
    <Routes>
    <Route path="/" element = {<Navbar />} >
    <Route index element = {<Dashboard/>} />
      {Projects.map (list => {
        const dir = list.name.replace (' ', '').toLocaleLowerCase ();

        return (
          <Route path={dir} element = {<list.Element/>}/>
        )
      })}

      {/* Using path="*"" means "match anything", so this route
            acts like a catch-all for URLs that we don't have explicit
            routes for. */}
      <Route path="*" element={<ErrorMessage />} />
    </Route>
  </Routes>
  );
}

const Navbar = () => {
  const [dropState, setDropState] = useState (false);
  const [height, setHeight]       = useState(0);

  const div = useCallback((node:any) => {
    if (node !== null) setHeight(node.getBoundingClientRect().height);
  }, []);

  return (
    <div className='container'>
      <nav className='navbar' ref = {div}>
        <i className='Logo' onClick={() => window.location.href = '/'}>50 Projects</i>

        <i className = "fa fa-github" onClick={() => {
          window.location.href = 'https://github.com/AroliSG';
        }}></i>

        <i className = "fa fa-bars" onClick={() => setDropState (t => !t)}></i>

      </nav>

        {dropState ? <div className='dropList' style={{
          top: height-5
        }}>
          {Projects.map ((list, index) => {
              // drop down
            return (
              <div className = 'drop-title-container'
                style = {{
                  paddingTop: index === 0 ? "10px" : 0,
                  paddingBottom: (index+1) === Projects.length ? "5px" : 0
                }}
                onClick = {() => {
                  const dir = list.name.replace (' ', '').toLocaleLowerCase ();
                  window.location.href = dir;
                }}
              >
                <p className = 'p drop-title'>{index+1} {list.name}</p>
              </div>
            );
          })}
        </div> : null}

      <div className='container-outlet'>
        <Outlet />
      </div>
    </div>
  );
}


export default App;
