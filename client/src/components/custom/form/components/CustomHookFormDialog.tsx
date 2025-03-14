import { Dialog, DialogContent } from "@/components/ui/dialog";
import CustomHookForm from "@/components/custom/form/components/CustomHookForm";
import { useContext } from "react";
import { TableContext } from "../../tables/context/TableProvider";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ConfigurationDialogProps {
    className?: string;
    headerClassName?: string;
    headerTemplate?: () => React.ReactNode;
    footerClassName?: string;
    footerTemplate?: () => React.ReactNode;
    type?: "SIDEFORM" | "DIALOG"
    
}
export default function ConfigurationDialog({ className, headerClassName, headerTemplate, footerClassName, footerTemplate, type }: ConfigurationDialogProps) {
    let _context = useContext(TableContext)
    const onOpenchangeHandler = () => {
        _context?.dispatch({ type: "SET_FORM_STATE", payload: { isFormOpen: false }})
    }
    return (
        <>
            {
                type === "SIDEFORM" ? 
                <>
                    <Sheet open={_context?.state?.isFormOpen} onOpenChange={onOpenchangeHandler}>
                        <SheetContent className="px-2 flex flex-col py-1">                 
                            <ScrollArea className="flex-1">
                                <CustomHookForm
                                    className={className}
                                    headerClassName={headerClassName}
                                    headerTemplate={headerTemplate}
                                    footerClassName={footerClassName}
                                    footerTemplate={footerTemplate}
                                />
                            </ScrollArea>
                        </SheetContent>
                    </Sheet>
                    {/* <Sheet open={_context?.state?.isFormOpen} onOpenChange={onOpenchangeHandler}>
                        <ScrollArea>
                            <SheetContent className="px-2">
                                <CustomHookForm 
                                    className={className}
                                    headerClassName={headerClassName}
                                    headerTemplate={headerTemplate}
                                    footerClassName={footerClassName}
                                    footerTemplate={footerTemplate}
                                />
                            </SheetContent>
                        </ScrollArea>
                    </Sheet> */}
                </>
                :
                <Dialog open={_context?.state?.isFormOpen} onOpenChange={onOpenchangeHandler}>
                    <DialogContent>
                        <CustomHookForm 
                            className={className}
                            headerClassName={headerClassName}
                            headerTemplate={headerTemplate}
                            footerClassName={footerClassName}
                            footerTemplate={footerTemplate}
                        />
                    </DialogContent> 
                </Dialog>

            }
        </>
    )
}