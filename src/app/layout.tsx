'use client';

import { useState } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import ReactMarkdown from 'react-markdown';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const README_CONTENT = `
Start a new nextJS typescript project, then use the files in this repo to implement the tasks.

# Takehome Task: Algebra

## Setup
This repo contains boilerplate for an abstract syntax, called AlgExpr.
This is a representation of algebraic expressions formed of the following atoms:
- Integers (eg. 1, 5, 20);
- Variables (eg. x, y, z);

These are composed with the following operations:
- Addition "+" (eg. 1 + 4);
- Subtraction "-" (eg. 15 - 4);
- Multiplication "*" (eg. 14 * 5);
- Division "/" (eg. 16 / 4);

As we are only operating over non-negative integers, we can represent certain expressions, but cannot represent others:
Examples of expressions and how to express them in AlgExpr:
- 1 + 3       // In AlgExpr, simply 1 + 3.
- -5          // AlgExpr currently has no negative numbers!
- 0.4         // AlgExpr cannot represent this directly, but we can use the rational expression: ( 2 / 5 ) 
- pi          // Irrationals cannot be expressed in AlgExpr--we can only express rational expressions.

## Objective 1
- Implement minus, enabling AlgExpr to express negative numbers also.

## Objective 2
- Implement an algebraic reducer able to evaluate expressions, a function eval which is AlgExpr -> AlgExpr which can simplify expressions, similar to "equals".
- Eg. 1 + 10 = 11 ... etc
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showReadme, setShowReadme] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col bg-white dark:bg-black">
          {/* Header */}
          <header className="flex items-center justify-between px-8 py-4 border-b border-zinc-200 dark:border-zinc-800">
            <h1 className="text-xl font-semibold text-black dark:text-zinc-50">
              WilsonAI Engineer Takehome
            </h1>
            <button
              onClick={() => setShowReadme(true)}
              className="px-4 py-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-black dark:text-zinc-50 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              README
            </button>
          </header>

          {/* Page content */}
          {children}

          {/* README Modal */}
          {showReadme && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8 z-50"
              onClick={() => setShowReadme(false)}
            >
              <div
                className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-black dark:text-zinc-50">README</h2>
                  <button
                    onClick={() => setShowReadme(false)}
                    className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 text-2xl"
                  >
                    ×
                  </button>
                </div>
                <div className="text-black dark:text-zinc-50">
                  <ReactMarkdown
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-4 mt-6" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mb-3 mt-5" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-xl font-semibold mb-2 mt-4" {...props} />,
                      p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-1" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-1" {...props} />,
                      li: ({node, ...props}) => <li className="ml-4" {...props} />,
                      code: ({node, inline, ...props}: any) => 
                        inline ? 
                          <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props} /> : 
                          <code className="block bg-zinc-100 dark:bg-zinc-800 p-3 rounded mb-4 text-sm font-mono" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
                    }}
                  >
                    {README_CONTENT}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
