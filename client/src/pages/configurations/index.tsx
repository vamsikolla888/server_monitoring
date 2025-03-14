/**@NPM Package Imports */
import { useContext, useEffect, useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

/**@ShadcnComponents Imports */
import { tableFields, formFields, tableFilterFields } from "./fields";
import { TableContext } from "@/components/custom/tables/context/TableProvider";
import { zodResolver } from "@hookform/resolvers/zod";

/**@CustomComponents */
import CustomHookFormDialog from "@/components/custom/form/components/CustomHookFormDialog";
import CustomPrimeTable from "@/components/custom/tables/components/prime-datatable";


/**@CustomUtilities */
import { Configuration, configurationSchema } from "./schema";
import { useCreateConfigurationMutation, useGetConfigurationsQuery, useMultiDeleteConfigurationMutation, useUpdateConfigurationMutation } from "@/redux/api/configurations.api";
import { ICriteria } from "../filemanager/types/types";



export default function Configurations() {
    /**@CustomHooks */ // Data Fetching...
    const _context = useContext(TableContext);
    const methods = useForm<Configuration>({
        defaultValues: {
            serverName: "",
            serverIpAddress: "",
            baseFolder: ""
        },
        resolver: zodResolver(configurationSchema)
    });

    /**@QueryParams */
    const queryParams = useMemo(() => ({
        criteria: _context?.state?.filter?.criteria as ICriteria[],
        page: _context?.state?.page as number,
        limit: _context?.state?.limit as number,
        globalSearch: _context?.state?.filter?.globalSearch 
    }), [
        _context?.state?.filter?.criteria,
        _context?.state?.page,
        _context?.state?.limit,
        _context?.state?.filter?.globalSearch
    ]);

    const { data, refetch } = useGetConfigurationsQuery(queryParams);
    const [createConfigurationMutation] = useCreateConfigurationMutation();
    const [updateConfigurationMutation] = useUpdateConfigurationMutation();
    const [multiDeleteConfigurationMutation] = useMultiDeleteConfigurationMutation();


    /**@Functions stored in context*/

    const createHandler = useCallback((values: Configuration, setLoading: (loading: boolean) => void) => {
        setLoading(true);
        return createConfigurationMutation(values).then(response => {
            _context?.dispatch({ type: "SET_FORM_STATE", payload: { isFormOpen: false }});
            if(response.data?.respCode) toast.success(response.data.respMessage);
            else toast.error(response?.data?.errorMessage || response?.error?.data?.errorMessage);
            setLoading(false);
        })
    },[]);


    const updateHandler = useCallback((values: Configuration, id: string, setLoading: (loading: boolean) => void) => {
        setLoading(true);
        updateConfigurationMutation({ body: values, id: id }).then(response => {
            if(response.data?.respCode) toast.success(response.data.respMessage);
            else toast.error(response?.data?.errorMessage || response?.error?.data?.errorMessage);
            _context?.dispatch({ type: "SET_FORM_STATE", payload: { isFormOpen: false }});
            setLoading(false);
        })
    },[])


    const deleteHandler = useCallback((selectedIds: string[], setLoading: (loading: boolean) => void) => {
        setLoading(true);
        multiDeleteConfigurationMutation({ selectedIds }).then(response => {
            _context?.dispatch({ type: "SET_FORM_STATE", payload: { isFormOpen: false }});
            _context?.dispatch({ type: "SET_SELECTED_ROWS", payload: { selectedRows: []}})
            _context?.dispatch({ type: "CLOSE_ALERT", payload: { data: null }});
            if(response.data?.respCode) toast.success(response.data.respMessage);
            else toast.error(response?.data?.errorMessage || response?.error?.data?.errorMessage)
            setLoading(false);
        })
    },[])



    useEffect(() => {
        _context?.dispatch({ type: "SET_FORMFIELDS", payload: { formFields: formFields } })
        _context?.dispatch({ type: "SET_FILTERFIELDS", payload: { filterFields: tableFilterFields }});
        _context?.dispatch({ type: "UPDATE_FORM_HANDLER", payload: { createHandler, updateHandler, deleteHandler, refetch }});
    },[]);

    useEffect(() => {
        _context?.dispatch({ type: "ALL", payload: { data: { totalCount: data?.pagination?.totalCount || 0 } } });
    }, [data]);




    return (
        <FormProvider {...methods}>
            <main className="w-full h-full px-3 py-2">
                <div className="w-full flex justify-between">
                    <div>
                        <p className="font-bold text-lg pt-2 pb-2 px-2">Configurations</p>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <CustomPrimeTable.Advanced
                        tableFields={tableFields}
                        results={data?.configdocuments || []}
                    />
                </div>
                <CustomHookFormDialog type="SIDEFORM" />
            </main>
        </FormProvider>
    );
}