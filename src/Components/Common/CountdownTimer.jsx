import { useEffect, useState } from "react";
import moment from "moment";
import EditableHeading from "./EditableHeading";
import { useParams } from "react-router-dom";

const FlipCard = ({ value, label }) => {
  const params = useParams();
  // Ensure two digits
  const displayValue = value.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        {displayValue.split("").map((digit, index) => (
          <div key={index} className="relative mx-[1px]">
            <div className="w-5 text-center h-7  rounded-sm flex items-center justify-center">
              <div className="text-[#d4ddff] bg-[#1456fe] font-semibold rounded-[3px] text-lg h-full w-full">
                {digit}
              </div>
            </div>
            {/* Add horizontal line in middle */}
            {/* <div
              className={`absolute top-1/2 w-full h-[1px] bg-gray-100 ${
                params.id && "hidden"
              }`}
            ></div> */}
          </div>
        ))}
      </div>
      <span className="text-xs mt-1 text-gray-500">{label}</span>
    </div>
  );
};

const CountdownTimer = ({ tourDate, texts }) => {
  const params = useParams();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const tourDateTime = moment(tourDate).utc();
      const now = moment();
      const difference = tourDateTime.diff(now);

      if (difference > 0) {
        const duration = moment.duration(difference);
        setTimeLeft({
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds(),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [tourDate]);

  if (
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0
  ) {
    return (
      <div className="text-center my-2">
        <span className="">
          {/* {texts["tourdetails.time_passed"] || "Data del tour è passata"} */}
        </span>
      </div>
    );
  }

  return (
    <div className="p-2 rounded-lg">
      <div className="flex justify-center items-center gap-3">
        <FlipCard value={timeLeft.days} label="Giorni" />
        <FlipCard value={timeLeft.hours} label="Ore" />
        {/* <div className="primary_text font-bold mb-5">:</div> */}
        <FlipCard value={timeLeft.minutes} label="Minuti" />
        {/* <div className="primary_text bg-blue-500 font-bold mb-5">:</div> */}
        <FlipCard value={timeLeft.seconds} label="Secondi" />
      </div>
    </div>
  );
};

export default CountdownTimer;
