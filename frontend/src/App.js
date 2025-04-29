import { useState, useEffect, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { FiPlusCircle, FiTrash2, FiMaximize2, FiMessageSquare, FiSave, FiCopy, FiRotateCw } from "react-icons/fi";
import "./App.css";

// Initial template blocks for VSL scripts
const INITIAL_BLOCKS = [
  {
    id: "block-1",
    type: "hook",
    title: "Attention Hook",
    content: "Start with a powerful hook to grab attention...",
    prompt: "Write a compelling hook for a VSL about [product/service] that grabs attention immediately",
    isAiOpen: false,
  },
  {
    id: "block-2",
    type: "problem",
    title: "Problem Statement",
    content: "Describe the problem your audience is facing...",
    prompt: "Describe the main problem that [target audience] faces related to [topic]",
    isAiOpen: false,
  },
  {
    id: "block-3",
    type: "solution",
    title: "Solution Introduction",
    content: "Introduce your solution...",
    prompt: "Introduce [product/service] as the perfect solution to the problem faced by [target audience]",
    isAiOpen: false,
  },
];

const ScriptBlock = ({ block, index, updateBlockContent, deleteBlock, toggleAiPanel }) => {
  const [aiInput, setAiInput] = useState(block.prompt);
  const [isLoading, setIsLoading] = useState(false);

  const generateContent = async () => {
    try {
      setIsLoading(true);
      
      // This would connect to OpenAI API in a real implementation
      // Simulating API call for demo purposes
      setTimeout(() => {
        const newContent = "This is generated content for " + block.title + 
          ". In a real implementation, this would come from the OpenAI API based on the prompt: " + 
          aiInput;
        
        updateBlockContent(block.id, newContent);
        setIsLoading(false);
      }, 1500);
      
      // How the OpenAI call would look:
      // const response = await openai.createCompletion({
      //   model: "gpt-4",
      //   prompt: aiInput,
      //   max_tokens: 500,
      // });
      // updateBlockContent(block.id, response.choices[0].text);
    } catch (error) {
      console.error("Error generating content:", error);
      setIsLoading(false);
    }
  };

  return (
    <Draggable draggableId={block.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="mb-6"
        >
          <motion.div
            className="glass-card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div 
              className="p-4 flex justify-between items-center border-b border-glass-100 bg-glass-100"
              {...provided.dragHandleProps}
            >
              <h3 className="font-semibold text-white">{block.title}</h3>
              <div className="flex gap-2">
                <button 
                  className="p-2 hover:bg-glass-200 rounded-lg transition-colors"
                  onClick={() => toggleAiPanel(block.id)}
                >
                  <FiMessageSquare size={18} />
                </button>
                <button 
                  className="p-2 hover:bg-glass-200 rounded-lg transition-colors text-red-400"
                  onClick={() => deleteBlock(block.id)}
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <textarea
                className="w-full glass-input min-h-[100px]"
                value={block.content}
                onChange={(e) => updateBlockContent(block.id, e.target.value)}
              />
            </div>
            
            {block.isAiOpen && (
              <motion.div 
                className="p-4 border-t border-glass-100 bg-gray-900"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-sm text-gray-300 mb-2">AI Prompt</h4>
                <textarea
                  className="glass-input w-full mb-3"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Enter your prompt for AI..."
                  rows={3}
                />
                <button 
                  className="primary-button flex items-center gap-2"
                  onClick={generateContent}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <FiRotateCw className="animate-spin" /> 
                      Generating...
                    </>
                  ) : (
                    <>
                      <FiMessageSquare /> 
                      Generate Content
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </Draggable>
  );
};

const BlockTypeSelector = ({ addNewBlock }) => {
  const blockTypes = [
    { id: 'hook', name: 'Attention Hook', prompt: 'Write a compelling hook for a VSL that grabs attention immediately' },
    { id: 'problem', name: 'Problem Statement', prompt: 'Describe the main problem that the audience faces' },
    { id: 'agitate', name: 'Agitate Problem', prompt: 'Agitate the problem by explaining the negative consequences' },
    { id: 'solution', name: 'Solution', prompt: 'Present the solution to the problem described earlier' },
    { id: 'features', name: 'Features & Benefits', prompt: 'List the key features and benefits of the product/service' },
    { id: 'testimonial', name: 'Testimonial', prompt: 'Write a compelling testimonial about the product/service' },
    { id: 'offer', name: 'Offer', prompt: 'Present the main offer for the product/service' },
    { id: 'scarcity', name: 'Scarcity/Urgency', prompt: 'Create a sense of urgency or scarcity to encourage immediate action' },
    { id: 'guarantee', name: 'Guarantee', prompt: 'Describe the guarantee offered with the product/service' },
    { id: 'call-to-action', name: 'Call to Action', prompt: 'Write a clear call to action telling viewers exactly what to do next' },
  ];
  
  return (
    <motion.div 
      className="glass-card mb-6 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="font-semibold mb-3">Add New Block</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {blockTypes.map(type => (
          <button
            key={type.id}
            className="glass-button text-sm py-1.5"
            onClick={() => addNewBlock(type.id, type.name, type.prompt)}
          >
            {type.name}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

function App() {
  const [blocks, setBlocks] = useState(INITIAL_BLOCKS);
  const [savedScripts, setSavedScripts] = useState([]);
  const [currentScriptName, setCurrentScriptName] = useState("Untitled Script");

  // Handle drag-and-drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setBlocks(items);
  };

  // Add a new script block
  const addNewBlock = (type, title, prompt) => {
    const newBlock = {
      id: `block-${Date.now()}`,
      type,
      title,
      content: `Enter your ${title} here...`,
      prompt,
      isAiOpen: false,
    };
    
    setBlocks([...blocks, newBlock]);
  };

  // Update block content
  const updateBlockContent = (id, newContent) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, content: newContent } : block
      )
    );
  };

  // Delete a block
  const deleteBlock = (id) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  // Toggle AI panel visibility
  const toggleAiPanel = (id) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, isAiOpen: !block.isAiOpen } : block
      )
    );
  };

  // Save current script
  const saveScript = () => {
    const script = {
      id: Date.now().toString(),
      name: currentScriptName,
      blocks: [...blocks],
      date: new Date().toISOString(),
    };
    
    setSavedScripts([...savedScripts, script]);
    // In a real app, this would save to a database or localStorage
    alert(`Script "${currentScriptName}" saved!`);
  };

  // Get full script text
  const getFullScript = useCallback(() => {
    return blocks.map(block => block.content).join('\n\n');
  }, [blocks]);

  // Copy full script to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(getFullScript());
    alert("Script copied to clipboard!");
  };

  return (
    <div className="App min-h-screen font-inter tracking-tightest text-white">
      <header className="border-b border-glass-100 bg-gray-900 bg-opacity-80 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500">
            VSL Script Builder
          </h1>
          <div className="flex items-center gap-3">
            <input
              type="text"
              className="glass-input w-48"
              value={currentScriptName}
              onChange={(e) => setCurrentScriptName(e.target.value)}
              placeholder="Script name..."
            />
            <button className="glass-button flex items-center gap-2" onClick={saveScript}>
              <FiSave size={16} />
              Save
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Script Blocks */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Script Blocks</h2>
            <BlockTypeSelector addNewBlock={addNewBlock} />
            
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="script-blocks" isDropDisabled={false}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {blocks.map((block, index) => (
                      <ScriptBlock
                        key={block.id}
                        block={block}
                        index={index}
                        updateBlockContent={updateBlockContent}
                        deleteBlock={deleteBlock}
                        toggleAiPanel={toggleAiPanel}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          {/* Right column - Full Script */}
          <div className="lg:pl-4">
            <div className="sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Full Script</h2>
                <button 
                  className="glass-button flex items-center gap-2"
                  onClick={copyToClipboard}
                >
                  <FiCopy size={16} />
                  Copy All
                </button>
              </div>
              
              <div className="glass-card p-4 overflow-hidden">
                <div className="h-[70vh] overflow-y-auto p-2">
                  {blocks.map((block) => (
                    <div key={block.id} className="mb-6">
                      <h3 className="text-sm font-medium text-primary-300 mb-1">
                        {block.title}
                      </h3>
                      <div className="whitespace-pre-line">
                        {block.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
