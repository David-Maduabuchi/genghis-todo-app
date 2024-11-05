import tick from "../assets/tick.png";
import PropTypes from "prop-types";
import not_tick from "../assets/not_tick.png";
const TodoItems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className="flex items-center my-3 gap-2">
      <div
        className="flex flex-1 cursor-pointer"
        onClick={() => {
          toggle(id);
        }}
      >
        <img src={isComplete ? tick : not_tick} alt="hi" className="w-7 h-7" />
        <p className={`text-slate-700 ml-4 decoration-slate-500 text-[17px] ${isComplete && `line-through`}`}>{text}</p>
      </div>
      <img
        src="/svg/trash.svg"
        alt=""
        className="w-[24px] h-[24px] cursor-pointer"
        onClick={() => {
          deleteTodo(id);
        }}
      />
    </div>
  );
};

TodoItems.propTypes = {
  text: PropTypes.string.isRequired, // or PropTypes.string if optional
  id: PropTypes.any.isRequired,
  isComplete: PropTypes.bool.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default TodoItems;
