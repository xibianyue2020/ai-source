import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", label: "全部", count: 1247 },
  { id: "prompt", label: "提示词", count: 856 },
  { id: "mcp", label: "MCP", count: 203 },
  { id: "dify", label: "Dify应用", count: 188 },
];

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className="flex items-center space-x-2"
        >
          <span>{category.label}</span>
          <Badge 
            variant="secondary" 
            className={`ml-1 ${
              activeCategory === category.id 
                ? 'bg-primary-foreground/20 text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {category.count}
          </Badge>
        </Button>
      ))}
    </div>
  );
}