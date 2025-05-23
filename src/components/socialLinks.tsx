"use client";

import React from "react";
import { SocialLinkProps } from "../types";
import { Icon } from "@iconify/react";
import githubIcon from "@iconify/icons-mdi/github";
import linkedinIcon from "@iconify/icons-mdi/linkedin";
import pdfIcon from "@iconify/icons-mdi/file-pdf-box-outline";
import emailIcon from "@iconify/icons-mdi/alternate-email";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LanguageSwitcher } from "./langSwitcher";
import { ModeToggle } from "./modeToggle";
import { useI18n } from "@/lib/i18n";

const SocialLinks: React.FC = () => {
  const { t } = useI18n();

  const socialLinks: SocialLinkProps[] = [
    {
      href: "https://github.com/yevgenatlanov",
      label: "GitHub",
      icon: <Icon icon={githubIcon} width="34" height="34" />,
    },
    {
      href: "https://linkedin.com/in/yevhenii-atlanov",
      label: "LinkedIn",
      icon: <Icon icon={linkedinIcon} width="34" height="34" />,
    },
    {
      href: "https://atlanov.me/Atlanov-full-stack-developer.pdf",
      label: "My CV",
      icon: <Icon icon={pdfIcon} width="34" height="34" />,
    },
    {
      href: "mailto:me@atlanov.me",
      label: "Contact",
      icon: <Icon icon={emailIcon} width="34" height="34" />,
    },
  ];

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <TooltipProvider>
          {socialLinks.map((link, key) => (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className=" hover:text-foreground transition-colors gap-2"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                <p>{link.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>

      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip key="language-switcher">
            <TooltipTrigger asChild>
              <div>
                <LanguageSwitcher />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              <p>{t("common.changeLanguage")}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip key="theme-toggle">
            <TooltipTrigger asChild>
              <div>
                <ModeToggle />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              <p>{t("common.toggleTheme")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default SocialLinks;
