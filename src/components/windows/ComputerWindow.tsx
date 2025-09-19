import React, { useState, useEffect } from 'react';
import '../../styles/windows/ComputerWindow.css';

interface FileSystem {
  [key: string]: {
    type: 'file' | 'directory';
    content?: string;
    children?: FileSystem;
  };
}

const ComputerWindow: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([
    'Welcome to the Terminal. Type "help" for a list of commands.',
    'C:\\Users\\Developer>'
  ]);
  const [currentDir, setCurrentDir] = useState('/');
  const [fileSystem, setFileSystem] = useState<FileSystem>({
    'home': {
      type: 'directory',
      children: {
        'documents': {
          type: 'directory',
          children: {
            'readme.txt': {
              type: 'file',
              content: 'Welcome to my computer!'
            }
          }
        }
      }
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand();
    }
  };

  const getDirectoryContents = (path: string): FileSystem | undefined => {
    const parts = path.split('/').filter(p => p);
    let current = fileSystem;
    
    for (const part of parts) {
      if (!current[part] || current[part].type !== 'directory') {
        return undefined;
      }
      current = current[part].children || {};
    }
    
    return current;
  };
  
  const executeCommand = () => {
    const [cmd, ...args] = input.trim().toLowerCase().split(' ');
    let response: string[] = [];
    
    switch (cmd) {
      case 'help':
        response = [
          'Available commands:',
          'ls - List directory contents',
          'cd <dir> - Change directory',
          'mkdir <name> - Create directory',
          'touch <name> - Create file',
          'cat <file> - View file contents',
          'echo <text> > <file> - Write text to file',
          'rm <name> - Remove file or directory',
          'pwd - Print working directory',
          'clear - Clear the terminal',
          'help - Show this help message'
        ];
        break;

      case 'ls':
        const contents = getDirectoryContents(currentDir);
        if (contents) {
          response = Object.entries(contents).map(([name, item]) => 
            `${item.type === 'directory' ? 'd' : '-'} ${name}`
          );
        } else {
          response = ['Directory not found'];
        }
        break;

      case 'cd':
        const newDir = args[0] || '/';
        if (newDir === '..') {
          const parts = currentDir.split('/').filter(p => p);
          parts.pop();
          setCurrentDir('/' + parts.join('/'));
          response = ['Changed directory'];
        } else if (getDirectoryContents(newDir)) {
          setCurrentDir(newDir);
          response = ['Changed directory'];
        } else {
          response = ['Directory not found'];
        }
        break;

      case 'mkdir':
        if (args[0]) {
          setFileSystem(prev => ({
            ...prev,
            [args[0]]: { type: 'directory', children: {} }
          }));
          response = [`Created directory ${args[0]}`];
        } else {
          response = ['Usage: mkdir <name>'];
        }
        break;

      case 'touch':
        if (args[0]) {
          setFileSystem(prev => ({
            ...prev,
            [args[0]]: { type: 'file', content: '' }
          }));
          response = [`Created file ${args[0]}`];
        } else {
          response = ['Usage: touch <name>'];
        }
        break;

      case 'cat':
        if (args[0]) {
          const contents = getDirectoryContents(currentDir);
          if (contents && contents[args[0]] && contents[args[0]].type === 'file') {
            response = [contents[args[0]].content || ''];
          } else {
            response = ['File not found'];
          }
        } else {
          response = ['Usage: cat <file>'];
        }
        break;

      case 'echo':
        if (args.length >= 2 && args.includes('>')) {
          const textParts = args.slice(0, args.indexOf('>')).join(' ');
          const fileName = args[args.length - 1];
          setFileSystem(prev => ({
            ...prev,
            [fileName]: { type: 'file', content: textParts }
          }));
          response = [`Wrote to ${fileName}`];
        } else {
          response = args.join(' ') ? [args.join(' ')] : [''];
        }
        break;

      case 'rm':
        if (args[0]) {
          setFileSystem(prev => {
            const newFs = { ...prev };
            delete newFs[args[0]];
            return newFs;
          });
          response = [`Removed ${args[0]}`];
        } else {
          response = ['Usage: rm <name>'];
        }
        break;

      case 'pwd':
        response = [currentDir];
        break;
      
      case 'clear':
        setOutput(['Terminal cleared.', 'C:\\Users\\Developer>']);
        setInput('');
        return;
      
      case '':
        response = [];
        break;
      
      default:
        response = [`'${cmd}' is not recognized as an internal or external command.`];
    }
    
    setOutput([...output, `C:\\Users\\Developer> ${input}`, ...response, 'C:\\Users\\Developer>']);
    setInput('');
  };
  
  useEffect(() => {
    const terminal = document.querySelector('.terminal-output');
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight;
    }
  }, [output]);
  
  return (
    <div className="computer-window">
      <div className="terminal">
        <div className="terminal-output">
          {output.map((line, index) => (
            <div key={index} className="terminal-line">
              {line}
            </div>
          ))}
        </div>
        <div className="terminal-input">
          <span className="input-prompt">C:\Users\Developer&gt;</span>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default ComputerWindow;