import { Reorder, motion } from 'framer-motion';
import PropTypes from "prop-types";
import classNames from "classnames";


/**
 * 
 * @PROPS 
 * @items - Array 
 * @setItems - function to update the new order
 * @direction - which direction to reorder
 * @optionLabel - for item object 
 * @className - class name for reorder component
 * @itemsClassName - class name of items component
 * @itemClassName - class name for item component
 * @itemTemplate - define your own template whenever you want - props (item, className)
 * 
 *  
 */


const propTypes = {
  items: PropTypes.array.isRequired,
  setItems: PropTypes.func.isRequired,
  direction: PropTypes.oneOf(["x", "y"]),
  optionLabel: PropTypes.string,
  className: PropTypes.string,
  itemsClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  itemTemplate: PropTypes.func,

}


const defaultProps = {
  items: [],
  setItems: () => {},
  direction: "y",
  optionLabel: "value",
  className: "",
  itemsClassName: "",
  itemClassName: "",
}

const BASE_CLASSNAME = "flex justify-center";
const BASE_ITEMS_CLASSNAME = "flex flex-col gap-4";
const BASE_ITEM_CLASSNAME = "";
const FramerReorder = ({ items, setItems, direction, optionLabel, className, itemsClassName, itemClassName, itemTemplate}) => {
  className = classNames(BASE_CLASSNAME, className);
  itemsClassName = classNames(BASE_ITEMS_CLASSNAME, itemsClassName)
  itemClassName = classNames(BASE_ITEM_CLASSNAME, itemClassName);
  return (
    <div className={className}>
      <Reorder.Group axis={direction} values={items} onReorder={setItems}>
        <div className={itemsClassName}>
          {items.map((item) => (
            <Reorder.Item key={item[optionLabel]} value={item}>
              <motion.div className="cursor-pointer"
                // whileTap={{scale: 1.05, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}
              >
                {
                  itemTemplate ? itemTemplate(item, optionLabel, itemClassName) : <div className={itemClassName}>{item[optionLabel]}</div>

                }
              </motion.div>
            </Reorder.Item>
          ))}
        </div>
      </Reorder.Group>
    </div>
  );
};


FramerReorder.propTypes = propTypes;
FramerReorder.defaultProps = defaultProps;

export default FramerReorder;