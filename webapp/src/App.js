import { useReducer, useEffect } from 'react'
import './App.css'

const ItemTweet = (data) => {
    return (
        <div className="wrapper-tweet">
            <div className="wrapper-avatar-tweet">
                <img src={data.data.user.profile_image_url} alt="profile-pic" />
            </div>
            <div className="wrapper-description-tweet">
                <h5>{data.data.user.name}</h5>
                <p>{data.data.text}</p>
            </div>
        </div>
    )
}

function App() {
    const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
        userInfo: null,
        userTweets: [],
        status: 'loading',
    })

    const fetchUserInfo = async (userId) => {
        try {
            const response = await fetch(
                `https://gttlv53w6g.execute-api.us-east-1.amazonaws.com/dev/users/${userId}`,
            ).then((response) => response.json())

            return response
        } catch (e) {
            throw new Error('Cant fetch user info')
        }
    }

    const fetchUserTweets = async (username) => {
        try {
            const response = await fetch(
                `https://gttlv53w6g.execute-api.us-east-1.amazonaws.com/dev/users-twitter/${username}/tweets`,
            ).then((response) => response.json())

            return response
        } catch (e) {
            throw new Error('Cant fetch user tweets')
        }
    }

    useEffect(() => {
        const userId = 1
        fetchUserInfo(userId).then((info) => {
            fetchUserTweets(info.data.twitter_username).then((tweets) => {
                setState({
                    status: 'resolved',
                    userInfo: info.data,
                    userTweets: tweets.data,
                })
            })
        })
    }, [])

    if (state.status === 'loading')
        return (
            <div style={{ textAlign: 'center' }}>
                <h3>Loading...</h3>
            </div>
        )

    const { userInfo, userTweets } = state
    return (
        <div className="App">
            <section className="main">
                <div className="wrapper-left-container">
                    <div className="wrapper-profile-image">
                        <img src={userInfo.profile_image_url} alt="profile" />
                    </div>
                    <br />
                    <div className="wrapper-timeline">
                        <h4>{userInfo.first_name} Timeline</h4>
                        <hr />
                        <div className="wrapper-tweet-list">
                            <ul>
                                {userTweets.map((item, index) => (
                                    <li key={`tweet-${index}`}>
                                        <ItemTweet data={item} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <a
                                href={`https://twitter.com/${userInfo.twitter_username}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Go to my Account
                            </a>
                        </div>
                    </div>
                </div>
                <div className="wrapper-right-container">
                    <div className="wrapper-title">
                        <h1>
                            {userInfo.first_name} {userInfo.last_name}
                        </h1>
                    </div>
                    <div className="wrapper-experience">
                        <h4>My Work Experience</h4>
                        <hr />
                        <div className="wrapper-paragraph-experience">
                            <p>{userInfo.description}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default App
