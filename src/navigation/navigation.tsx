import { useCallback, useState } from "react";
import Projects from "../projectList";
import { Outlet } from "react-router-dom";

const Navbar = () => {
    const [dropState, setDropState] = useState (false);
    const [height, setHeight]       = useState (0);

    const ref = useCallback((evt: HTMLElement | null) => {
      if (evt !== null) setHeight(evt.getBoundingClientRect().height);
    }, []);

    return (
      <div className='container'>

        <nav className='navbar' ref = {ref}>
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
                <div key = {list.name} className = 'drop-title-container'
                  style = {{
                    paddingTop: index === 0 ? "10px" : 0,
                    paddingBottom: (index+1) === Projects.length ? "5px" : 0
                  }}
                  onClick = {() => {
                    const dir = list.name.replace (' ', '').toLocaleLowerCase ();
                    window.location.href = `#/${dir}`;
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

export default Navbar;