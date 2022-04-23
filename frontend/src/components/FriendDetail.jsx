import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"


const FriendDetail = () => {

    const { friendId } = useParams()
    const [friend, setFriend] = useState()

    useEffect(() => {
        fetch("http://localhost:8600/friends/" + friendId)
            .then(response => response.json())
            .then(friendData => {
                if (!friendData.err) {
                    setFriend(friendData)
                }
            })
    }, [friendId])

    if (friend) return (
        <div className="frienddetail"><h1>My Lovely Friends in Detail</h1>
            <section className="friendDetailsect">

                <h1 >{friend.firstname} {friend.lastname}</h1>
                <h3>Birthday: {friend.birthday.length > 12 ? friend.birthday.slice(0, 10) : friend.birthday}</h3>
                <h3>Phone: {friend.phone}</h3>
                <h3>Job: {friend.job}</h3>
                <h3>Salary: $ {friend.verdienst.toLocaleString()}</h3>
                <h3>Self Employed?</h3> {friend.selfemployed ? <h4>Yes, this guy is self employed</h4> : <h4>No, not self employed</h4>}
                <h3>Have I ever worked with this guy? </h3>{friend.workedwith ? <h4>Yes, this is a "valuable" friend</h4> : <h4>No, no "valuable" friend</h4>}
            </section>
            <Link to="/"> <button> Go Back</button></Link></div >)
    else return <h1>No such friend</h1>
}

export default FriendDetail;