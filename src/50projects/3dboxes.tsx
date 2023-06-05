import {useState} from 'react';
import { CSSProperties, useEffect } from "react";

type GridTypes = {
      id: string;
      image: NodeRequire,
      offset: number;
}

const quantity = 5;
const percents = {
      horizontal: 125,
      vertical: 100,
}

const moveGrid = (
      offset: number, div: HTMLElement,
      width: number, height: number,
      i: number, j: number
) => {
            // moving the image parts
            // opening the image grid
      if (offset === 50) {
            div.style.left  = (width) * j + "px";
            div.style.top   = (height) * i + "px";

            setTimeout(() => {
                  div.style.boxShadow     = "5px 5px 5px 5px rgba(255, 255, 255, 255)";

                  div.style.transform     = "rotateZ(360deg)";
                  div.style.left          = (width+50) * j + "px";
                  div.style.top           = (height+50) * i + "px";
            }, 500);
      }
            // closing the image grid
      else {
            div.style.boxShadow     = "5px 5px 5px 5px rgba(255, 255, 255, 255)";
            div.style.left  = (width+50) * j + "px";
            div.style.top   = (height+50) * i + "px";

            setTimeout(() => {
                  div.style.boxShadow     = "0px 0px 0px 0px rgba(255, 255, 255, 255)";

                  div.style.transform     = "rotateZ(-360deg)"
                  div.style.left          = (width) * j + "px";
                  div.style.top           = (height) * i + "px";
            }, 500);
      }
}

const ImageGrid = (props: GridTypes) => {
      const { id, image, offset } = props;
      const container = document.getElementById(id)!;

      const w = container.offsetWidth;
      const h = container.offsetHeight;

      const width       = (w / quantity);
      const height      = (h / quantity);

      for (let j = 0; j < quantity; j++) {
                  // horizontal positioning  of the image
            const w_percent = ((j) / quantity) * percents.horizontal;
            for (let i = 0; i < quantity; i++) {
                        // vertical positioning of the image
                  const y_percent         = ((i) / quantity) * percents.vertical;
                  const div               = document.createElement("div");
                  div.style.position      = "absolute";
                  div.style.bottom        = "0px";
                  div.style.transitionDuration = "1s"


                  document.getElementById('ImageGrid')!
                        .appendChild(div);

                  div.style.width   = w / quantity + "px";
                  div.style.height  = h / quantity + "px";

                        // we're moving the grid in different directions
                  moveGrid (
                        offset,
                        div,
                        width,
                        height,
                        i,
                        j
                  );

                  div.style.backgroundImage     = `url(${image})`;
                  div.style.backgroundPosition  = `${w_percent}% ${y_percent}%`

                  div.style.backgroundSize      = w + "px";
            }
      }
}

const ThreeDimensionalBoxes = () => {
      const [getGridState, setGridState] = useState (0);
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
            const isOpen = getGridState % 2 === 0;
                  // image grid
            ImageGrid ({
                  id: "ImageGrid",
                  image: require('../assets/vc_background_0.jpg'),
                  offset: isOpen ? 50 : 0,
            });
      }, [getGridState]);

      return (
            <div style={styles.container} key={getGridState}>
                  <h3>3D Boxes</h3>
                  <button onClick={() => setGridState(g => g+1)}>Magic</button>
                  <div id="ImageGrid" style = {styles.ImageGrid}/>
            </div>
      )
}

export default ThreeDimensionalBoxes;