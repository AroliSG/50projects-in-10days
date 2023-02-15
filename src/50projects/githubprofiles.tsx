import axios from "axios";
import { CSSProperties, useEffect, useState } from "react";

const GITHUB_API = 'https://api.github.com/users'

type axiosTypes = {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url:string,
    received_events_url: string,
    type: string,
    site_admin: false,
    name:string,
    company?:string,
    blog?:string,
    location?:string,
    email?:string,
    hireable?:string,
    bio:string,
    twitter_username?:string,
    public_repos: number,
    public_gists:number,
    followers:number,
    following:number,
    created_at:string,
    updated_at:string,
}

const GithubProfiles = () => {
    const [notLoading, setNotLoading]   = useState <boolean|null>(false);
    const [getUserName, setUserName]    = useState ('');
    const [getUserData, setUserData]    = useState <axiosTypes> ();
    const [getReposData, setReposData]  = useState <axiosTypes[]> ();

    const styles:{[key:string]:CSSProperties} = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        parent: {
            backgroundColor: 'pink',
            width: "50vw",
            height: '50vh',
            marginTop: '50px',
            borderRadius: '25px',
        },
        img: {
            height: '150px',
            width: '150px',
            borderRadius: 75,
        },
        labels: {
            fontSize: '1vw',
            margin: 0,
            marginLeft: 10,
            color: 'black'
        },
        info_container: {
            display: 'flex',
            margin: 15,
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
        }
    }

    useEffect (() => {
        (async () => {
            try {
                const profile = await axios (`${GITHUB_API}/${getUserName}`);
                const repos   = await axios (`${GITHUB_API}/${getUserName}/repos?sort=created`);

                setUserData (profile.data as axiosTypes);
                setReposData (repos.data as any);

                setNotLoading (true);

                if (profile.data.message) setNotLoading (null);
            } catch (e) {
                setNotLoading (null)
            }
        }) ();
    }, [getUserName]);

    return (
        <div style={styles.container}>
            <input
                onChange={evt => setUserName (evt.target.value)}
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
                    <div>
                        {getReposData?.map (repo => {
                            return (
                                <div>
                                        <p>{repo.name}</p>
                                </div>
                            )
                        })}
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