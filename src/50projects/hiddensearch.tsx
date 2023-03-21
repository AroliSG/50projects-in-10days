import { CSSProperties } from "react";
const input_size = 300;
const HiddenSearch = () => {
    const styles: { [key: string]: CSSProperties } = {
        container: {
            margin: '20px'
        },
        search: {
            padding: '10px',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor:  "#5865F2",
            color: 'white',
            borderWidth: 0
        },
        search_container: {
            display: 'flex',
        },
        inputs: {
            fontSize: '1.2vw',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            transitionDuration: "2s",
            width: input_size,
            borderWidth: 0
        },
        icon: {
            fontSize: '1.2vw',
        }
    }

    return (
        <div style={styles.container}>
            <div style = {styles.search_container}>
                <input
                    className   = "input"
                    style       = {styles.inputs}
                    placeholder = "Search.."
                />
                <button
                    style   = {styles.search}
                    onMouseDown = {evt => {
                        const element = document.getElementsByClassName ('input') as HTMLCollectionOf<HTMLElement>;

                        if (element[0].style.width === '0px') element[0].style.width = input_size + 'px';
                        else element[0].style.width = '0px';
                    }}
                    onMouseUp   = {evt => evt.currentTarget.style.opacity = '1'}
                >
                    <i
                        className   = "fa fa-search"
                        style       = {styles.icon}

                    />
                </button>
            </div>
        </div>
    )
}

export default HiddenSearch;