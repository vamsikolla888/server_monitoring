import { tableFields } from "./fields";
import CustomPrimeTable from "@/components/custom/tables/components/prime-datatable";
import { useGetProcessesQuery } from "@/redux/api/pm2.api";
export default function PM2() {


    /**@CustomHooks */ // Data Fetching...
    const { data } = useGetProcessesQuery();

    return (
            <main className="w-full h-full p-6">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <CustomPrimeTable
                        tableFields={tableFields}
                        results={data?.processes || []}
                    />
                </div>
            </main>
    );
}