import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  export default function Categorias() {
    return (
      <div className="w-1/4">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Sem categoria</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }