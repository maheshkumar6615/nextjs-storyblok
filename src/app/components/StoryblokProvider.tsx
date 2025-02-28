"use client";

import type { PropsWithChildren } from "react";
import { getStoryblokApi } from "@/lib/storyblok";


export const StoryblokProvider = ({ children }: PropsWithChildren) => {
 getStoryblokApi();
  return children;
};