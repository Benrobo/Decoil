import React from "react"


async function sleep(sec = 1) {
    return new Promise((res) => setTimeout(res, sec * 1000))
}

async function CronJob() {


    if (localStorage.getItem("link_schedules") !== null) {
        const data = JSON.parse(localStorage.getItem("link_schedules"))

        if (data.length > 0) {

            data.map(async (sched) => {

                const date = new Date();
                const currDate = date.getDate();
                const currMonth = date.getMonth() + 1;
                const currYear = date.getFullYear();
                const currHours = date.getHours()
                const currMin = date.getMinutes()
                const days = sched.days;
                const linkDate = sched.date;
                const schedMonth = new Date(linkDate).getMonth() + 1
                const time = sched.time;
                const schedHour = parseInt(time.split(":")[0]);
                const schedMin = parseInt(time.split(":")[1]);
                const schedYear = parseInt(new Date(linkDate).getFullYear())
                const schedDate = parseInt(linkDate.split("-")[2])
                const schedDay = new Date(linkDate).getDay() + 1;
                const url = sched.url;


                // console.log({ currDate, schedDate, currHours, schedHour, currMonth, schedMonth, currYear, schedYear, days });

                // validate time, day, month , year
                if (currYear === schedYear) {

                    // check month
                    if (schedMonth === currMonth) {

                        // check currDate
                        if (schedDate === currDate) {
                            // check time
                            if (days.includes(schedDay)) {
                                if (currHours >= schedHour) {

                                    if (currMin >= schedMin) {
                                        console.log("CRON JOB LOGGING.");
                                        await sleep(2)
                                        // open url
                                        let a = document.createElement("a")
                                        a.href = url;
                                        a.target = "_blank"
                                        a.click()
                                    }

                                }
                            }
                        }
                    }
                }

            })
        }

    }
}

export default CronJob


