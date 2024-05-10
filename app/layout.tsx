import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} bg-primary-foreground/35 `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="mx-10 lg:mx-20">
            <section className="h-screen">
              <div className="w-full flex justify-end absolute top-0 right-0 items-center mr-10 mt-3 z-10">
                <div
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "icon",
                      className: "rounded-full  w-10 h-10 overflow-hidden",
                    })
                  )}
                >
                  <Image src={'/logo.jpeg'} alt="logo" width={100} height={100} />
                </div>
                <Link
                  href={"https://github.com/ruru-m07/commitly"}
                  target="_blank"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "icon",
                      className: "rounded-full mx-2 w-10 h-10",
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
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
