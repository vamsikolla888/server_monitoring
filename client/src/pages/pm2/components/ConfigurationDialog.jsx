import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogContent, DialogClose, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ConfigurationForm from "./ConfigurationForm";
import CustomHookForm from "@/components/custom/form/components/CustomHookForm";

export default function ConfigurationDialog({ open, setIsOpen }) {
    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Configuration</DialogTitle>
                </DialogHeader>
                {/* <ConfigurationForm setIsOpen={setIsOpen} /> */}
                <CustomHookForm />
            </DialogContent> 
        </Dialog>
    )
}