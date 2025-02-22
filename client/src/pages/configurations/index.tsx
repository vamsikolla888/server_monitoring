import { useContext, useEffect, useState } from "react";
import { tableFields, formFields } from "./fields";
import CustomPrimeTable from "@/components/custom/tables/components/CustomPrimeTable";
import { Button } from "@/components/ui/button";
import { useGetConfigurationsQuery } from "@/redux/api/configurations.api";
import { Plus } from "lucide-react";
import ConfigurationDialog from "./components/ConfigurationDialog";
import { FormProvider, useForm } from "react-hook-form";
import { TableContext } from "@/components/custom/tables/context/TableProvider";
import { TableReducerActions } from "@/components/custom/tables/types";
export default function Configurations() {
    const methods = useForm();
    const [open, setOpen] = useState(false);
    const { data } = useGetConfigurationsQuery();
    const _context = useContext(TableContext) as { state: object, dispatch: React.Dispatch<TableReducerActions>};
    useEffect(() => {
        // _context?.setFormFields(formFields);
        _context?.dispatch({ type: "SET_FORMFIELDS", payload: { formFields } })
    },[])
    return (
        <FormProvider {...methods}>
            <main className="w-full h-full p-6">
                <div className="flex w-full mb-2">
                    <Button className="ms-auto" onClick={() => setOpen(true)}>
                        <Plus />
                        Create
                    </Button>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <CustomPrimeTable
                        tableFields={tableFields}
                        results={data?.configdocuments || []}
                    />
                </div>
                <ConfigurationDialog open={open} setIsOpen={setOpen} />
            </main>
        </FormProvider>
    );
}