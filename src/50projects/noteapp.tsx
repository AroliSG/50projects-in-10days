import { CSSProperties, memo, useCallback, useMemo, useState } from "react";

type noteTypes = {
    index?: number,
    isDraggable: boolean,
    editable: boolean,
    update?: (index: number, type: 'isDraggable' | 'remove' | 'editable') => void,
    color: string,
    title: string,
}

const DEFAULT_PARENT_WIDTH  = '450px';
const DEFAULT_PARENT_HEIGHT = '350px';

const Notes = memo ((props: noteTypes) => {
    const {
        index,
        isDraggable,

            // function to update notes properties
        update,
        color,
        editable,
        title
    } = props;

        // positioning
    const ondrag = (evt: React.DragEvent<HTMLDivElement>) => {
        let offset = 20;
        evt.currentTarget.style.top = (evt.pageY-offset) + 'px';
        evt.currentTarget.style.left = (evt.pageX-offset) + 'px';
    };

    const titlebar_double_clicked = () => {
        const parent = document.getElementsByClassName ('parent') as HTMLCollectionOf <HTMLElement>;

        parent[0].style.width = DEFAULT_PARENT_WIDTH;
        parent[0].style.height = DEFAULT_PARENT_HEIGHT;
    }

    return (
        <div
            className   = "parent"
            draggable   = {isDraggable}
            style       = {{
                ...styles.notes_container,
                    // disabling resizing
                resize: !editable ? 'none' : 'both',

                    // adjusting width & height to a smaller size when editable is false
                width: editable ? DEFAULT_PARENT_WIDTH : '250px',
                height: editable ? '250px' : DEFAULT_PARENT_HEIGHT
            }}

                // moving element
            onDrag      = {ondrag}

                // last position
            onDragEnd   = {ondrag}

        >
            <div
                onDoubleClick   = {titlebar_double_clicked}
                style           = {{
                    ...styles.notes_tittlebar,
                    backgroundColor: color
                }}
            >
                <p style = {styles.titles_bar}>Bloc: {title==='' ? index!+1 : title}</p>
                <div>
                    <i style = {styles.titles_bar} onClick = {() => {if (update) update (index!, 'editable')}} className = "fa fa-edit" />
                    <i style = {styles.titles_bar} onClick = {() => {if (update) update (index!, 'remove')}} className = "fa fa-remove" />
                </div>
            </div>

            <textarea

                disabled    = {!editable}
                style       = {styles.notes_body}
                onFocus     = {() => {if (update) update (index!, 'isDraggable')}}
                onBlur      = {() => {if (update) update (index!, 'isDraggable')}}
            />
        </div>
    );
});


const NoteApp = () => {
    const [getNotes, setNotes]              = useState  <noteTypes[]> ([]);
    const [dropdownState, setDropdownState] = useState (false);
    const [noteState, setNoteState]         = useState ({
        title: '',
        color: '#000000'
    });
        // updating data of childs
        // notes properties
    const update = useCallback ((index: number, type: 'isDraggable' | 'remove' | 'editable') => {
        setNotes ((prev) => {
                // removing note
            if (type === 'remove') return prev.filter ((_,idx) => idx !== index);

                // updating note
                // editable/draggable
            return prev.map((data,idx) => {
                if (idx === index) {
                    return {...data, [type]: !data[type]};
                }
                return data;
            });
        });
    },[]);

        // adding new notes to the main array
        // + adding the title and the color provided
        // if color was not provided, default is black
        // if title was not provided, default will be the id of the note
    const add = () => {
            // new notes being added
        setNotes (note => {
                // if note title already exists
                // will be adding note id aside
            let name = noteState.title;
            if (note.findIndex (d => d.title === noteState.title) !== -1) name += ` - (${note.length+1})`;

            return [...note, {
                title: name,
                color: noteState.color,
                isDraggable: true,
                editable: true
            }]
        })
    };

        // properties title and color
    const changeState = (id: 'title'| 'color', value: string) => {
            // changing note properties
            // such as color & title
        setNoteState (prev => {
            prev[id] = value;
            return prev;
        });
    }

    return (
        <div style={styles.container}>
            <p>Note App</p>
            <div style={styles.dropdown_container}>
                <button style = {styles.button} onClick = {() => setDropdownState (state => !state)}>New note</button>
                {
                        // dropdown
                    dropdownState ?
                        <div style={styles.dropdown}>
                            <div style = {{
                                display:"flex",
                                justifyContent: 'center'
                            }}>
                                <input
                                    placeholder = "Title"
                                    onChange     = {evt => changeState ('title', evt.currentTarget.value)}
                                />
                                <input
                                    color       = {noteState.color}
                                    type        = {'color'}
                                    onChange    = {evt => changeState ('color', evt.currentTarget.value)}
                                />
                            </div>
                            <input
                                type        = {'submit'}
                                onClick     = {add}
                            />
                        </div>
                    : null
                }
            </div>

            {useMemo (() => getNotes.map ((note,index) => (
                <Notes
                    title       = {note.title}
                    index       = {index}
                    color       = {note.color}
                    isDraggable = {note.isDraggable}
                    update      = {update}
                    editable    = {note.editable}
                />

                // eslint-disable-next-line
            )), [getNotes])}
        </div>
    )
}

const styles: {[key:string]: CSSProperties} = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center'
    },
    notes_container: {
        position: 'absolute',
        display: 'flex',
        fontSize: '20px',
        backgroundColor: 'white',
        overflow:'hidden',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 10,
        minHeight: '350px',
        minWidth: '250px',
        flexDirection:'column',
        alignItems: 'center'
    },
    notes_tittlebar: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '50px',
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    notes_body: {
        width: '95%',
        height: '80%',
        fontSize: '15px',
        outline: 0,
        borderWidth:0,
        resize:'none'
    },
    titles_bar: {
        margin: 0,
        padding: "5px",
        zIndex: 5,
        fontWeight: 'bold',
        fontSize: '15px',
    },
    dropdown_container: {
        position: 'absolute',
        display:"flex",
        flexDirection:'column',
        right: '1%',
        top: '1%',
        borderRadius: 5,
        padding: 10,
        fontSize: '1vw',
        color: 'white',
        alignItems: 'flex-end'
    },
    dropdown: {

        backgroundColor: 'pink',
        borderRadius: 5,
        padding: 10,
        fontSize: '1vw',
        color: 'white',

    },
    button: {
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'pink'
    },
}


export default NoteApp;