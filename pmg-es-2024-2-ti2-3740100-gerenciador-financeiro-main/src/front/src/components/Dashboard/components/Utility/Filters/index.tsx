import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export default function FiltrarDashboard() {
    return(
        <Button variant={"secondary"} className="flex flex-row gap-1 items-center">
            <Filter size={16}/>
            <span>Filtrar</span>
        </Button>
    )
}