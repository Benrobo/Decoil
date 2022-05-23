
import React from "react"
import { BiTime } from "react-icons/bi"
import { FaArrowLeft } from 'react-icons/fa'
import moment from 'moment'
import { Notification, UUID, validURL } from "../helpers/util"
import { Link } from 'react-router-dom'
import { Container } from "../component"


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
                            <h2 className=" text-[20px] text-dark-100">Flash Cards</h2>
                        </div>
                        <br />
                    </div>
                </div>
            </Container>
        </>
    )
}

export default FlashCard
