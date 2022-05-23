import React, { useState } from 'react'
import { Container } from '../component'

import { CgCardClubs } from 'react-icons/cg'
import { AiOutlineLink } from 'react-icons/ai'

function Home() {

    const [activeModal, setActiveModal] = useState(false)


    function openModal() {
        setActiveModal(!activeModal)
    }

    return (

        <>
            <Container>
                <div className="w-full h-screen relative">
                    <div className="head w-full h-auto flex flex-col items-center justify-center text-center py-5">
                        <h1 className=" text-[70px] font-extrabold ">
                            Decoil
                        </h1>
                        <h1 className=" p-5 text-[20px] font-extrabold ">
                            The one and only tool you would ever n eed to stay <span className="text-blue-200 font-extrabold">Productive</span> and never miss a <span className="text-blue-200 font-extrabold">Class</span>
                        </h1>
                    </div>
                    <br />
                    <div className="w-full h-[300px] flex flex-col items-center justify-center  ">
                        <button id="addLinks" className="w-[250px] px-5 py-4 bg-blue-200 shadow-lg rounded-[50px] text-white-100 absolute transition-all cursor-pointer scale-[.90] hover:scale-[.95] text-[25px] " onClick={openModal}>
                            Get Started
                        </button>
                    </div>
                    {activeModal && <AppOptions openModal={openModal} />}
                </div>
            </Container>
        </>
    )
}

export default Home

function AppOptions({ openModal }) {

    function closeModal(e) {
        let { type } = e.target.dataset

        if (type !== undefined && type === "modal") {
            openModal()
        }
    }

    function navigate(type = "") {
        if (type === "link") {
            window.location = ("/link-schedule")
            return
        }
        if (type === "flash-card") {
            window.location = ("/flash-card")
            return
        }
    }

    return (
        <div data-type="modal" className="w-full h-screen absolute top-0 left-0 flex flex-col items-center justify-center text-center z-[200] p-[10px] bg-dark-400 " onClick={closeModal}>

            <div className="w-[450px] h-auto bg-dark-100 rounded-md">
                <div className="w-full  flex flex-row items-center justify-center p-[20px] gap-3">
                    <h2 className='text-white-100 text-[20px] '>Select One</h2>
                </div>
                <div className="w-full  flex flex-row items-center justify-center p-[20px] gap-3">
                    <button className="w-[200px] h-[100px] bg-blue-200 rounded-md p-5 text-white-100 flex flex-col items-center justify-center " onClick={() => navigate("flash-card")}>
                        <CgCardClubs className='text-[200px]' />
                        <span className='mt-2'>Flash Cards</span>
                    </button>

                    <button className="w-[200px] h-[100px] bg-blue-200 rounded-md p-5  text-white-100 flex flex-col items-center justify-center" onClick={() => navigate("link")}>
                        <AiOutlineLink className='text-[200px]' />
                        Links Schedule
                    </button>
                </div>
                <br />
            </div>
        </div>
    )
}