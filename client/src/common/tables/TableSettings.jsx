import { useForm } from "react-hook-form";
import { useUiContext } from "../../hooks/useUiContext";
import { uiReducerActions } from "../../reducers/uireducer";
import FramerReorder from "../reorder/Reorder";
import PrimeSwitch from "../form/switch/PrimeSwitch";


const TableSettings = () => {
    const { uiProviderState, uiDispatcher } = useUiContext();
    const { control } = useForm({
        defaultValues: uiProviderState.tableFields.reduce((acc, cur) => {
        //    acc[cur.]
          }, {}),
    });
    console.log("CONTROL", control);
  return (
    <div className="flex ms-10">
        <FramerReorder
        items={uiProviderState.tableFields}
        setItems={updatedOrder => uiDispatcher({ type: uiReducerActions.ADD_AND_UPDATE_TABLE_FIELDS, tableFields: updatedOrder }) }
        optionLabel={"header"}
        itemTemplate={(item, optionLabel, className) => {
            return (
                <div className="flex py-3 px-4 gap-4 items-center">
                    <div>{item[optionLabel]}</div>
                    <div className="ms-auto">
                        <PrimeSwitch control={control} {...item} className="ms-auto"/>
                    </div>
                </div>
            )
        }}
        />
    </div>
  )
};

export default TableSettings;
