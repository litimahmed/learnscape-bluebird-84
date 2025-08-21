import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NewsLetterProps {
  isDark?: boolean;
}

const NewsLetter = ({ isDark }: NewsLetterProps) => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider border border-primary px-3 py-1 inline-block rounded-md">
          Newsletter
        </p>
        <h2 className="text-3xl font-bold text-foreground mt-4 mb-6">
          Subscribe to Our
          <span className="text-primary"> NewsLetter</span>
        </h2>
        <div className="flex gap-4 justify-center flex-wrap max-w-2xl mx-auto">
          <Input
            type="text"
            placeholder="Your name"
            className="flex-1 min-w-[200px] h-12"
          />
          <Input
            type="email"
            placeholder="Your email"
            className="flex-1 min-w-[200px] h-12"
          />
          <Button
            variant="outline"
            className="h-12 px-6 font-medium border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;