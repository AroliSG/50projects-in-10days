import axios from "axios";
import { CSSProperties, useEffect, useState } from "react";

const GITHUB_API = 'https://api.github.com/users'

type axiosDataTypes = {
    user: {
        login: string;
        id: number;
        avatar_url: string;
        name: string;
        followers: number;
        following: number;
        public_repos: number;
        bio: string;
        created_at: string;
    },
    repos: {
        name: string
    }[]
}

const GithubProfiles = () => {
    const [getUserName, setUserName]    = useState ('AroliSG');
    const [notLoading, setNotLoading]   = useState <boolean|null>(false);
    const [getUserData, setUserData]    = useState <axiosDataTypes['user']> ();
    const [getReposData, setReposData]  = useState <axiosDataTypes['repos']> ();

    const styles:{[key:string]:CSSProperties} = {
        container: {
            display: 'flex',
            flexDirection: 'column',
 
        },
        parent: {
            backgroundColor: 'pink',
            width: "50vw",
            marginTop: '50px',
            borderRadius: '25px'
        },
        img: {
            height: '150px',
            width: '150px',
            borderRadius: 75
        },
        labels: {
            fontSize: '1vw',
            margin: 0,
            marginLeft: 15,
            color: 'black',
            fontWeight: 'bold',
        },
        info_container: {
            display: 'flex',
            margin: 15,
            flexWrap: 'wrap'
        },
        fo_container: {
            display: 'flex',
            margin: 15,
            fontWeight: 'bold',
            fontSize: '1.5vw',
            marginLeft: 10,
            color: 'black'
        },
        repo_container: {
            display: 'flex',
            flexWrap: 'wrap',
            fontSize: '1vw',
            width: '95%',
            margin: 15,
        },
        input: {
            backgroundColor: 'pink',
            borderRadius: 5,
            padding: 5,
            fontSize: '1vw',
            marginTop: 15,
            outline: 0,
            color: 'white',
        },
        repo_label: {
            backgroundColor: "#5865F2",
            margin: 2,
            padding: 5,
            borderRadius: 5,
            textDecoration: 'none'
        }
    }

    useEffect (() => {
        (async () => {
            try {
                const profile = await axios (`${GITHUB_API}/${getUserName}`);
                const repos   = await axios (`${GITHUB_API}/${getUserName}/repos`);
//
                setUserData(profile.data as axiosDataTypes['user']);
                setReposData(repos.data as axiosDataTypes['repos']);

                setNotLoading (true);

                //if (profile.data.message) setNotLoading (null);
            } catch (e) {
                setNotLoading (null)
            }
        }) ();
    }, [getUserName]);

    return (
        <div style={styles.container}>
            <input
                value       = {getUserName}
                style       = {styles.input}
                onChange    = {evt => setUserName (evt.target.value)}
            />

            {notLoading ?
                <div style = {styles.parent}>
                    <div style={styles.info_container}>
                        <img
                            style   = {styles.img}
                            alt     = 'github-profiles'
                            src     = {getUserData?.avatar_url}
                        />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}>
                            <div style={{display:'flex'}}>
                                <a
                                    href    = {`https://github.com/${getUserName}`}
                                    style   = {{
                                        ...styles.labels,
                                        fontWeight: '900'
                                    }}
                                >{getUserData?.name === '' ? getUserData?.login : getUserData?.name}</a>
                                <p style={{
                                    ...styles.labels,
                                    fontWeight: '500'
                                }}>{getUserData?.login}</p>
                            </div>

                            <p style={{
                                ...styles.labels,
                                fontWeight: '500'
                            }}>{getUserData?.id}</p>

                            <div style={styles.fo_container}>
                                <i className="fa fa-group"/>
                                <p style={styles.labels}>Followers {getUserData?.followers}</p>
                                <p style={styles.labels}>Following {getUserData?.following}</p>
                                <p style={styles.labels}>Repos {getUserData?.public_repos}</p>
                            </div>

                            <p style={{
                                ...styles.labels,
                                fontWeight: '500'
                            }}>{getUserData?.bio}</p>
                        </div>
                    </div>
                    <div style = {styles.repo_container}>
                        {getReposData?.map (repo => <a href = {`https://github.com/${getUserName}/${repo.name}`} style = {styles.repo_label}>{repo.name}</a>)}
                    </div>
                    <p style={styles.labels}>Registered: {getUserData?.created_at}</p>
                </div>
            :
                <div>
                    <p>{notLoading === false ? 'Loading...' : 'Not found'}</p>
                </div>
            }
        </div>
    )
}

export default GithubProfiles;