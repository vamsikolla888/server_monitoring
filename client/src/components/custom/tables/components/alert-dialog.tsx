import { AlertDialog, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useContext, useState } from "react";
import { TableContext } from "../context/TableProvider";
import { Loader, Trash, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CustomAlertDialog() {
    const [loading, setLoading] = useState<boolean>(false);
    const _context = useContext(TableContext);

    const alertHandler = () => {
        _context?.dispatch({ type: "CLOSE_ALERT", data: null});
    }

    const cancelHandler = () => {
        _context?.dispatch({type: "SET_SELECTED_ROWS", payload: { selectedRows: []}})
    }

    const confirmHandler = () => {
        _context?.state?.deleteHandler(_context?.state?.selectedRows.map(d => d._id), setLoading);
    }
    return (
        <AlertDialog open={_context?.state?.showAlert} onOpenChange={alertHandler}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your information
                    and remove your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={cancelHandler}>Cancel</AlertDialogCancel>
                    <Button onClick={confirmHandler} variant={"destructive"} disabled={loading}>
                        { 
                            loading ? 
                            <div className="flex items-center gap-3">
                                <Loader className="size-4 animate-spin" />
                                <span>Processing...</span>
                            </div> :
                            <>
                                <Trash />
                                <p>Delete</p>
                            </>

                        }
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}