import axios from "axios";
import { CSSProperties, useEffect, useState } from "react";


type singleMovieType = {
    Actors:string,
    Awards: string,
    BoxOffice:string,
    Country:string,
    DVD:string,
    Director:string,
    Genre:string,
    Language:string
    Metascore:String,
    Plot:string,
    Poster:string,
    Production:string,
    Rated:string,
    Ratings:string,
    Released:string,
    Response:string,
    Runtime:string,
    Title:string,
    Type:string,
    Website:string,
    Writer:string,
    Year:string
    imdbID:string
    imdbRating:string
    imdbVotes :string;
    Error:string;
}

type movieTypes = {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}

type movieProps = {
    movie: singleMovieType,
    index: number
}

const MovieApp = () => {
    const [error, setError]                     = useState ("Loading..");
    const [getMovieByTitle, setMoviesByTitle]   = useState ("");
    const [getMovies, setMovies]                = useState <singleMovieType[]> ([]);

    const styles: {[key:string]:CSSProperties} = {
        container: {
            display: 'flex',
            flexDirection: "column",
            alignItems: "center"
        },
        movie_container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: "80%"
        },
        movie_box_bottom: {
            position: 'relative',
            display: 'flex',
            flexWrap: 'wrap',
            width: "100%",
            height: '20%',
            backgroundColor: "#5865F2",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
        },
        poster: {
            width: "100%",
            height: '80%',
            margin:0,
            padding: 0,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5
        },
        Title: {
            fontSize: '1vw',
            fontWeight: 'lighter',
            textAlign: 'center',
            width: "100%"
        },
        cover: {
            position: 'absolute',
            display: 'flex',
            backgroundColor: 'white',
            height: "0%",
            width: "100%",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            bottom: 0,
            transitionDuration: '2s',
            zIndex: 9,
            justifyContent: "center",
            alignItems: 'center'
        },
        labels: {
            position: 'absolute',
            top: 0,
            fontWeight: 'bolder',
            backgroundColor: "#5865F2",
            fontSize: '1vw',
            padding: '5px',
            borderRadius: 5
        },
        plot: {
            pointerEvents: 'none',
            fontSize: '0.8vw',
            transitionDuration: '1s',
            color: 'black',
            opacity: '0',
            width: '90%'
        },
        plot_title: {
            pointerEvents: 'none',
            fontSize: '0.8vw',
            transitionDuration: '1s',
            color: 'black',
            opacity: '0',
            width: '90%'
        },
        input: {
            outline: 0,
            borderRadius: 10,
            padding: '5px'
        }
    }

    useEffect (() => {
       // axios.get ('http://www.omdbapi.com/?apikey=48ad21a&s=home')
        //    .then (res => res.data.Search.forEach ((movie: movieTypes) => setMovies (m => [movie, ...m as []])))

      //  axios.get ('http://www.omdbapi.com/?apikey=48ad21a&s=adventures')
       //     .then (res => res.data.Search.forEach ((movie: movieTypes) => setMovies (m => [movie, ...m as []])))
        setMovies ([]);
        const genre = getMovieByTitle.replaceAll(' ', '') === '' ? 'action': getMovieByTitle;
        (async () => {
            const movieList = await axios.get (`http://www.omdbapi.com/?apikey=48ad21a&s=${genre}`);
            if (movieList.data.Search)
            movieList.data.Search.forEach (async (movie: movieTypes) => {
                const res = await axios.get (`http://www.omdbapi.com/?apikey=48ad21a&t=${movie.Title}`);
                setMovies (m => {
                    const checkIsHanded = m.findIndex (m => m.Title === res.data.Title);
                        /*
                            react was re-rendering so we can't stop this by checking is data is already handed
                        */
                    if (checkIsHanded !== -1) return m;
                    return [res.data, ...m as []];
                });
            });

            if (movieList.data.Error) setError ("Error invalid entry");
            else setError ('Loading.');
        }) ();
    }, [getMovieByTitle]);

    const hoverOut = (index: number, dir: number) => {
        const cover = document.getElementsByClassName ('cover') as HTMLCollectionOf <HTMLElement>;
        const plot     = document.getElementsByClassName ('plot') as HTMLCollectionOf <HTMLElement>;

        plot[index].style.opacity = `${dir}`;
        cover[index].style.height = `${dir === 1 ? 70 : 0}%`;
    }

    const Movies = (props: movieProps) => {
        const {movie, index} = props;

            // movie not found
        if (movie.Poster === 'N/A') return null;
        if (movie.Error) return null;

        return (
            <div
                onMouseOver={() => hoverOut (index, 1)}
                onMouseOut ={() => hoverOut (index, 0)}

                key     = {movie.Title}
                style   = {{
                    ...styles.container,
                    margin: 10,
                    width: '250px',
                    position: 'relative',
                }}
            >
                <div className="cover" style={styles.cover}>
                    <p className="plot" style={styles.plot}>
                        <p>Plot</p>
                        {movie.Plot}
                        <p>Released on {movie.Released}</p>
                    </p>
                </div>
                <img
                    alt     = "movie-app"
                    src     = {movie.Poster}
                    style   = {styles.poster}
                />
                <p style={{
                    ...styles.labels,
                    left: '5px',
                }}>{movie.Rated}</p>

                <p style={{
                    ...styles.labels,
                    right: '5px',
                }}>{movie.imdbRating}</p>
                <div style={styles.movie_box_bottom}>
                    <p style={styles.Title}>{movie.Title}</p>
                </div>
            </div>
        )
    }

    return (
        <div style = {styles.container}>
            <p>Movies</p>
            <input
                value       = {getMovieByTitle}
                style       = {styles.input}
                placeholder = "search movie by title"
                onChange    = {evt => setMoviesByTitle (evt.target.value)}
            />
            <div style = {styles.movie_container}>
                {getMovies.length > 0 ? getMovies.map ((movie, index) => <Movies movie = {movie} index = {index}/> ) : <p>{error}</p>}
            </div>
        </div>
    )
}


export default MovieApp;