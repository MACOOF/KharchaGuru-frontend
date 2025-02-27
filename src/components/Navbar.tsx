"use client";
// import { ModeToggle } from "@/components/ModeToggle"
// import { Button } from "@/components/ui/button"
// import { ArrowRight } from "lucide-react"
// import Link from "next/link"
// // import MobileNav from "./MobileNav"
// import { cn } from "@/lib/utils"
// import Image from "next/image"

// const navLinks = [
//   // { href: "/", label: "Home" },
//   // { href: "/spend", label: "Spend" },
//   // { href: "/", label: "About" },
//   // { href: "/", label: "Contact" },
// ]

// const Navbar = () => {
//   return (
//     <nav className="dark:bg-dark-background/70 dark:border-dark-border fixed start-0 top-0 z-20 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
//       <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
//         <div className="flex items-center gap-3">
//           {/* <MobileNav /> */}
//           <Link
//             href="/"
//             className="flex items-center space-x-3 rtl:space-x-reverse"
//           >
//             <Image
//               src="/SpendWIse-5.png"
//               width={36}
//               height={36}
//               alt="SpendWise Logo"
//               fetchPriority="high"
//               priority
//             />
//             <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
//               spend<span className="text-primary">wise</span>
//             </span>
//           </Link>
//         </div>

//         {/* Desktop Navigation */}
//         {/* <div className="hidden justify-center gap-11 md:flex">
//           {navLinks.map(({ href, label }) => (
//             <Link
//               key={href}
//               className="hover:border-b-2 hover:border-green-600 hover:text-primary"
//               href={href}
//             >
//               {label}
//             </Link>
//           ))}
//         </div> */}

//         {/* Action Buttons */}
//         <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
//           <div className="flex gap-4">
//             <div className="hidden md:block lg:block">
//               <ModeToggle />
//             </div>
//             <Link href="/auth/signup">
//               <Button
//                 variant="default"
//                 className={cn(
//                   "hidden h-9 transform rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-white transition-all hover:scale-105 hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/50 dark:bg-primary md:flex lg:flex"
//                 )}
//               >
//                 Get Started
//                 <ArrowRight
//                   className="ml-1.5 h-5 w-5 transform transition-transform group-hover:translate-x-1 group-hover:scale-110"
//                   aria-hidden="true"
//                 />
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navbar


import { ModeToggle } from "@/components/ModeToggle"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe } from "lucide-react"
import Link from "next/link"
// import MobileNav from "./MobileNav"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  // { href: "/", label: "Home" },
  // { href: "/spend", label: "Spend" },
  // { href: "/", label: "About" },
  // { href: "/", label: "Contact" },
]

const Navbar = () => {
  const t = useTranslations("Common")
  
  return (
    <nav className="dark:bg-dark-background/70 dark:border-dark-border fixed start-0 top-0 z-20 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {/* <MobileNav /> */}
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/SpendWIse-5.png"
              width={36}
              height={36}
              alt="SpendWise Logo"
              fetchPriority="high"
              priority
            />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              spend<span className="text-primary">wise</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {/* <div className="hidden justify-center gap-11 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              className="hover:border-b-2 hover:border-green-600 hover:text-primary"
              href={href}
            >
              {label}
            </Link>
          ))}
        </div> */}

        {/* Action Buttons */}
        <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <div className="flex gap-4">
            <div className="hidden md:block lg:block">
              <LanguageSwitcher />
            </div>
            <div className="hidden md:block lg:block">
              <ModeToggle />
            </div>
            <Link href="/auth/signup">
              <Button
                variant="default"
                className={cn(
                  "hidden h-9 transform rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-white transition-all hover:scale-105 hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/50 dark:bg-primary md:flex lg:flex"
                )}
              >
                {t("getStarted")}
                <ArrowRight
                  className="ml-1.5 h-5 w-5 transform transition-transform group-hover:translate-x-1 group-hover:scale-110"
                  aria-hidden="true"
                />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar