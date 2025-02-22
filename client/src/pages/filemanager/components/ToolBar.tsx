import { useContext, useState } from "react"
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
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";



const ToolBar = () => {
  const { fileManagerHistory } = useContext(FileManagerContext);
  const [search, setSearch] = useState<Boolean>(false);

  return (
    <div className='flex items-center justify-between w-full h-14'>
      <div>
        <p className='font-semibold text-md text-neutral-700'>File Manager</p>
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
                  <BreadcrumbItem>
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
        <div className="relative">
          
          <Input className="h-9"/>
          <span className="absolute top-1/2 right-3 -translate-y-1/2"><Search className="size-4" fill="#e0e0e0" /></span>
        </div>
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