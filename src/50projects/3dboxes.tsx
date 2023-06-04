import {useState} from 'react';
import { CSSProperties, useEffect } from "react";

type GridTypes = {
      id: string;
      image: NodeRequire,
      offset: number;
}

const quantity = 5;

const ImageGrid = (props: GridTypes) => {
      const { id, image, offset } = props;
      const container = document.getElementById(id)!;

      const w = container.offsetWidth;
      const h = container.offsetHeight;

      for (let j = 0; j < quantity; j++) {
                  // horizontal positioning  of the image
            const w_percent = ((j) / quantity) * 100;
            for (let i = 0; i < quantity; i++) {
                        // vertical positioning of the image
                  const y_percent         = ((i) / quantity) * 100;
                  const div               = document.createElement("div");
                  div.style.position      = "absolute";
                  div.style.bottom        = "0px";
                  div.style.transitionDuration = "1s"

                        // moving the image parts
                  div.style.top           = (h / quantity + offset) * i + "px";
                  div.style.left          = (w / quantity + offset) * j + "px";

                //  div.style.boxShadow     = "5px 5px 5px 5px rgba(255, 255, 255, 255)"

                  document.getElementById('ImageGrid')!
                        .appendChild(div);

                  div.style.width   = w / quantity + "px";
                  div.style.height  = h / quantity + "px";

                        // offset
                //  div.style.margin              = `${offset}px`;

                  div.style.backgroundImage     = `url(${image})`;
                  div.style.backgroundPosition  = `${w_percent}% ${y_percent}%`

                  div.style.backgroundSize      = w + "px";
            }
      }
}

const ThreeDimensionalBoxes = () => {
      const [getGridState, setGridState] = useState (false);
      const styles: { [key: string]: CSSProperties } = {
            container: {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  flexDirection: 'column',
            },
            ImageGrid: {
                  width: "1000px",
                  height: "500px",
                  position:"relative",
            }
      }

      useEffect (() => {
                  // image grid
            ImageGrid ({
                  id: "ImageGrid",
                  image: require('../assets/vc_background_0.jpg'),
                  offset: 0,
            });
      }, []);

      useEffect (() => {
            const parent      = document.getElementById("ImageGrid")!;
            const children    = parent?.children!;

            const w = parent.offsetWidth;
            const h = parent.offsetHeight;
for (let j = 0; j < children.length; j++) {
            for (let i = 0; i < children.length; i++) {
                  const offset = 20;
                  const div = children[i] as HTMLElement;
                  div.style.position      = "absolute";
                  div.style.bottom        = "auto";
                  div.style.top           =  "auto";
                  div.style.left          = "auto";
                        // moving the image parts
                  div.style.top           = (h / quantity + offset) * i + "px";
                  div.style.left          = (w / quantity + offset) * j + "px";
                  //     const top = parseInt(div.style.top, 10) + (offset*i) + "px";

                  //  div.style.top = top;

                 // const left = parseInt(div.style.left, 10) + (offset*i) + "px";
                 // div.style.left = left;

                 // child.style.backgroundColor = "blue"
            }
      }
      }, [getGridState]);


      return (
            <div style={styles.container}>
                  <h3>3D Boxes</h3>
                  <button onClick={() => setGridState(GridState => !GridState)}>Magic</button>
                  <div id="ImageGrid" style = {styles.ImageGrid}/>
            </div>
      )
}

export default ThreeDimensionalBoxes;