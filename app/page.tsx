"use client";
import { Link } from "@nextui-org/link";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Meet&nbsp;</h1>
        <h1 className={title({ color: "yellow" })}>PennyPinch</h1>
        <br />
        <h2 className={subtitle({ class: "mt-4" })}>
          The best tool to master your finances
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Log in to get started
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
      <div className="w-full flex flex-col justify-center my-8">
        <h1 className={title({ class: "text-center" })}>Let's get to know each other!</h1>
        <Accordion>
          <AccordionItem key="1" aria-label="Accordion 1" title="What is PennyPinch?">
            <p>
              PennyPinch is a tool to help you master your finances by providing you with the tools to track your spending, set budgets, and more. It's the best way to take control of your money!
            </p>
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="How do I get started?">
            <p>
              To get started with PennyPinch, simply log in with your Google account and start tracking your spending. It's that easy!
            </p>
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="How much does PennyPinch cost?">
            <p>
              PennyPinch is free to use for all users. We may offer premium features in the future. Stay tuned!
            </p>
          </AccordionItem>

        </Accordion>
      </div>
    </section>
  );
}
