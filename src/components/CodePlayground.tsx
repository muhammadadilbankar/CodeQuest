import { useState } from 'react';
import { Play, RotateCcw, Sparkles, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'motion/react';

export function CodePlayground() {
  const [code, setCode] = useState('// Try changing the message!\nlet message = "Hello, CodeQuest!"\nconsole.log(message)');
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);

    // Simple code execution simulation
    const logs: string[] = [];
    const customConsole = {
      log: (...args: any[]) => {
        logs.push(args.map(arg => String(arg)).join(' '));
      },
    };

    try {
      // Create a safer eval environment
      const safeCode = code
        .replace(/console\.log/g, 'customConsole.log')
        .replace(/document/g, 'undefined')
        .replace(/window/g, 'undefined');

      // eslint-disable-next-line no-new-func
      const func = new Function('customConsole', safeCode);
      func(customConsole);

      if (logs.length === 0) {
        logs.push('✓ Code ran successfully! (No output)');
      }
    } catch (error) {
      logs.push(`❌ Error: ${(error as Error).message}`);
    }

    setTimeout(() => {
      setOutput(logs);
      setIsRunning(false);
    }, 500);
  };

  const resetCode = () => {
    setCode('// Try writing your own code!\nlet name = "Coder"\nconsole.log("Hello, " + name)');
    setOutput([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Code Editor */}
      <Card className="p-6 bg-gray-900 border-2 border-purple-400">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-gray-400">Code Editor</span>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={resetCode}
              className="gap-2 bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={runCode}
              disabled={isRunning}
              className="gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <Play className="w-4 h-4" />
              Run Code
            </Button>
          </div>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 bg-gray-950 text-green-400 p-4 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          spellCheck="false"
        />

        <div className="mt-4 flex items-start gap-2 bg-blue-900/30 p-3 rounded-lg border border-blue-500/30">
          <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-blue-200 text-sm">
            Try using variables, console.log(), math operations, and strings!
          </p>
        </div>
      </Card>

      {/* Output Console */}
      <Card className="p-6 bg-gray-900 border-2 border-green-400">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-4 text-gray-400">Output Console</span>
        </div>

        <div className="bg-gray-950 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
          {output.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Click "Run Code" to see output here</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {output.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${
                    line.includes('Error') || line.includes('❌')
                      ? 'text-red-400'
                      : line.includes('✓')
                      ? 'text-green-400'
                      : 'text-cyan-400'
                  }`}
                >
                  {line}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {isRunning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 flex items-center gap-2 text-yellow-400"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            <span>Running your code...</span>
          </motion.div>
        )}
      </Card>
    </div>
  );
}
