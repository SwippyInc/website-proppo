import { useTheme } from "next-themes"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import Button from "./Button"

export default function ModeToggle() {
    const { setTheme } = useTheme()
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-gray-800 dark:text-white flex items-center justify-center border-none outline-none transition duration-300 hover:bg-blue-800/5 aspect-square rounded-full h-8 md:h-10 dark:bg-white/20">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white dark:bg-black border-none rounded-xl overflow-hidden shadow-sm">
          <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer transition duration-200 hover:bg-gray-300/20 dark:hover:text-white">
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer transition duration-200 hover:bg-gray-300/20 dark:hover:text-white">
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer transition duration-200 hover:bg-gray-300/20 dark:hover:text-white">
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }