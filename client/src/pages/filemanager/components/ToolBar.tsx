import { useContext, useState, useMemo, useCallback } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { FileManagerContext } from "../context/FileManagerProvider"
import { FileManagerHistory } from "../types/types";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";



const ToolBar = () => {
  const { fileManagerHistory, setFileManagerHistory, setSearch, search } = useContext(FileManagerContext);
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      search: "",
    }
  });

  const searchSubmitter = values => {
    if(values.search && values.search != "") {
      setSearch(values.search);
    }
  }

  const searchOnChange = (event) => {
    setSearch(event.target.value)
  }

  const breadcrumbHandler = (history: FileManagerHistory, index: number) => {
    setFileManagerHistory(prevHistory => (prevHistory.filter((href, i) => i <= index)))
  }

  return (
    <div className='flex items-center justify-between w-full h-14'>
      <div>
        <p className='font-semibold text-md text-neutral-700 dark:text-neutral-200'>File Manager</p>
        <Breadcrumb className='font-medium'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/filemanager">Home</Link>
              {/* <BreadcrumbLink href="/filemanager">Home</BreadcrumbLink> */}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {
              fileManagerHistory.map((history: FileManagerHistory, index: number) => {
                return (
                  <>
                  <BreadcrumbItem onClick={() => (breadcrumbHandler(history, index))}>
                  <Link to={history.href}>{history.title}</Link>
                  {/* <BreadcrumbLink href={history.href}>{history.title}</BreadcrumbLink> */}
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  </>
                )
              })
            }
            {/* <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem> */}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center space-x-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(searchSubmitter)}>
              <FormField
                key={"search"}
                name="search"
                control={form.control}
                render={({ field })=> (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input className="h-9" {...field} onChange={searchOnChange} value={search}/>
                        <span className="absolute top-1/2 right-3 -translate-y-1/2"><Search className="size-4" fill="#e0e0e0" /></span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        <Button variant={"ghost"}>
          <LayoutGrid fill="#e0e0e0"/>
        </Button>
        <Button variant={"ghost"}>
          <List fill="#e0e0e0"/>
        </Button>
        <Button>
          <Plus />
          New Folder
        </Button>
      </div>
    </div>
  )
}

export default ToolBar