import React from "react";

export interface Topic {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  content: React.ReactNode[];
}

export interface Section {
  id: string;
  title: string;
  icon: string;
  topics: Topic[];
}
