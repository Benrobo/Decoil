
import React, { useState, useMemo, useRef } from "react"
import { BiTime } from "react-icons/bi"
import { FaArrowLeft } from 'react-icons/fa'
import moment from 'moment'
import { Notification, UUID, validURL } from "../helpers/util"
import { Link } from 'react-router-dom'
import { Container } from "../component"
import TinderCard from 'react-tinder-card'
import data from "../data/flash.json"


function FlashCard() {

    return (
        <>
            <Container>
                <div className="relative w-full h-screen bg-white-300">
                    <div className="head w-full h-auto flex flex-col items-center justify-center text-center py-5">
                        <div className="w-full flex flex-row items-center justify-start p-3 relative ">
                            <Link to="/">
                                <FaArrowLeft className=' text-[35px] mr-[30px] text-dark-100 p-2 hover:bg-dark-200 hover:text-white-100 hover:shadow-lg rounded-md ' />
                            </Link>
                            <h2 className=" text-[20px] text-dark-100">Flash Cards  (Swipe Left or Right) </h2>
                        </div>
                        <br />
                    </div>
                    <br />
                    <div className="w-full h-screen">
                        <div className="head">
                            {/* <h2 className="text-[20px] ">Level Up Your Knowledge</h2> */}
                        </div>
                        {/* <br /> */}
                        <div className="w-full h-[350px] flex flex-col items-center jubstify-center overflow-hidden gap-5">
                            <TinderCardSwipe />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default FlashCard

function TinderCardSwipe() {

    const [currentIndex, setCurrentIndex] = useState(data.results.length - 1)
    const [lastDirection, setLastDirection] = useState()
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)

    const childRefs = useMemo(
        () =>
            Array(data.results.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }


    return (
        <>
            {
                data.results.map((list, i) => {
                    return (
                        <TinderCard
                            ref={childRefs[i]}
                            className='swipe'
                            key={i}
                        // onSwipe={(dir) => swiped(dir, character.name, i)}
                        // onCardLeftScreen={() => outOfFrame(character.name, i)}
                        >
                            <div className="w-[350px] h-[350px] flex flex-col items-center justify-center shadow-lg bg-blue-200 rounded-[20px] cursor-grab p-4 relative">
                                <h2 className=" text-[20px] font-extrabold text-white-100 ">{list.question}</h2>
                                <br />
                                <p className="text-[15px] text-white-100 ">
                                    {list.correct_answer}
                                </p>

                                <span className="bg-dark-300 absolute bottom-3 right-5 px-4 py-2 text-[12px] text-white-100 rounded-md">
                                    {list.category}
                                </span>
                            </div>
                        </TinderCard >
                    )
                })
            }
        </>
    )
}