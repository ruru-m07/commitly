import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/modeToggle";
import Image from "next/image";
import NotificationBanner from "@/components/notificationBanner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: "git commit, commitly, pretty commits",
  authors: [
    {
      name: "Ruru",
      url: "https://github.com/ruru-m07/",
    },
  ],
  creator: "Ruru",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <main className="mx-0 xl:mx-20">
              <section className="h-screen">
                <div className="w-full flex justify-end absolute top-3 right-0 items-center mr-7 md:mr-10 mt-3 overflow-hidden z-10">
                  <div
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        size: "icon",
                        className:
                          "rounded-full w-10 h-10 overflow-hidden sm:block hidden",
                      })
                    )}
                  >
                    <Image
                      src={"/logo-dark.png"}
                      alt="logo"
                      width={50}
                      height={50}
                      className="dark:hidden block"
                    />
                    <Image
                      src={"/logo-light.png"}
                      alt="logo"
                      width={50}
                      height={50}
                      className="dark:block hidden"
                    />
                  </div>
                  <Link
                    href={"https://github.com/ruru-m07/commitly"}
                    aria-label="Github"
                    target="_blank"
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        size: "icon",
                        className: "rounded-full mx-2 w-10 h-10 sm:flex hidden",
                      })
                    )}
                  >
                    <GitHubLogoIcon className="w-6 h-6" />
                  </Link>
                  <ModeToggle />
                </div>
                {children}
              </section>
            </main>
            <NotificationBanner />
            <Toaster />
            <Analytics/>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
