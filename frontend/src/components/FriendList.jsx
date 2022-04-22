import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import AddPerson from "./AddPerson";
import ButtonSort from "./ButtonSort";

const FriendList = () => {
    const [friends, setFriends] = useState([])
    // const [sortedFriends, setSortedFriends] = useState([friends])

    useEffect(() => {
        fetch("http://localhost:8600/friends")
            .then(response => response.json())
            .then(friendsData => setFriends(friendsData))
    }, [])

    const handleSort = () => {
        const sorted = [...friends].sort((a, b) => { return a.verdienst < b.verdienst ? 1 : -1 })
        setFriends(sorted)
    }


    return (<div>
        <AddPerson friends={friends} setFriends={setFriends} />


        <h1>These people might think they are my "Friends"</h1>
        <ButtonSort handleSort={handleSort} friends={friends} setFriends={setFriends} />
        <ul className="unsorted">
            {friends.map(friend =>
                <li key={friend._id}>
                    <Link to={"/friend/" + friend._id}> <h2> {friend.firstname} {friend.lastname}</h2> <h3>Salary: $ {friend.verdienst.toLocaleString()}  </h3></Link>
                </li>
            )}
        </ul>
    </div>);
}

export default FriendList;