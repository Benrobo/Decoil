import React, { useState, useEffect } from 'react'
import { Container } from '..'
import { FaArrowLeft } from "react-icons/fa"
import { BiTime } from "react-icons/bi"
import { FiMoreVertical } from 'react-icons/fi'

import { Notification, UUID, validURL } from "../../helpers/util"

const notif = new Notification()


function getDays(day) {

    if (parseInt(day) == 1) {
        return "Mon"
    }
    if (parseInt(day) == 2) {
        return "Tue"
    }
    if (parseInt(day) == 3) {
        return "Wed"
    }
    if (parseInt(day) == 4) {
        return "Thur"
    }
    if (parseInt(day) == 5) {
        return "Fri"
    }
    if (parseInt(day) == 6) {
        return "Sat"
    }
    if (parseInt(day) == 7) {
        return "Sun"
    }

}


function LinkSchedules() {

    const [activeSchedule, setActiveSchedule] = useState(false)

    const [links, setLinkSchedules] = useState([])
    const [categories, setCategories] = useState([])
    const [isChaned, setIsChanged] = useState("")
    const [activeCategory, setActiveCategory] = useState("all")



    const filtCat = []

    function fetchLinkSchedules() {
        const scheduledData = localStorage.getItem("link_schedules");
        const data = JSON.parse(scheduledData)

        data.map((list) => {
            if (!filtCat.includes(list.category)) {
                filtCat.push(list.category)
            }
        })

        setCategories([...filtCat])

        setLinkSchedules([...data])
    }

    useEffect(() => {
        fetchLinkSchedules()
        console.log(links);
    }, [isChaned])

    function handleActiveCategories(e) {
        let { cat } = e.target.dataset;

        if (typeof cat !== undefined) {
            setActiveCategory(cat)
        }

        // filter data based on the categories
        let linkData = JSON.parse(localStorage.getItem("link_schedules"))

        let filtData;
        console.log(cat);
        if (cat !== "all") {
            filtData = linkData.filter((link) => link.category === cat);
            setLinkSchedules([...filtData])
            // console.log(links);
            // setIsChanged(UUID(56))
            return
        }
        filtData = linkData;
        setLinkSchedules([...filtData])
        // setIsChanged(UUID(10))


    }

    return (
        <Container>
            <div className="relative w-full h-screen bg-white-300">
                <div className="w-full flex flex-row items-center justify-start p-3 relative ">
                    <FaArrowLeft className=' text-[35px] mr-[30px] text-dark-100 p-2 hover:bg-dark-200 hover:text-white-100 hover:shadow-lg rounded-md ' />
                    <h2 className=" text-[20px] text-dark-100">Scheduled Links.</h2>
                </div>
                <br />
                <div id="tags" className="w-full flex flex-row items-center justify-start px-4 ">
                    {categories.length > 0 && <span data-cat={"all"} className={`px-5 py-2 rounded-[15px] font-semibold ${activeCategory === "all" ? "bg-blue-200 text-white-100" : "bg-white-200 text-dark-100"} transition-all cursor-pointer scale-[.90] hover:scale-[.95]`} onClick={handleActiveCategories}>All</span>}
                    {
                        categories.length === 0 ?
                            ""
                            :
                            categories.map((cat, i) => {
                                return (
                                    <span data-cat={cat} key={i} className={`px-5 py-2 rounded-[15px] font-semibold ${activeCategory === cat ? "bg-blue-200 text-white-100" : "bg-white-200 text-dark-100"} transition-all cursor-pointer scale-[.90] hover:scale-[.95]`} onClick={handleActiveCategories}>{cat}</span>
                                )
                            })
                    }
                </div>
                <br />
                <div className="w-full h-full overflow-y-scroll relative p-5 gap-2 ">
                    <LinkCards links={links} setIsChanged={setIsChanged} />

                    <div id="space" className="w-full h-[150px] "></div>
                </div>

                <div className="w-full h-[100px] absolute bottom-0 left-0 flex flex-col items-center justify-center z-[100]">
                    <button id="addLinks" className="w-[200px] px-5 py-4 bg-blue-200 shadow-lg rounded-[30px] text-white-100 absolute transition-all cursor-pointer scale-[.90] hover:scale-[.95] " onClick={() => setActiveSchedule(true)}>
                        New Schedule
                    </button>
                </div>

                {activeSchedule && <AddSchedule setActiveSchedule={setActiveSchedule} setIsChanged={setIsChanged} />}
            </div>
        </Container>
    )
}

export default LinkSchedules


function LinkCards({ links, setIsChanged }) {

    const [isactive, setIsActive] = useState(false)

    function showMoreCont(e) {

        let { id } = e.target.dataset;
        let moreCont = e.target.parentElement.querySelector("#more-cont");

        if (typeof id !== undefined && moreCont !== null) {
            setIsActive(!isactive)
            moreCont.style.top = isactive ? "20px" : "-100px"
        }
    }

    function deleteLink(e) {
        let { id } = e.target.dataset;
        let moreCont = e.target.parentElement;
        let prevLinks = JSON.parse(localStorage.getItem("link_schedules"));

        if (typeof id !== undefined) {
            let updatedLink = prevLinks.filter((link) => link.id !== id)
            localStorage.setItem("link_schedules", JSON.stringify(updatedLink))
            setIsActive(!isactive)
            moreCont.style.top = "-100px"
            notif.success("Link Deleted Successfully.")
            setIsChanged(UUID(10))
        }
    }

    return (
        <>
            {
                links.length === 0 ?
                    <p>Oops 🤭, no avaialable links scheduled</p>
                    :
                    links.map((list) => (

                        <div className="w-full mt-2 h-[150px] max-h-[180px] p-0 bg-white-100 shadow-xl rounded-[2px] relative flex flex-row items-center justify-start overflow-hidden">
                            <div className="w-[10px] h-full bg-dark-200  "></div>
                            <div className="body px-5 py-3 w-full h-auto">
                                <h2 id="title" className="text-[20px] font-bold ">{list.title}</h2>
                                <div id="time" className='flex flex-row items-center justify-start mt-4 mb-3'>
                                    <BiTime className='mr-4 text-white-400  text-[15px] ' />
                                    <span className="text-white-400 font-bold ">{list.time}{list.timeOffset.toLowerCase()}</span>
                                </div>

                                {
                                    list.days.map((day) => {
                                        return (
                                            <span data-day={day} key={day} className="px-4 py-2 text-[12px] font-bold bg-dark-200 text-white-100 rounded-md relative mr-3">{getDays(day)}</span>
                                        )
                                    })
                                }
                            </div>

                            <FiMoreVertical className=" text-[40px] p-3 text-dark-200 absolute right-5 top-5 transition-all hover:bg-white-300 hover:scale-[.90] cursor-pointer" data-id={list.id} onClick={showMoreCont} />

                            <div id="more-cont" data-id={list.id} className={`w-[150px] h-auto flex items-start justify-start flex-col gap-3 absolute top-[-100px] transition-all right-[90px] list-none bg-white-100 shadow-md rounded-md overflow-hidden shadow-dark-400 p-2 `}>
                                {/* <li className="px-3 py-1 w-full hover:bg-blue-200 hover:text-white-100 rounded-md cursor-pointer">Edit</li> */}
                                <li className="px-3 py-1 hover:bg-red-200 hover:text-white-100 rounded-md cursor-pointer w-full" onClick={deleteLink} data-id={list.id}>Delete</li>
                            </div>
                        </div>
                    ))
            }
        </>
    )
}

function AddSchedule({ setActiveSchedule, setIsChanged }) {

    const [selectedDay, setSelectedDay] = useState([])
    const [dayPickerActive, setDayPickerActive] = useState(false)
    const [inputs, setInputs] = useState({
        title: "",
        url: "",
        category: "",
        description: "",
        time: ""
    })

    const days = [
        {
            num: 1,
            day: "Mon",
            selected: false
        },
        {
            num: 2,
            day: "Tue",
            selected: false
        },
        {
            num: 3,
            day: "Wed",
            selected: false
        },
        {
            num: 4,
            day: "Thur",
            selected: false
        },
        {
            num: 5,
            day: "Fri",
            selected: false
        },
        {
            num: 6,
            day: "Sat",
            selected: false
        },
        {
            num: 7,
            day: "Sun",
            selected: false
        }
    ]

    function handleSelectedDays(e) {
        let { day } = e.target.dataset;

        let filteredSelectedDay = days.filter((list) => list.num === parseInt(day))[0]

        filteredSelectedDay["selected"] = !filteredSelectedDay["selected"]

        const isExists = selectedDay.filter((list) => list.num === filteredSelectedDay.num)

        if (isExists.length > 0) {
            let removeSelectedDay = selectedDay.filter((list) => list.num !== filteredSelectedDay.num)
            console.log(removeSelectedDay);
            setSelectedDay([...removeSelectedDay])
            return
        }
        setSelectedDay((prevVal) => ([...prevVal, filteredSelectedDay]))

    }

    function handleInputs(e) {
        let name = e.target.name;
        let val = e.target.value
        // console.log({ [name]: e.target.value });
        setInputs((prevVal) => ({ ...prevVal, [name]: val }))
    }

    function saveDataToStorage() {

        const { title, url, category, description, time } = inputs;

        if (title === "") {
            return notif.error("title cant be blank")
        }
        if (url === "") {
            return notif.error("url cant be blank")
        }
        if (category === "") {
            return notif.error("category cant be blank")
        }
        if (description === "") {
            return notif.error("description cant be blank")
        }
        if (time === "") {
            return notif.error("time cant be blank")
        }
        if (selectedDay.length === 0) {
            return notif.error("days cant be blank")
        }

        if (validURL(url) === false) {
            return notif.error("invalid url given")
        }


        // format data

        const timeStamp = time.split(":")[0] >= 12 ? "PM" : "AM"


        const dataToBeStored = {
            id: UUID(10),
            title,
            description,
            category,
            time,
            url,
            days: selectedDay.map((list) => list.num),
            timeOffset: timeStamp
        }

        // store in localstorage
        let linkStorage = JSON.parse(localStorage.getItem("link_schedules"))

        linkStorage.push(dataToBeStored)

        localStorage.setItem("link_schedules", JSON.stringify(linkStorage))

        setActiveSchedule(false)
        setIsChanged(UUID(12))
        return notif.success("Link Scheduled Successfully.")

    }

    return (
        <div className="w-full h-screen absolute top-0 z-[120] bg-dark-400 flex items-center justify-center flex-col p-8 ">
            <div className="w-full h-auto bg-white-100 rounded-md overflow-hidden ">
                <div id="head" className="w-full p-5">
                    <h2 id="title" className="text-[20px] font-bold ">Add Links</h2>
                    <span id="desc" className="w-full italic text-dark-100 text-[12px] ">Schedule when you would like this link to get opened in the browser.</span>
                </div>
                <div id="form" className="w-full h-auto p-5 ">
                    <input type="text" className="w-full px-2 py-2 rounded bg-white-200 shadow-lgs " placeholder='Title' name="title" onChange={handleInputs} value={inputs.title} />
                    <br />
                    <div id="customInput" className="relative w-full h-auto mt-3">
                        <div id="top" className="w-full flex flex-row items-center justify-between">
                            <button className="px-5 py-2 rounded-md bg-blue-200 text-white-100" onClick={() => setDayPickerActive(true)}>Select Days</button>
                            <input type="time" className="w-[50%] px-2 py-2 rounded bg-white-200 shadow-lgs " placeholder='Time' name="time" onChange={handleInputs} value={inputs.time} />
                        </div>
                        <div id="bottom" className="mt-6 w-full h-auto flex-row items-center justify-start flex-wrap whitespace-pre-wrap gap-2">
                            {
                                selectedDay.length === 0 ?

                                    <span className="text-[13px] font-bold ">No days selected</span>
                                    :
                                    selectedDay.map((day, i) => {
                                        return (
                                            <span data-day={day} key={i} className="px-3 py-2 text-[12px] font-bold bg-dark-200 text-white-100 rounded-md relative mr-3">{getDays(day.num)}</span>
                                        )
                                    })
                            }
                        </div>

                        {dayPickerActive && <div id="dayspicker" className="w-[250px] h-auto flex flex-wrap items-center justify-start absolute right-[50px] top-[-90px] bg-white-100 px-5 py-2 shadow-xl shadow-dark-400 rounded-md  ">
                            {
                                days.map((days, i) => {
                                    return (
                                        <span data-day={days.num} className={`px-3 py-2 text-[12px] font-bold bg-white-200 text-dark-100 cursor-pointer rounded-md relative mr-3 mt-2 hover:bg-dark-100 hover:text-white-100 `} key={i} onClick={handleSelectedDays} >{days.day}</span>
                                    )
                                })
                            }

                            <button className="px-3 py-2 bg-red-500 rounded-md absolute right-2 bottom-2 text-white-100 transition-all scale-[.90] hover:scale-[.95] text-[13px] " onClick={() => setDayPickerActive(false)}>Close</button>
                        </div>}
                    </div>
                    <br />
                    <input type="url" className="w-full px-2 py-2 rounded bg-white-200 shadow-lgs " name="url" onChange={handleInputs} value={inputs.url} placeholder='url' />
                    <br />
                    <div id="top" className="w-full flex flex-row items-center justify-between mt-5 gap-2">
                        <input type="text" className="w-[50%] px-2 py-2 rounded bg-white-200 shadow-lgs " placeholder='description' name="description" onChange={handleInputs} value={inputs.description} maxLength={30} />

                        <input type="text" className="w-[50%] px-2 py-2 rounded bg-white-200 shadow-lgs " placeholder='category' name="category" onChange={handleInputs} value={inputs.category} maxLength={20} />
                    </div>
                    <br />
                    <div id="top" className="w-full flex flex-row items-center justify-between mt-5">
                        <button className="px-5 py-3 rounded-md bg-red-400 text-white-100" onClick={() => setActiveSchedule(false)}>Cancel</button>
                        <button className="px-5 py-3 rounded-md bg-blue-700 w-[50%] text-white-100" onClick={saveDataToStorage}>Add Link</button>
                    </div>
                </div>
            </div>
        </div>
    )
}