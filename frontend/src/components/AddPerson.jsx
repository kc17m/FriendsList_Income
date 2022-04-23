import { useState } from "react";
import { apiBaseUrl } from "../api";

const AddPerson = (props) => {

    const [firstname, setFirstname] = useState("Lara");

    const [lastname, setLastname] = useState("Croft");
    const [bday, setBday] = useState("1972-10-30");
    const [phone, setPhone] = useState("123456789");
    const [job, setJob] = useState("Dishwasher");
    const [salary, setSalary] = useState(6666666);
    const [selfemp, setSelfemp] = useState(false);
    const [worked, setWorked] = useState(false);

    const [error, setError] = useState("")

    const handleAdd = (e) => {
        e.preventDefault()
        console.log("clicked?")

        const postObj = {
            firstname: firstname,
            lastname: lastname,
            birthday: bday,
            phone: phone,
            job: job,
            verdienst: salary,
            selfmployed: selfemp,
            workedwith: worked
        }

        console.log(postObj)

        fetch(apiBaseUrl + "/friend/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postObj)
        })
            .then(response => response.json())
            .then(data => {
                if (data.err) setError(data.err)
                else {
                    setError("")
                    setFirstname("")
                    setLastname("")
                    setBday("1972-10-25")
                    setPhone("")
                    setJob("")
                    setSalary(666)
                    setSelfemp(false)
                    setWorked(false)

                    props.setFriends(data)
                }

            })



    }





    return (
        <div>
            <h2>Add Person</h2>
            <form className="formlist">
                <label htmlFor="firstname">First Name:</label>
                <input type="text" value={firstname} name="firstname" onChange={(e) => setFirstname(e.target.value)} placeholder="Lara" />

                <label htmlFor="add">Last Name:</label>
                <input type="text" value={lastname} name="lastname" onChange={(e) => setLastname(e.target.value)} placeholder="Croft" />
                <label htmlFor="birthday">Birthday:</label>
                <input type="text" value={bday} name="birthday" onChange={(e) => setBday(e.target.value)} placeholder="1972-03-16" />
                <label htmlFor="phone">Phone:</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" placeholder="123456789" />
                <label htmlFor="job">Job:</label>
                <input type="text" value={job} onChange={(e) => setJob(e.target.value)} name="job" placeholder="dishwasher" />
                <label htmlFor="verdienst">Salary:</label>
                <input type="text" value={salary} onChange={(e) => setSalary(+(e.target.value))} name="verdienst" placeholder="66666666" />
                <label htmlFor="selfemployed">Self employed ?</label>
                <input type="checkbox" value={selfemp} onChange={(e) => setSelfemp(e.target.value)} name="selfemployed" />
                <label htmlFor="workedwith">Worked with this person?</label>
                <input type="checkbox" value={worked} onChange={(e) => setWorked(e.target.value)} name="workedwith" />
                <button onClick={handleAdd} style={{ padding: "2%" }}>Add</button>
            </form>

            <h4>{error}</h4>
        </div >
    );
}

export default AddPerson;