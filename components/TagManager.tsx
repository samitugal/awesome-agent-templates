import { useState, useRef, useEffect } from 'react'
import { X, Plus, Check } from 'lucide-react'

interface TagManagerProps {
  selectedTags: string[]
  availableTags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
}

export default function TagManager({ 
  selectedTags, 
  availableTags, 
  onTagsChange, 
  placeholder = "Add tags..." 
}: TagManagerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [filteredTags, setFilteredTags] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inputValue) {
      const filtered = availableTags.filter(tag => 
        tag.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedTags.includes(tag)
      )
      setFilteredTags(filtered)
    } else {
      setFilteredTags(availableTags.filter(tag => !selectedTags.includes(tag)))
    }
  }, [inputValue, availableTags, selectedTags])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setInputValue('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      onTagsChange([...selectedTags, tag])
    }
    setInputValue('')
    setIsOpen(false)
  }

  const removeTag = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter(tag => tag !== tagToRemove))
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      const newTag = inputValue.trim().toLowerCase()
      if (!selectedTags.includes(newTag)) {
        addTag(newTag)
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setInputValue('')
    } else if (e.key === 'Backspace' && !inputValue && selectedTags.length > 0) {
      // Remove last tag when backspace is pressed on empty input
      const lastTag = selectedTags[selectedTags.length - 1]
      removeTag(lastTag)
    }
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedTags.map(tag => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
          >
            <span className="font-medium">#{tag}</span>
            <button
              onClick={() => removeTag(tag)}
              className="hover:bg-primary/30 rounded-full p-0.5 ml-1 transition-colors"
              title={`Remove ${tag} tag`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        
        {/* Add Tag Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full border border-dashed border-border hover:border-primary/50 transition-colors"
          title="Add new tag"
        >
          <Plus className="w-3 h-3" />
          <span className="font-medium">Add tag</span>
        </button>
      </div>

      {/* Input - only show when dropdown is open */}
      {isOpen && (
        <div className="relative mb-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            autoFocus
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
            {inputValue && !availableTags.includes(inputValue.toLowerCase()) && (
              <button
                onClick={() => addTag(inputValue.toLowerCase())}
                className="w-full px-3 py-2 text-left hover:bg-muted flex items-center gap-2 text-sm text-primary font-medium"
              >
                <Plus className="w-4 h-4" />
                Create "#{inputValue.toLowerCase()}"
              </button>
            )}
            
            {filteredTags.length > 0 && (
              <>
                {inputValue && !availableTags.includes(inputValue.toLowerCase()) && (
                  <div className="border-t border-border my-1"></div>
                )}
                <div className="text-xs text-muted-foreground px-3 py-1 font-medium">
                  Existing Tags
                </div>
                {filteredTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => addTag(tag)}
                    className="w-full px-3 py-2 text-left hover:bg-muted flex items-center gap-2 text-sm"
                  >
                    <span className="w-4 h-4 flex items-center justify-center text-muted-foreground">#</span>
                    {tag}
                  </button>
                ))}
              </>
            )}
            
            {filteredTags.length === 0 && !inputValue && (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                No more tags available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
