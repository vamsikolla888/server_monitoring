import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { configurationSchema } from "../schema";
import { formFields } from "../fields";
import { Button } from "@/components/ui/button";
import { useCreateConfigurationMutation, useGetConfigurationsQuery } from "@/redux/api/configurations.api";
import { toast } from "sonner";

export default function ConfigurationForm({ setIsOpen }) {
    const [createConfiguration, result] = useCreateConfigurationMutation();
    const { refetch } = useGetConfigurationsQuery();
    const form = useForm({
        resolver: zodResolver(configurationSchema)
    })
    const submitHandler = values => {
        createConfiguration(values).then(result => {
            setIsOpen(false);
            form.reset({ serverName: "", serverIpAddress:"", baseFolder: ""});
            if(result.data?.respCode) toast.success(result.data.respMessage);
            else toast.error(result?.data?.errorMessage || result?.error?.data?.errorMessage)
        }).catch(error => {
            console.log("ERROR", error);
            toast.error(error.data.errorMessage)
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className="px-6">
                {
                    formFields.map((formfield, index) => {
                        return (
                            <FormField
                                name={formfield.name}
                                control={form.control}
                                render={({ field}) => {
                                    return (
                                        <FormItem className="py-1">
                                            <FormLabel className="text-neutral-800">{formfield.header}</FormLabel>
                                            <FormControl>
                                                <Input 
                                                className="w-full"
                                                {...field}
                                                placeholder={formfield.placeholder}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}

                            />
                        )
                    })
                }
                <div className="pt-5 flex justify-end space-x-4">
                    {/* <Button variant={"destructive"} onClick={() => setIsOpen(false)}>Cancel</Button> */}
                    <Button type="submit">Create Configuration</Button>
                </div>
            </form>
        </Form>
    )
}