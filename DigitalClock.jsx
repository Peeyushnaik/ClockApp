import React,{useState,useEffect} from "react";
function DigitalClock(){

    const [time,setTime] = useState(new Date());

    useEffect(() => { //useEffect ke andar isliye dala taki memory leak na hoye aur har re-render pr interval na create ho
        const intervalId = setInterval(() => { //setInterval will call the setTime function repeatedly everytime after 1 sec gap
            setTime(new Date());
        },1000); // 1000 means 1000  miliseconds i.e 1 second

        return () => { //Clean up code
            clearInterval(intervalId); //Used to stop the setInterval function otherwise data leak hojayega 
        }
    },[]);

    function formatTime(){
        let hours = time.getHours(); //Hours leliya time se
        const minutes = time.getMinutes();//Mins liye
        const seconds = time.getSeconds();//Seconds liye
        const meridiem = hours >= 12 ? "PM" : "AM"; // AM ya PM aagya depending on the hour as 12 hr format hai

        hours = hours % 12 || 12; //12 hr format ko implement krne ke liye

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`;
    }

    function padZero(number){//Zero laga dega bas single digit ke samne
        return (number < 10 ? "0" : "") + number;
    }

    return(
        <div className = "clock-container">
            <div className = "clock">
                <span>{formatTime()}</span> 
            </div>
        </div>
    );
} 
export default DigitalClock

//span tag par ham {time.toString()} aise nhi likh skte as vo lauda sa bada sa output dega toh hame nhi chaiye example: "Mon Jun 10 2024 14:30:45 GMT+0500"
//To avoid getting unnecessary data we create formatTime() jo relevant data dega bas