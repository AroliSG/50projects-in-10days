import { CSSProperties, useEffect, useState } from "react";

const POKE_LIMIT = 150;

// credits for this component https://gist.github.com/apaleslimghost/0d25ec801ca4fc43317bcff298af43c3
const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};


type Pokemon = {
    id: number;
    name: string;
    abilities: Array<{}>;
    base_experience: number;
    forms: Array<{}>;
    game_indices: Array<{}>;
    height: number;
    sprites: {
        back_default: string|null;
        back_female: string|null;
        back_shiny: string|null;
        back_shiny_female: string|null;
        front_default: string|null;
    };
    types: [
        {
            slot: number;
            type: {
                name: string;
                url: string|null;
            }
        }
    ]
}

const fetchPokemon = (n: number) => {
    const promises = [];
    for (let i = 1; i <= n; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    return Promise.all(promises);
};

const PokeDex = () => {
    const [getPokemons, setPokemons]    = useState <Pokemon[]> ([]);
    const styles: { [key: string]: CSSProperties } = {
        container: {
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridRow: 20,
            padding: 20,
            gap: 20
        },
        pokeItems: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: 'center',
            width: 200,
            height: 300,
            borderRadius: 5,
        },
        pokeColour1: {
            position: "absolute",
            height: "100%",
            width: "50%",
            backgroundColor: "red",
            zIndex: -1,
            left: 0,
            borderRadius: "10px 0px 0px 10px",
        },
        pokeColour2: {
            position: "absolute",
            height: "100%",
            width: "50%",
            backgroundColor: "red",
            zIndex: -1,
            right: 0,
            borderRadius: "0px 10px 10px 0px",
        },
        pokeTitle: {
            fontSize: 20,
            margin: 0,
            padding: 8,
            color: "black",
            borderRadius: 15,
            backgroundColor: "rgba(0,0,0,0.1)",
        },
        pokeTypesLabel: {
            fontSize: 15,
            margin: 0,
            padding: 0,
            color: "black"
        },
        pokeSprite: {
            objectFit: 'cover',
            width: 100,
            height: 100,
        }
    };

    useEffect(() => {
        (async () => {
            fetchPokemon (POKE_LIMIT)
                .then (dt => {
                    const mp = dt.map((result: Pokemon) => ({
                        id: result.id,
                        name: result.name,
                        sprites: result.sprites,
                        abilities: result.abilities,
                        base_experience: result.base_experience,
                        forms: result.forms,
                        game_indices: result.game_indices,
                        height: result.height,
                        types: result.types
                    }));

                    setPokemons (mp);
                });
        }) ();

    }, []);

        // poke Items
        // showing each Pokemon
    const PokeItems = (props: {
        poke: Pokemon
    }) => {

        const {
            poke
        } = props;

        const PokeSprite    = poke.sprites.front_default;
        const PokeTypes     = poke.types.map(t => t.type.name).join (', ');
        const PokeColour    = poke.types.map(t => colours[t.type.name as never]) as any;

        return (
            <div style={{
                    ...styles.pokeItems,
                }}>

                <div
                    style={{
                        ...styles.pokeColour1,
                        backgroundColor: PokeColour[0]
                    }}
                />

                <div
                    style={{
                        ...styles.pokeColour2,
                        backgroundColor: PokeColour.length === 2 ? PokeColour[1] : PokeColour[0]
                    }}
                />

                <img
                    alt     = {poke.name}
                    src     = {PokeSprite!}
                    style   = {styles.pokeSprite}
                />

                <p style={styles.pokeTitle}>{poke.name} #{poke.id}</p>
                <p style={styles.pokeTypesLabel}>Type(s) {PokeTypes}</p>
            </div>
        )
    }

    return (
        <div>
            <h1>Poke Dex</h1>
            <div style={styles.container}>
                {getPokemons.map (poke => <PokeItems key = {poke.name}  poke = {poke} />)}
            </div>
        </div>
    )
}

export default PokeDex;