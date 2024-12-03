
import ProgressBar from "@ramonak/react-progress-bar";

const ProgressBars = ({ value }) => {
  
  return (
    <div>
      <ProgressBar
        className=""
        completed={value ? value : 10}
        labelColor="transparent"
        labelAlignment="center"
        borderRadius="10px 10px 10px 10px"
        height="8px"
        // bgColor="#C4AFFF"
        bgColor="#e86731"
        baseBgColor="#a8afb0"
      />
    </div>
  );
};

export default ProgressBars;
