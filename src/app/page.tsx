'use client';

import { useState, useEffect } from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { parseExpression, renderExpressionLatex, evaluateExpression, areExpressionsEquivalent, type AlgExpr } from '@/algebra/base';

const mathJaxConfig = {
  loader: { load: ["input/tex", "output/chtml"] },
};

export default function Home() {
  const [inputText, setInputText] = useState('( 3 + 5 ) - 4');
  const [latexOutput, setLatexOutput] = useState('');
  const [evaluatedExpr, setEvaluatedExpr] = useState<AlgExpr | null>(null);
  const [evaluatedLatex, setEvaluatedLatex] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Objective 3: Equivalence checker
  const [expr1Input, setExpr1Input] = useState('1 + 2');
  const [expr2Input, setExpr2Input] = useState('2 + 1');
  const [isEquivalent, setIsEquivalent] = useState<boolean | null>(null);
  const [equivalenceError, setEquivalenceError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Parse the expression
      const parsed = parseExpression(inputText);
      // Render it to LaTeX
      const latex = renderExpressionLatex(parsed);
      setLatexOutput(latex);
      // Evaluate it (algebraically)
      const evaluated = evaluateExpression(parsed);
      setEvaluatedExpr(evaluated);
      // Render the evaluated expression to LaTeX
      const evaluatedLatexStr = renderExpressionLatex(evaluated);
      setEvaluatedLatex(evaluatedLatexStr);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
      setLatexOutput('');
      setEvaluatedExpr(null);
      setEvaluatedLatex('');
    }
  }, [inputText]);

  // Objective 3: Check equivalence
  useEffect(() => {
    try {
      const parsed1 = parseExpression(expr1Input);
      const parsed2 = parseExpression(expr2Input);
      const equivalent = areExpressionsEquivalent(parsed1, parsed2);
      setIsEquivalent(equivalent);
      setEquivalenceError(null);
    } catch (e) {
      setIsEquivalent(null);
      setEquivalenceError(e instanceof Error ? e.message : 'Unknown error');
    }
  }, [expr1Input, expr2Input]);

  return (
    <MathJaxContext config={mathJaxConfig}>
      <div className="flex flex-1 flex-col">
        {/* Top half - Input section */}
        <div className="flex-1 flex items-center justify-center border-b border-zinc-200 dark:border-zinc-800 p-8 h-[50vh]">
          <div className="w-full">
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">Input</h2>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-40 p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-black dark:text-zinc-50 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter expression (e.g. ( 3 + 5 ) - 4 or x / 2)..."
            />
          </div>
        </div>

        {/* Bottom half - Output section with three panes */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full flex items-center justify-center gap-8 h-[50vh]">
            {/* Left pane - Rendered expression */}
            <div className="flex-1 flex items-center justify-center text-black dark:text-zinc-50" style={{ fontSize: '4rem' }}>
              {error ? (
                <div className="text-red-700 dark:text-red-300 text-xl text-center">
                  <strong>Error:</strong><br />{error}
                </div>
              ) : (
                <MathJax inline={false} dynamic>
                  {`\\[${latexOutput}\\]`}
                </MathJax>
              )}
            </div>

            {/* Middle - Equals button */}
            <div className="flex items-center justify-center">
              <button className="px-6 py-3 text-2xl font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                =
              </button>
            </div>

            {/* Right pane - Evaluated result */}
            <div className="flex-1 flex items-center justify-center text-black dark:text-zinc-50" style={{ fontSize: '4rem' }}>
              {error ? (
                <div className="text-zinc-400 dark:text-zinc-600 text-2xl">
                  —
                </div>
              ) : (
                <MathJax inline={false} dynamic>
                  {`\\[${evaluatedLatex}\\]`}
                </MathJax>
              )}
            </div>
          </div>
        </div>

        {/* Objective 3: Equivalence Checker */}
        <div className="flex-1 flex items-center justify-center border-t border-zinc-200 dark:border-zinc-800 p-8 bg-zinc-50 dark:bg-zinc-950">
          <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">Equivalence Checker (Objective 3)</h2>
            <div className="flex gap-4 mb-4">
              {/* Left expression input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-black dark:text-zinc-300 mb-2">Expression 1:</label>
                <textarea
                  value={expr1Input}
                  onChange={(e) => setExpr1Input(e.target.value)}
                  className="w-full h-20 p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 1 + 2 + 3"
                />
              </div>

              {/* Right expression input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-black dark:text-zinc-300 mb-2">Expression 2:</label>
                <textarea
                  value={expr2Input}
                  onChange={(e) => setExpr2Input(e.target.value)}
                  className="w-full h-20 p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 3 + 2 + 1"
                />
              </div>
            </div>

            {/* Result */}
            <div className="text-center">
              {equivalenceError ? (
                <div className="text-red-700 dark:text-red-300">
                  <strong>Error:</strong> {equivalenceError}
                </div>
              ) : isEquivalent === null ? (
                <div className="text-zinc-500 dark:text-zinc-400">Enter expressions to check equivalence</div>
              ) : (
                <div className={`text-2xl font-semibold ${isEquivalent ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {isEquivalent ? '✓ Expressions are equivalent' : '✗ Expressions are NOT equivalent'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MathJaxContext>
  );
}
